import type { Tier } from '../types'

interface SuccessStepProps {
  tier: Tier | null
  accountNumber: string
  accountName: string
  applicantName: string
  productName: string
  onStartOver: () => void
}

function SuccessStep({
  tier,
  accountNumber,
  accountName,
  applicantName,
  productName,
  onStartOver,
}: SuccessStepProps) {
  const isPendingOnboarding = tier === 'tier2'

  return (
    <div className="success-copy">
      <span className="success-icon" aria-hidden="true">
        ✓
      </span>
      <h1>Application submitted</h1>

      {isPendingOnboarding ? (
        <p>
          Thank you for initiating your account opening process. You will be contacted by
          an Access Bank Namibia Official to complete your onboarding.
        </p>
      ) : (
        <>
          <p>
            Thank you{applicantName ? `, ${applicantName}` : ''}. Your {productName}{' '}
            application has been received.
          </p>
          <p className="reference-number">
            Account name: <strong>{accountName}</strong>
          </p>
          <p className="reference-number">
            Account number: <strong>{accountNumber}</strong>
          </p>
          <p className="account-status">
            Account status: <span className="status-badge">PND</span>
          </p>
        </>
      )}

      <button type="button" className="btn-primary" onClick={onStartOver}>
        Start a new application
      </button>
    </div>
  )
}

export default SuccessStep
