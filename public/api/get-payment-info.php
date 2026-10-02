<?php
/**
 * Production payment info API (cPanel / Apache + PHP).
 * Canonical implementation: server/getPaymentInfo.ts (Node / Vite dev).
 * Route: /api/payment-info  or  /get-payment-info.php  (see public/.htaccess)
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$ref   = isset($_GET['ref']) ? trim($_GET['ref']) : '';
$pcode = isset($_GET['pcode']) ? trim($_GET['pcode']) : '';

$error = '';
$data  = [];
$paymentDetails = [];
$currentPaymentKeys = [];

if ($ref === '' || $pcode === '') {
    echo json_encode([
        'success' => false,
        'error' => 'Missing required query parameters: ref and pcode.',
        'customer_data' => (object) [],
        'payment_details' => [],
    ]);
    exit;
}

$url = getenv('INFO_SERVICE_URL') ?: 'http://extranet.paragon-uk.net:10242/InfoService/InfoService';

function fieldValue($key, $data, $fallback = '') {
    $val = isset($data[$key]) ? trim($data[$key]) : '';
    return $val !== '' ? $val : $fallback;
}

$inputXML = '
<Query>
    <Datasource>InfoService3</Datasource>
    <Execute>
        EXEC ThamesbankAuto.[dbo].[pr_GetPaymentLinkInfoXML]
        @Ref = N\'' . str_replace("'", "''", $ref) . '\',
        @PCode = N\'' . str_replace("'", "''", $pcode) . '\'
    </Execute>
</Query>
';

$soapBody = '<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:open="www.opengi.co.uk">
    <soapenv:Header/>
    <soapenv:Body>
        <open:ExecuteQuery>
            <inputXML><![CDATA[' . $inputXML . ']]></inputXML>
        </open:ExecuteQuery>
    </soapenv:Body>
</soapenv:Envelope>';

$headers = [
    'Content-Type: text/xml; charset=utf-8',
    'SOAPAction: "www.opengi.co.uk/ExecuteQuery"',
    'Content-Length: ' . strlen($soapBody),
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,            $url);
curl_setopt($ch, CURLOPT_POST,           true);
curl_setopt($ch, CURLOPT_POSTFIELDS,     $soapBody);
curl_setopt($ch, CURLOPT_HTTPHEADER,     $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT,        60);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTP_VERSION,   CURL_HTTP_VERSION_1_1);

$response  = curl_exec($ch);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    $error = 'cURL Error: ' . $curlError;
} elseif (!$response) {
    $error = 'No response received from server.';
} else {
    $decodedResponse = html_entity_decode(html_entity_decode($response));

    $proposers = [];
    if (preg_match_all('/<ProposerDetails>(.*?)<\/ProposerDetails>/is', $decodedResponse, $pMatches)) {
        foreach ($pMatches[1] as $pBlock) {
            $pTitle = '';
            $pForenames = '';
            $pSurname = '';
            if (preg_match('/<Proposer\.Person\.Title>([^<]+)<\/Proposer\.Person\.Title>/i', $pBlock, $m)) {
                $pTitle = trim($m[1]);
            }
            if (preg_match('/<Proposer\.Person\.Forenames>([^<]+)<\/Proposer\.Person\.Forenames>/i', $pBlock, $m)) {
                $pForenames = trim($m[1]);
            }
            if (preg_match('/<Proposer\.Person\.Surname>([^<]+)<\/Proposer\.Person\.Surname>/i', $pBlock, $m)) {
                $pSurname = trim($m[1]);
            }
            $pName = trim(implode(' ', array_filter([$pTitle, $pForenames, $pSurname])));
            if ($pName !== '') {
                $proposers[] = $pName;
            }
        }
    }

    preg_match_all('/<([a-zA-Z0-9_\.]+)>([^<]+)<\/\1>/', $decodedResponse, $matches);

    if (!empty($matches[1])) {
        foreach ($matches[1] as $index => $key) {
            $val = trim($matches[2][$index]);

            if (in_array($key, ['Datasource', 'Execute', 'ColumnCount', 'RowCount'])) {
                continue;
            }

            if (in_array($key, ['RequestID', 'Total', 'Eff_Date', 'Payment_Description'])) {
                $currentPaymentKeys[$key][] = $val;
            } else {
                if (!isset($data[$key])) {
                    $data[$key] = $val;
                }
            }
        }

        if (!empty($proposers)) {
            $pCount = count($proposers);
            if ($pCount === 1) {
                $combinedProposers = $proposers[0];
            } elseif ($pCount === 2) {
                $combinedProposers = $proposers[0] . ' & ' . $proposers[1];
            } else {
                $lastProposer = array_pop($proposers);
                $combinedProposers = implode(', ', $proposers) . ' & ' . $lastProposer;
            }
            $data['ClientName'] = $combinedProposers;
            $data['ProposerName'] = $combinedProposers;
        }

        if (!empty($currentPaymentKeys['Total'])) {
            $totalCount = count($currentPaymentKeys['Total']);
            for ($i = 0; $i < $totalCount; $i++) {
                $paymentDetails[] = [
                    'RequestID'           => $currentPaymentKeys['RequestID'][$i] ?? '',
                    'Total'               => (float) ($currentPaymentKeys['Total'][$i] ?? 0),
                    'Eff_Date'            => $currentPaymentKeys['Eff_Date'][$i] ?? '',
                    'Payment_Description' => $currentPaymentKeys['Payment_Description'][$i] ?? '',
                ];
            }
        }
    }

    if (empty($data) && empty($paymentDetails)) {
        $error = 'Failed to extract data parameters from response.';
    } else {
        $resStatus = fieldValue('Res', $data);
        if ($resStatus !== '' && stripos($resStatus, 'success') === false) {
            $error = strcasecmp($resStatus, 'Login Failed') === 0
                ? 'We could not match this policy reference and postcode. Please check and try again.'
                : $resStatus;
        }
    }
}

$paymentTotal = 0;
foreach ($paymentDetails as $pd) {
    $paymentTotal += (float) ($pd['Total'] ?? 0);
}

$bExcess = ((float) ($data['Home.Buildings.BVExcess'] ?? 0))
    + ((float) ($data['Home.Buildings.BCExcess'] ?? 0));

echo json_encode([
    'success' => empty($error),
    'error' => $error,
    'customer_data' => $data,
    'payment_details' => $paymentDetails,
    'meta' => [
        'ref' => $ref,
        'pcode' => $pcode,
        'payment_total' => $paymentTotal,
        'buildings_excess' => $bExcess,
        'status' => $error ? 'ERROR' : fieldValue('Res', $data, 'OK'),
    ],
]);
