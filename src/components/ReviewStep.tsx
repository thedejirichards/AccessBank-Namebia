import { useState } from 'react'
import type { AccountProduct, ApplicationData, StepId } from '../types'
import { runFcubChecks } from '../validation'

interface ReviewStepProps {
  data: ApplicationData
  product: AccountProduct | undefined
  onBack: () => void
  onEdit: (step: StepId) => void
  onSubmit: () => void
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className="review-value">{value || '—'}</span>
    </div>
  )
}

function ReviewStep({ data, product, onBack, onEdit, onSubmit }: ReviewStepProps) {
  const [declared, setDeclared] = useState(false)
  const [failedCheck, setFailedCheck] = useState<1 | 2 | 3 | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = () => {
    if (!declared) return

    const result = runFcubChecks(data)
    if (!result.passed) {
      setFailedCheck(result.failedCheck ?? null)
      setErrorMessage(result.message ?? '')
      return
    }

    setFailedCheck(null)
    setErrorMessage('')
    onSubmit()
  }

  return (
    <div className="wizard-step">
      <h2>Review your application</h2>
      <p className="step-intro">Please check your details before submitting.</p>

      <section className="review-section">
        <div className="review-section-header">
          <h3>Account type</h3>
          <button type="button" className="link-button" onClick={() => onEdit('account-type')}>
            Edit
          </button>
        </div>
        <Row label="Product" value={product?.name ?? ''} />
      </section>

      <section className="review-section">
        <div className="review-section-header">
          <h3>Personal information</h3>
          <button type="button" className="link-button" onClick={() => onEdit('personal')}>
            Edit
          </button>
        </div>
        <Row label="Full name" value={`${data.personal.title} ${data.personal.firstName} ${data.personal.middleName} ${data.personal.surname}`.replace(/\s+/g, ' ').trim()} />
        <Row label="Gender" value={data.personal.gender} />
        <Row label="Date of birth" value={data.personal.dateOfBirth} />
        <Row label="Nationality" value={data.personal.nationality} />
        <Row label="Identity" value={`${data.personal.identityType} ${data.personal.idNumber}`.trim()} />
      </section>

      <section className="review-section">
        <div className="review-section-header">
          <h3>Residential address</h3>
          <button type="button" className="link-button" onClick={() => onEdit('address')}>
            Edit
          </button>
        </div>
        <Row
          label="Address"
          value={`${data.address.erfNo} ${data.address.streetName}, ${data.address.locationSuburb}, ${data.address.cityTown}`.trim()}
        />
        <Row label="Region" value={data.address.region} />
        <Row label="Phone" value={data.address.phoneNo} />
        <Row label="Email" value={data.address.emailAddress} />
      </section>

      <section className="review-section">
        <div className="review-section-header">
          <h3>Employment</h3>
          <button type="button" className="link-button" onClick={() => onEdit('employment')}>
            Edit
          </button>
        </div>
        <Row label="Status" value={data.employment.employmentStatus} />
        <Row label="Employer" value={data.employment.employerName} />
        <Row label="Occupation" value={data.employment.occupation} />
        <Row label="Income range" value={data.employment.incomeRange} />
      </section>

      <section className="review-section">
        <div className="review-section-header">
          <h3>Account services</h3>
          <button type="button" className="link-button" onClick={() => onEdit('services')}>
            Edit
          </button>
        </div>
        <Row label="Notifications" value={data.services.transactionNotifications.join(', ')} />
        <Row label="Digital products" value={data.services.digitalProductsPreference.join(', ')} />
      </section>

      <label className="checkbox-option declaration">
        <input
          type="checkbox"
          checked={declared}
          onChange={(event) => setDeclared(event.target.checked)}
        />
        <span>I confirm that the information provided is true and correct.</span>
      </label>

      {failedCheck && (
        <div className="form-error" role="alert">
          <p>{errorMessage}</p>
          {failedCheck === 1 && (
            <button
              type="button"
              className="link-button"
              onClick={() => onEdit('account-type')}
            >
              Change account type
            </button>
          )}
          {failedCheck === 3 && (
            <button type="button" className="link-button" onClick={() => onEdit('personal')}>
              Go complete required fields
            </button>
          )}
        </div>
      )}

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" disabled={!declared} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  )
}

export default ReviewStep
