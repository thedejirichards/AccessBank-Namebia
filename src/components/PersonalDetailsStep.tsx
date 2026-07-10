import { useState, type FormEvent } from 'react'
import type { PersonalDetails } from '../types'

interface PersonalDetailsStepProps {
  value: PersonalDetails
  onBack: () => void
  onContinue: (value: PersonalDetails) => void
}

function PersonalDetailsStep({ value, onBack, onContinue }: PersonalDetailsStepProps) {
  const [form, setForm] = useState<PersonalDetails>(value)

  const update = (field: keyof PersonalDetails, fieldValue: string) => {
    setForm((prev) => ({ ...prev, [field]: fieldValue }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onContinue(form)
  }

  const isForeignNational = form.nationality.trim() !== '' && form.nationality.trim().toLowerCase() !== 'namibian'

  const fillSampleData = () => {
    setForm({
      title: 'Mr',
      firstName: 'John',
      middleName: 'Simon',
      surname: 'Shikongo',
      gender: 'male',
      race: 'black',
      maritalStatus: 'single',
      nationality: 'Namibian',
      birthCountry: 'Namibia',
      dateOfBirth: '1995-06-12',
      identityType: 'national-id',
      idNumber: '95061200123',
      idIssueDate: '2015-01-10',
      idExpiryDate: '2030-01-10',
      residentPermitNumber: '',
      residentPermitExpiryDate: '',
      highestQualification: "Bachelor's Degree",
    })
  }

  return (
    <form className="wizard-step" onSubmit={handleSubmit}>
      <div className="step-header">
        <h2>Personal information</h2>
        <button type="button" className="link-button" onClick={fillSampleData}>
          Fill sample data
        </button>
      </div>
      <p className="step-intro">Tell us a bit about yourself.</p>
      <p className="required-note">
        <span className="required-mark">*</span> indicates a mandatory field
      </p>

      <div className="form-grid">
        <label className="field">
          <span>Title</span>
          <select
            required
            value={form.title}
            onChange={(event) => update('title', event.target.value)}
          >
            <option value="" disabled>
              Select title
            </option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
          </select>
        </label>

        <label className="field">
          <span>First name</span>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={(event) => update('firstName', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Middle name</span>
          <input
            type="text"
            value={form.middleName}
            onChange={(event) => update('middleName', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Surname</span>
          <input
            type="text"
            required
            value={form.surname}
            onChange={(event) => update('surname', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Gender</span>
          <select
            required
            value={form.gender}
            onChange={(event) => update('gender', event.target.value)}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>

        <label className="field">
          <span>Race</span>
          <select
            required
            value={form.race}
            onChange={(event) => update('race', event.target.value)}
          >
            <option value="" disabled>
              Select race
            </option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="coloured">Coloured</option>
            <option value="other">Other</option>
          </select>
          <span className="field-hint">For statistical purposes only.</span>
        </label>

        <label className="field">
          <span>Marital status</span>
          <select
            required
            value={form.maritalStatus}
            onChange={(event) => update('maritalStatus', event.target.value)}
          >
            <option value="" disabled>
              Select marital status
            </option>
            <option value="single">Single</option>
            <option value="married-cop">Married (COP)</option>
            <option value="married-anc">Married (ANC)</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </label>

        <label className="field">
          <span>Nationality</span>
          <input
            type="text"
            required
            value={form.nationality}
            onChange={(event) => update('nationality', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Birth country</span>
          <input
            type="text"
            required
            value={form.birthCountry}
            onChange={(event) => update('birthCountry', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Date of birth</span>
          <input
            type="date"
            required
            value={form.dateOfBirth}
            onChange={(event) => update('dateOfBirth', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Highest qualification</span>
          <input
            type="text"
            required
            value={form.highestQualification}
            onChange={(event) => update('highestQualification', event.target.value)}
          />
        </label>
      </div>

      <h3 className="form-section-heading">Identification</h3>

      <div className="form-grid">
        <label className="field">
          <span>Type of identity</span>
          <select
            required
            value={form.identityType}
            onChange={(event) => update('identityType', event.target.value)}
          >
            <option value="" disabled>
              Select identity type
            </option>
            <option value="national-id">National ID</option>
            <option value="passport">Passport</option>
            <option value="birth-certificate">Full Birth Certificate</option>
          </select>
        </label>

        <label className="field">
          <span>ID / Passport number</span>
          <input
            type="text"
            required
            value={form.idNumber}
            onChange={(event) => update('idNumber', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Issue date</span>
          <input
            type="date"
            required
            value={form.idIssueDate}
            onChange={(event) => update('idIssueDate', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Expiry date</span>
          <input
            type="date"
            required
            value={form.idExpiryDate}
            onChange={(event) => update('idExpiryDate', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Resident permit number</span>
          <input
            type="text"
            required={isForeignNational}
            value={form.residentPermitNumber}
            onChange={(event) => update('residentPermitNumber', event.target.value)}
          />
          <span className="field-hint">If applicable.</span>
        </label>

        <label className="field">
          <span>Resident permit expiry date</span>
          <input
            type="date"
            required={isForeignNational && form.residentPermitNumber.trim() !== ''}
            value={form.residentPermitExpiryDate}
            onChange={(event) => update('residentPermitExpiryDate', event.target.value)}
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

export default PersonalDetailsStep
