import { useEffect } from 'react'
import { LEGACY_IMAGES, LEGACY_LINKS } from '../../../constants/legacyAssets'
import type { PaymentLinkInfo } from '../../../types/payment.types'

interface PaymentSidebarProps {
  paymentInfo: PaymentLinkInfo
  referenceNumber: string
}

export function PaymentSidebar({
  paymentInfo,
  referenceNumber,
}: PaymentSidebarProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="right-area-main">
      <div className="user-info-main">
        <h2>Your Information</h2>
        <p>
          Policy Reference: <span>{referenceNumber}</span>
        </p>
        <p>
          Client Reference: <span>{paymentInfo.clientReference}</span>
        </p>
        <p>
          Name: <span>{paymentInfo.clientName}</span>
        </p>
        <p className="d-block">
          Address: <span className="d-block">{paymentInfo.riskAddress}</span>
        </p>
        <p>
          Policy Number: <span>{paymentInfo.policyNumber}</span>
        </p>
      </div>

      <div className="securing-area-main">
        <h2>Securing Your Peace of Mind</h2>
        <div className="content">
          <p>
            Remember, choosing Thamesbank means opting for unparalleled
            excellence in UK insurance since 1989, with our commitment to fast,
            personalised service and a team that prioritises your peace of mind.
          </p>
          <ul>
            <li>
              <img src={LEGACY_IMAGES.checkIcon} alt="" />{' '}
              <span>Instant Reach – 3 ring pickup</span>
            </li>
            <li>
              <img src={LEGACY_IMAGES.checkIcon} alt="" />{' '}
              <span>Real Talk – Directly to a human, everytime</span>
            </li>
            <li>
              <img src={LEGACY_IMAGES.checkIcon} alt="" />{' '}
              <span>Support staff average 10+ years&apos; industry experience</span>
            </li>
            <li>
              <img src={LEGACY_IMAGES.checkIcon} alt="" />{' '}
              <span>UK Based Contact Center</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="securing-area-main trustpilot-main securing-area-main-img">
        <div className="text-center">
          <img
            src={LEGACY_IMAGES.trustSidebar}
            alt="Trustpilot"
            className="img-fluid w-80"
          />
        </div>
      </div>

      <div className="policies-area-main">
        <h2>Most Of Our Policies Include</h2>
        <div className="content">
          <ul>
            <li>
              <img src={LEGACY_IMAGES.checkIcon} alt="" />{' '}
              <span>Alternative Accommodation</span>
            </li>
            <li>
              <img src={LEGACY_IMAGES.checkIcon} alt="" />{' '}
              <span>New for Old Cover</span>
            </li>
            <li>
              <img src={LEGACY_IMAGES.checkIcon} alt="" />{' '}
              <span>Underground Services Pipes and Cables</span>
            </li>
            <li>
              <img src={LEGACY_IMAGES.checkIcon} alt="" />{' '}
              <span>Emergency Helplines</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="policies-area-main">
        <h2>Your Security</h2>
        <div className="content">
          <p>
            Your information is protected by a 256-bit SSL connection provided
            by our technology partner GoDaddy, and processed in line with UK Data
            Protection laws.
          </p>
          <p>
            Read our{' '}
            <a href={LEGACY_LINKS.privacyNotice} target="_blank" rel="noreferrer">
              Privacy Notice
            </a>{' '}
            to learn how we handle and safeguard your data.
          </p>
          <img src={LEGACY_IMAGES.godaddy} alt="GoDaddy security" className="w-100" />
        </div>
      </div>

      <div className="contact-area-main">
        <h2>Contact Us</h2>
        <div className="phone-box">
          <img src={LEGACY_IMAGES.phoneIcon} alt="" />
          <div>
            <p>Telephone:</p>
            <h3>0203 3029263</h3>
          </div>
        </div>
        <p className="mb-0">
          <b>Email:</b>
        </p>
        <p>sales@thamesbankinsurance.co.uk</p>
        <div className="office-hour-box">
          <h5>Office Hours:</h5>
          <p>
            <b>Mon to Thur</b>
          </p>
          <p>9.00 am to 6.30 pm</p>
          <p>Fri 9.00 am to 5.30 pm</p>
        </div>
        <p className="contact-end">
          Thamesbank Insurance Services
          <br />
          is a trading name of Paragon Car Limited and are authorised and
          regulated by the Financial Conduct Authority, FCA no: 312028
        </p>
      </div>
    </div>
  )
}
