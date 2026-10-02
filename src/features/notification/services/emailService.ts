import axios from 'axios'
import type { HppResponse, PaymentLinkInfo } from '../../../shared/types/payment.types'

const API_BASE_URL = 'https://api.thamesbankinsurance.co.uk'
// const BROKER_EMAIL = 'sales@thamesbankinsurance.co.uk'
const Client_EMAIL = 'sales@thamesbankinsurance.co.uk'
// const CC_EMAILS = ['umairawanpk@gmail.com', 'gavin.chitticks@paragon-uk.net']
const EMAIL_HEADERS = {
  'Content-Type': 'application/json',
}

interface CustomerEmailPayload {
  toEmail: string
  fullName: string
  propertyAddress: string
  PostCode: string
  APMClientReference: string
  pRef: string
  CoverDate: string
}

interface CustomerFailureEmailPayload {
  toEmail: string
  fullName: string
  propertyAddress: string
  pCode: string
  pRef: string
  ProductName: string
  SessionReference: string
}

interface BrokerEmailPayload {
  toEmail: string
  fullName: string
  pCode: string
  pReturn: string
  PostCode: string
  request: string
  pRef: string
  Premium: string
  sortCode: string
  CoverDate: string
  SchemeCode: string
  AdminCharge: string
  InsurerName: string
  accountNumber: string
  keysPurchased: boolean
  legalPurchased: boolean
  ClientReference: string
  gadgetPurchased: boolean
  SessionReference: string
  TransactionAmount: string
  emergencyPurchased: boolean
  useraccountdetails: string
}

interface BrokerFailureEmailPayload {
  toEmail: string
  fullName: string
  postCode: string
  pRef: string
  Premium: string
  CoverDate: string
  SchemeCode: string
  AdminCharge: string
  InsurerName: string
  ContactNumber: string
  keysPurchased: boolean
  legalPurchased: boolean
  BrokerReference: string
  ClientReference: string
  gadgetPurchased: boolean
  AlternateContact: string
  SessionReference: string
  TransactionAmount: string
  emergencyPurchased: boolean
}

function getCoverDate(response: HppResponse): string {
  return response.TIMESTAMP?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)
}

function getSessionReference(paymentInfo: PaymentLinkInfo, response: HppResponse): string {
  return response.ORDER_ID ?? paymentInfo.clientReference
}

function mapCustomerEmailData(
  paymentInfo: PaymentLinkInfo,
  response: HppResponse,
): CustomerEmailPayload {
  return {
    toEmail: paymentInfo.clientEmail,
    fullName: paymentInfo.clientName,
    propertyAddress: paymentInfo.riskAddress,
    PostCode: paymentInfo.expectedPostcode,
    APMClientReference: paymentInfo.clientReference,
    pRef: paymentInfo.clientReference,
    CoverDate: getCoverDate(response),
  }
}

function mapCustomerFailureEmailData(
  paymentInfo: PaymentLinkInfo,
  response: HppResponse,
): CustomerFailureEmailPayload {
  return {
    toEmail: paymentInfo.clientEmail,
    fullName: paymentInfo.clientName,
    propertyAddress: paymentInfo.riskAddress,
    pCode: paymentInfo.expectedPostcode,
    pRef: paymentInfo.clientReference,
    ProductName: paymentInfo.paymentDescription || 'Insurance Payment',
    SessionReference: getSessionReference(paymentInfo, response),
  }
}

function mapBrokerEmailData(
  paymentInfo: PaymentLinkInfo,
  response: HppResponse,
): BrokerEmailPayload {
  const amount = String(paymentInfo.totalAmount)
  const sessionRef = getSessionReference(paymentInfo, response)
  return {
    toEmail: Client_EMAIL,
    fullName: paymentInfo.clientName,
    pCode: paymentInfo.expectedPostcode,
    PostCode: paymentInfo.expectedPostcode,
    request: 'N/A',
    pReturn: 'N/A',
    pRef: paymentInfo.clientReference,
    Premium: amount,
    sortCode: '',
    CoverDate: getCoverDate(response),
    SchemeCode: '',
    AdminCharge: '0',
    InsurerName: 'Thamesbank',
    accountNumber: '',
    keysPurchased: false,
    legalPurchased: false,
    ClientReference: paymentInfo.clientReference,
    gadgetPurchased: false,
    SessionReference: sessionRef,
    TransactionAmount: amount,
    emergencyPurchased: false,
    useraccountdetails: paymentInfo.clientName,
  }
}

function mapBrokerFailureEmailData(
  paymentInfo: PaymentLinkInfo,
  response: HppResponse,
): BrokerFailureEmailPayload {
  const amount = String(paymentInfo.totalAmount)
  const sessionRef = getSessionReference(paymentInfo, response)
  return {
    toEmail: Client_EMAIL,
    fullName: paymentInfo.clientName,
    postCode: paymentInfo.expectedPostcode,
    pRef: paymentInfo.clientReference,
    Premium: amount,
    CoverDate: getCoverDate(response),
    SchemeCode: '',
    AdminCharge: '0',
    InsurerName: 'Thamesbank',
    ContactNumber: '',
    keysPurchased: false,
    legalPurchased: false,
    BrokerReference: paymentInfo.clientReference,
    ClientReference: paymentInfo.clientReference,
    gadgetPurchased: false,
    AlternateContact: '',
    SessionReference: sessionRef,
    TransactionAmount: amount,
    emergencyPurchased: false,
  }
}

function getRecipients(primaryEmail: string): string[] {
  const emails = [primaryEmail]
  return [...new Set(emails.map((email) => email.trim().toLowerCase()).filter(Boolean))]
}

async function postEmail<TPayload extends { toEmail: string }>(
  endpoint: string,
  payload: TPayload,
): Promise<void> {
  // API only supports toEmail (no CC). Send one request per recipient.
  await Promise.all(
    getRecipients(payload.toEmail).map((toEmail) =>
      axios.post(`${API_BASE_URL}/${endpoint}`, { ...payload, toEmail }, { headers: EMAIL_HEADERS }),
    ),
  )
}

export async function sendPaymentSuccessEmail(
  paymentInfo: PaymentLinkInfo,
  response: HppResponse,
): Promise<void> {
  const emailData = mapCustomerEmailData(paymentInfo, response)
  const brokerEmailData = mapBrokerEmailData(paymentInfo, response)

  await Promise.all([
    postEmail('customeremail', emailData),
    postEmail('brokeremail', brokerEmailData),
  ])
}

export async function sendPaymentFailureEmail(
  paymentInfo: PaymentLinkInfo,
  response: HppResponse,
): Promise<void> {
  const emailData = mapCustomerFailureEmailData(paymentInfo, response)
  const brokerEmailData = mapBrokerFailureEmailData(paymentInfo, response)

  await Promise.all([
    postEmail('customerfailureemail', emailData),
    postEmail('brokerfailureemail', brokerEmailData),
  ])
}
