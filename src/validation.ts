import type { ApplicationData } from './types'

export interface FcubCheckResult {
  passed: boolean
  failedCheck?: 1 | 2 | 3
  message?: string
}

function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0
  const dob = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1
  }
  return age
}

const REQUIRED_PERSONAL_FIELDS: (keyof ApplicationData['personal'])[] = [
  'title',
  'firstName',
  'surname',
  'gender',
  'race',
  'maritalStatus',
  'nationality',
  'birthCountry',
  'dateOfBirth',
  'identityType',
  'idNumber',
  'idIssueDate',
  'idExpiryDate',
  'highestQualification',
]

const REQUIRED_ADDRESS_FIELDS: (keyof ApplicationData['address'])[] = [
  'erfNo',
  'streetName',
  'locationSuburb',
  'cityTown',
  'region',
  'phoneNo',
  'emailAddress',
]

const REQUIRED_EMPLOYMENT_FIELDS: (keyof ApplicationData['employment'])[] = [
  'employmentStatus',
  'sourceOfFunds',
  'sourceOfWealth',
  'frequencyOfWithdrawals',
  'frequencyOfDeposits',
  'incomeRange',
]

function hasMissingRequiredFields(data: ApplicationData): boolean {
  const missingPersonal = REQUIRED_PERSONAL_FIELDS.some((field) => !data.personal[field])
  const missingAddress = REQUIRED_ADDRESS_FIELDS.some((field) => !data.address[field])
  const missingEmployment = REQUIRED_EMPLOYMENT_FIELDS.some(
    (field) => !data.employment[field],
  )
  const missingServices =
    data.services.transactionNotifications.length === 0 ||
    data.services.digitalProductsPreference.length === 0

  return (
    !data.productId || missingPersonal || missingAddress || missingEmployment || missingServices
  )
}

/**
 * Mirrors the FCUB checks from section 3.1.9: existing customer profile
 * (National ID must be 11 digits), age eligibility (>=18), and required fields.
 */
export function runFcubChecks(data: ApplicationData): FcubCheckResult {
  if (data.personal.identityType === 'national-id') {
    const idDigits = data.personal.idNumber.replace(/\D/g, '')
    if (idDigits.length !== 11) {
      return {
        passed: false,
        failedCheck: 1,
        message:
          'You do not qualify for this type of Account. Kindly select a different Account Type.',
      }
    }
  }

  const age = calculateAge(data.personal.dateOfBirth)
  if (age < 18) {
    return {
      passed: false,
      failedCheck: 2,
      message:
        'Kindly take note that we can not proceed with your request at this stage. You will however be contacted by an Access Bank Official.',
    }
  }

  if (hasMissingRequiredFields(data)) {
    return {
      passed: false,
      failedCheck: 3,
      message: 'Please Complete all required fields marked with an (*)',
    }
  }

  return { passed: true }
}
