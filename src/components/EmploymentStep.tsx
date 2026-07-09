import { useState, type FormEvent } from 'react'
import type { EmploymentDetails } from '../types'

interface EmploymentStepProps {
  value: EmploymentDetails
  onBack: () => void
  onContinue: (value: EmploymentDetails) => void
}

const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually']

function EmploymentStep({ value, onBack, onContinue }: EmploymentStepProps) {
  const [form, setForm] = useState<EmploymentDetails>(value)

  const update = (field: keyof EmploymentDetails, fieldValue: string) => {
    setForm((prev) => ({ ...prev, [field]: fieldValue }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onContinue(form)
  }

  const isEmployed =
    form.employmentStatus === 'employed' || form.employmentStatus === 'self-employed'

  const fillSampleData = () => {
    setForm({
      employmentStatus: 'employed',
      sourceOfFunds: 'Salary',
      sourceOfWealth: 'Employment income',
      frequencyOfWithdrawals: 'Monthly',
      frequencyOfDeposits: 'Monthly',
      employerName: 'Namibia Trading Co.',
      occupation: 'Accountant',
      incomeRange: '20000-49999',
      cityTown: 'Windhoek',
      officePhoneNo: '0612345678',
    })
  }

  return (
    <form className="wizard-step" onSubmit={handleSubmit}>
      <div className="step-header">
        <h2>Employment details</h2>
        <button type="button" className="link-button" onClick={fillSampleData}>
          Fill sample data
        </button>
      </div>
      <p className="step-intro">Help us understand your financial background.</p>

      <div className="form-grid">
        <label className="field">
          <span>Employment status</span>
          <select
            required
            value={form.employmentStatus}
            onChange={(event) => update('employmentStatus', event.target.value)}
          >
            <option value="" disabled>
              Select employment status
            </option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
            <option value="pensioner">Pensioner</option>
          </select>
        </label>

        <label className="field">
          <span>Source of funds</span>
          <input
            type="text"
            required
            value={form.sourceOfFunds}
            onChange={(event) => update('sourceOfFunds', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Source of wealth</span>
          <input
            type="text"
            required
            value={form.sourceOfWealth}
            onChange={(event) => update('sourceOfWealth', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Income range</span>
          <select
            required
            value={form.incomeRange}
            onChange={(event) => update('incomeRange', event.target.value)}
          >
            <option value="" disabled>
              Select income range
            </option>
            <option value="0-4500">N$0 - N$4 500</option>
            <option value="5000-19999">N$5 000 - N$19 999</option>
            <option value="20000-49999">N$20 000 - N$49 999</option>
            <option value="50000-plus">N$50 000 and above</option>
          </select>
        </label>

        <label className="field">
          <span>Frequency of deposits</span>
          <select
            required
            value={form.frequencyOfDeposits}
            onChange={(event) => update('frequencyOfDeposits', event.target.value)}
          >
            <option value="" disabled>
              Select frequency
            </option>
            {FREQUENCIES.map((freq) => (
              <option key={freq} value={freq}>
                {freq}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Frequency of withdrawals</span>
          <select
            required
            value={form.frequencyOfWithdrawals}
            onChange={(event) => update('frequencyOfWithdrawals', event.target.value)}
          >
            <option value="" disabled>
              Select frequency
            </option>
            {FREQUENCIES.map((freq) => (
              <option key={freq} value={freq}>
                {freq}
              </option>
            ))}
          </select>
        </label>
      </div>

      <h3 className="form-section-heading">Employer details</h3>
      <p className="step-intro">
        {isEmployed
          ? 'Tell us about your employer.'
          : 'Optional if not currently employed.'}
      </p>

      <div className="form-grid">
        <label className="field">
          <span>Employer's name</span>
          <input
            type="text"
            required={isEmployed}
            value={form.employerName}
            onChange={(event) => update('employerName', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Occupation</span>
          <input
            type="text"
            required={isEmployed}
            value={form.occupation}
            onChange={(event) => update('occupation', event.target.value)}
          />
        </label>

        <label className="field">
          <span>City / Town</span>
          <input
            type="text"
            required={isEmployed}
            value={form.cityTown}
            onChange={(event) => update('cityTown', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Office phone no</span>
          <input
            type="tel"
            required={isEmployed}
            value={form.officePhoneNo}
            onChange={(event) => update('officePhoneNo', event.target.value)}
          />
        </label>
      </div>

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn-primary">
          Continue
        </button>
      </div>
    </form>
  )
}

export default EmploymentStep
