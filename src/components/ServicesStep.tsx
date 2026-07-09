import { useState, type FormEvent } from 'react'
import type { AccountServices } from '../types'

interface ServicesStepProps {
  value: AccountServices
  onBack: () => void
  onContinue: (value: AccountServices) => void
}

const NOTIFICATION_OPTIONS = [
  { id: 'sms', label: 'SMS Alert' },
  { id: 'email', label: 'Email' },
]

const DIGITAL_PRODUCT_OPTIONS = [
  { id: 'ussd', label: 'USSD' },
  { id: 'access-more-app', label: 'Access More App' },
]

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function ServicesStep({ value, onBack, onContinue }: ServicesStepProps) {
  const [form, setForm] = useState<AccountServices>(value)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onContinue(form)
  }

  const isValid =
    form.transactionNotifications.length > 0 && form.digitalProductsPreference.length > 0

  return (
    <form className="wizard-step" onSubmit={handleSubmit}>
      <h2>Account services required</h2>
      <p className="step-intro">Choose how you'd like to bank with us.</p>

      <fieldset className="checkbox-group">
        <legend>Transaction notifications</legend>
        {NOTIFICATION_OPTIONS.map((option) => (
          <label key={option.id} className="checkbox-option">
            <input
              type="checkbox"
              checked={form.transactionNotifications.includes(option.id)}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  transactionNotifications: toggleValue(
                    prev.transactionNotifications,
                    option.id,
                  ),
                }))
              }
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="checkbox-group">
        <legend>Digital products preference</legend>
        {DIGITAL_PRODUCT_OPTIONS.map((option) => (
          <label key={option.id} className="checkbox-option">
            <input
              type="checkbox"
              checked={form.digitalProductsPreference.includes(option.id)}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  digitalProductsPreference: toggleValue(
                    prev.digitalProductsPreference,
                    option.id,
                  ),
                }))
              }
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn-primary" disabled={!isValid}>
          Continue
        </button>
      </div>
    </form>
  )
}

export default ServicesStep
