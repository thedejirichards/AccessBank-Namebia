interface SubmitStepProps {
  applicantName: string
  productName: string
  onBack: () => void
  onSubmit: () => void
}

function SubmitStep({ applicantName, productName, onBack, onSubmit }: SubmitStepProps) {
  return (
    <div className="wizard-step">
      <h2>Submit your application</h2>
      <p className="step-intro">
        {applicantName ? `${applicantName}, y` : 'Y'}our {productName} application is ready
        to be submitted to Access Bank for processing.
      </p>

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default SubmitStep
