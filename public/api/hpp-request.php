<?php
/**
 * Production HPP signing endpoint (cPanel / Apache + PHP).
 * Route: /api/hpp-request  (see public/.htaccess)
 */
header('Content-Type: application/json');
header('Cache-Control: no-store');

$merchantId = getenv('REALEX_MERCHANT_ID') ?: 'THAM016';
$secret = getenv('REALEX_SECRET') ?: '1UDOZ2kf9B';
$account = getenv('REALEX_ACCOUNT') ?: 'elements02';
$currency = 'GBP';

function generate_sha1_hash(
    string $timestamp,
    string $merchantId,
    string $orderId,
    string $amount,
    string $currency,
    string $secret
): string {
    $toHash = implode('.', [$timestamp, $merchantId, $orderId, $amount, $currency]);
    $hash1 = sha1($toHash);
    return sha1($hash1 . '.' . $secret);
}

$amountMinor = isset($_GET['amount']) ? (int) $_GET['amount'] : 25660;
if ($amountMinor <= 0) {
    $amountMinor = 25660;
}

$orderId = isset($_GET['orderId']) && $_GET['orderId'] !== ''
    ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['orderId'])
    : bin2hex(random_bytes(11));

$timestamp = gmdate('YmdHis');
$amount = (string) $amountMinor;

$street1 = isset($_GET['street1']) && trim($_GET['street1']) !== ''
    ? trim($_GET['street1'])
    : 'Address';
$street2 = isset($_GET['street2']) ? trim($_GET['street2']) : '';
$city = isset($_GET['city']) && trim($_GET['city']) !== ''
    ? trim($_GET['city'])
    : 'Unknown';

$payload = [
    'MERCHANT_ID' => $merchantId,
    'ACCOUNT' => $account,
    'ORDER_ID' => substr($orderId, 0, 40),
    'AMOUNT' => $amount,
    'CURRENCY' => $currency,
    'TIMESTAMP' => $timestamp,
    'AUTO_SETTLE_FLAG' => '1',
    'HPP_VERSION' => '2',
    'HPP_CHANNEL' => 'ECOM',
    'HPP_LANG' => 'en',
    'HPP_CUSTOMER_EMAIL' => isset($_GET['email']) ? $_GET['email'] : 'customer@thamesbank.example',
    'HPP_BILLING_STREET1' => $street1,
    'HPP_BILLING_CITY' => $city,
    'HPP_BILLING_POSTALCODE' => isset($_GET['postcode']) ? $_GET['postcode'] : 'CM3 5FZ',
    'HPP_BILLING_COUNTRY' => '826',
    'COMMENT1' => isset($_GET['comment']) ? $_GET['comment'] : 'Thames Bank Insurance Portal',
];

if ($street2 !== '') {
    $payload['HPP_BILLING_STREET2'] = $street2;
}

$payload['SHA1HASH'] = generate_sha1_hash(
    $timestamp,
    $merchantId,
    $payload['ORDER_ID'],
    $amount,
    $currency,
    $secret
);

echo json_encode($payload);
