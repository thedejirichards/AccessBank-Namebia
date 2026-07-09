import { useState, type FormEvent } from 'react'
import type { ResidentialAddress } from '../types'

interface AddressStepProps {
  value: ResidentialAddress
  onBack: () => void
  onContinue: (value: ResidentialAddress) => void
}

const REGIONS = [
  'Erongo',
  'Hardap',
  'Karas',
  'Kavango East',
  'Kavango West',
  'Khomas',
  'Kunene',
  'Ohangwena',
  'Omaheke',
  'Omusati',
  'Oshana',
  'Oshikoto',
  'Otjozondjupa',
  'Zambezi',
]

function AddressStep({ value, onBack, onContinue }: AddressStepProps) {
  const [form, setForm] = useState<ResidentialAddress>(value)

  const update = (field: keyof ResidentialAddress, fieldValue: string) => {
    setForm((prev) => ({ ...prev, [field]: fieldValue }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onContinue(form)
  }

  const fillSampleData = () => {
    setForm({
      erfNo: '4521',
      streetName: 'Independence Avenue',
      locationSuburb: 'Klein Windhoek',
      cityTown: 'Windhoek',
      region: 'Khomas',
      poBox: '11221',
      phoneNo: '0811234567',
      emailAddress: 'john.shikongo@example.com',
    })
  }

  return (
    <form className="wizard-step" onSubmit={handleSubmit}>
      <div className="step-header">
        <h2>Residential address</h2>
        <button type="button" className="link-button" onClick={fillSampleData}>
          Fill sample data
        </button>
      </div>
      <p className="step-intro">Where can we find you?</p>

      <div className="form-grid">
        <label className="field">
          <span>Erf No</span>
          <input
            type="text"
            required
            value={form.erfNo}
            onChange={(event) => update('erfNo', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Street name</span>
          <input
            type="text"
            required
            value={form.streetName}
            onChange={(event) => update('streetName', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Location / Suburb</span>
          <input
            type="text"
            required
            value={form.locationSuburb}
            onChange={(event) => update('locationSuburb', event.target.value)}
          />
        </label>

        <label className="field">
          <span>City / Town</span>
          <input
            type="text"
            required
            value={form.cityTown}
            onChange={(event) => update('cityTown', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Region</span>
          <select
            required
            value={form.region}
            onChange={(event) => update('region', event.target.value)}
          >
            <option value="" disabled>
              Select region
            </option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>P O Box</span>
          <input
            type="text"
            value={form.poBox}
            onChange={(event) => update('poBox', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Phone No</span>
          <input
            type="tel"
            required
            value={form.phoneNo}
            onChange={(event) => update('phoneNo', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Email address</span>
          <input
            type="email"
            required
            value={form.emailAddress}
            onChange={(event) => update('emailAddress', event.target.value)}
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

export default AddressStep
