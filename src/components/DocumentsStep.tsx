import { useState, type FormEvent } from 'react'
import type { Tier, UploadedDocuments } from '../types'

interface DocumentsStepProps {
  value: UploadedDocuments
  tier: Tier | null
  isEmployed: boolean
  onBack: () => void
  onContinue: (value: UploadedDocuments) => void
}

function DocumentsStep({ value, tier, isEmployed, onBack, onContinue }: DocumentsStepProps) {
  const [form, setForm] = useState<UploadedDocuments>(value)
  const isTier2 = tier === 'tier2'

  const update = (field: keyof UploadedDocuments, fileName: string) => {
    setForm((prev) => ({ ...prev, [field]: fileName }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onContinue(form)
  }

  return (
    <form className="wizard-step" onSubmit={handleSubmit}>
      <h2>Upload your documents</h2>
      <p className="step-intro">Please upload clear copies of the following documents.</p>

      <div className="form-grid">
        <label className="field field-wide">
          <span>Identity document{isTier2 ? ' / Passport' : ''}</span>
          <input
            type="file"
            required
            accept="image/*,.pdf"
            onChange={(event) => update('identityDocumentName', event.target.files?.[0]?.name ?? '')}
          />
          {form.identityDocumentName && (
            <span className="field-hint">Selected: {form.identityDocumentName}</span>
          )}
        </label>

        {isTier2 && (
          <label className="field field-wide">
            <span>Full birth certificate (≤16 years)</span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(event) =>
                update('fullBirthCertificateName', event.target.files?.[0]?.name ?? '')
              }
            />
            {form.fullBirthCertificateName && (
              <span className="field-hint">Selected: {form.fullBirthCertificateName}</span>
            )}
          </label>
        )}

        {isTier2 && (
          <label className="field field-wide">
            <span>Guardianship / Curatorship letter</span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(event) =>
                update('guardianshipLetterName', event.target.files?.[0]?.name ?? '')
              }
            />
            {form.guardianshipLetterName && (
              <span className="field-hint">Selected: {form.guardianshipLetterName}</span>
            )}
            <span className="field-hint">If applicable.</span>
          </label>
        )}

        <label className="field field-wide">
          <span>{isTier2 ? 'Proof of income (i.e. Payslip)' : 'Payslip'}{isEmployed ? '' : ' (where applicable)'}</span>
          <input
            type="file"
            required={isEmployed}
            accept="image/*,.pdf"
            onChange={(event) => update('payslipName', event.target.files?.[0]?.name ?? '')}
          />
          {form.payslipName && <span className="field-hint">Selected: {form.payslipName}</span>}
        </label>

        <label className="field field-wide">
          <span>Proof of residence</span>
          <input
            type="file"
            required
            accept="image/*,.pdf"
            onChange={(event) => update('proofOfResidenceName', event.target.files?.[0]?.name ?? '')}
          />
          {form.proofOfResidenceName && (
            <span className="field-hint">Selected: {form.proofOfResidenceName}</span>
          )}
        </label>
      </div>

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn-primary">
          Next
        </button>
      </div>
    </form>
  )
}

export default DocumentsStep
