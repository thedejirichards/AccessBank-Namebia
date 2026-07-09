export type Tier = 'tier1' | 'tier2'

export interface AccountProduct {
  id: string
  name: string
  tier: Tier
  description: string
  enabled: boolean
}

export interface PersonalDetails {
  title: string
  firstName: string
  middleName: string
  surname: string
  gender: string
  race: string
  maritalStatus: string
  nationality: string
  birthCountry: string
  dateOfBirth: string
  identityType: string
  idNumber: string
  idIssueDate: string
  idExpiryDate: string
  residentPermitNumber: string
  residentPermitExpiryDate: string
  highestQualification: string
}

export interface ResidentialAddress {
  erfNo: string
  streetName: string
  locationSuburb: string
  cityTown: string
  region: string
  poBox: string
  phoneNo: string
  emailAddress: string
}

export interface EmploymentDetails {
  employmentStatus: string
  sourceOfFunds: string
  sourceOfWealth: string
  frequencyOfWithdrawals: string
  frequencyOfDeposits: string
  employerName: string
  occupation: string
  incomeRange: string
  cityTown: string
  officePhoneNo: string
}

export interface AccountServices {
  transactionNotifications: string[]
  digitalProductsPreference: string[]
}

export interface UploadedDocuments {
  identityDocumentName: string
  fullBirthCertificateName: string
  guardianshipLetterName: string
  payslipName: string
  proofOfResidenceName: string
}

export interface ApplicationData {
  productId: string | null
  personal: PersonalDetails
  address: ResidentialAddress
  employment: EmploymentDetails
  services: AccountServices
  documents: UploadedDocuments
  signatureDataUrl: string
}

export const ACCOUNT_PRODUCTS: AccountProduct[] = [
  {
    id: 'access-eagle',
    name: 'Access Eagle (Basic Bank Account)',
    tier: 'tier1',
    description:
      'A low-documentation entry-level savings account for everyday needs.',
    enabled: true,
  },
  {
    id: 'baby-warrior',
    name: 'Baby Warrior',
    tier: 'tier2',
    description:
      "A savings account for children, opened and managed by a parent or guardian.",
    enabled: false,
  },
  {
    id: 'youth-wallet',
    name: 'Youth Wallet',
    tier: 'tier2',
    description: 'An account designed for young account holders and students.',
    enabled: false,
  },
  {
    id: 'access-oryx',
    name: 'Access Oryx',
    tier: 'tier2',
    description: 'An everyday transactional account for individuals.',
    enabled: true,
  },
  {
    id: 'access-canyon-prestige',
    name: 'Access Canyon Prestige',
    tier: 'tier2',
    description: 'A premium banking account with added benefits and rewards.',
    enabled: false,
  },
  {
    id: 'access-oryx-elite',
    name: 'Access Oryx Elite',
    tier: 'tier2',
    description: 'An elite account with premium features and higher limits.',
    enabled: false,
  },
]

export const EMPTY_APPLICATION: ApplicationData = {
  productId: null,
  personal: {
    title: '',
    firstName: '',
    middleName: '',
    surname: '',
    gender: '',
    race: '',
    maritalStatus: '',
    nationality: '',
    birthCountry: '',
    dateOfBirth: '',
    identityType: '',
    idNumber: '',
    idIssueDate: '',
    idExpiryDate: '',
    residentPermitNumber: '',
    residentPermitExpiryDate: '',
    highestQualification: '',
  },
  address: {
    erfNo: '',
    streetName: '',
    locationSuburb: '',
    cityTown: '',
    region: '',
    poBox: '',
    phoneNo: '',
    emailAddress: '',
  },
  employment: {
    employmentStatus: '',
    sourceOfFunds: '',
    sourceOfWealth: '',
    frequencyOfWithdrawals: '',
    frequencyOfDeposits: '',
    employerName: '',
    occupation: '',
    incomeRange: '',
    cityTown: '',
    officePhoneNo: '',
  },
  services: {
    transactionNotifications: [],
    digitalProductsPreference: [],
  },
  documents: {
    identityDocumentName: '',
    fullBirthCertificateName: '',
    guardianshipLetterName: '',
    payslipName: '',
    proofOfResidenceName: '',
  },
  signatureDataUrl: '',
}

export type StepId =
  | 'start'
  | 'account-type'
  | 'personal'
  | 'address'
  | 'employment'
  | 'services'
  | 'review'
  | 'documents'
  | 'terms'
  | 'signature'
  | 'submit'
  | 'success'

export const WIZARD_STEPS: { id: StepId; label: string }[] = [
  { id: 'account-type', label: 'Account Type' },
  { id: 'personal', label: 'Personal Info' },
  { id: 'address', label: 'Address' },
  { id: 'employment', label: 'Employment' },
  { id: 'services', label: 'Services' },
  { id: 'review', label: 'Review' },
  { id: 'documents', label: 'Documents' },
  { id: 'terms', label: 'Terms' },
  { id: 'signature', label: 'Signature' },
  { id: 'submit', label: 'Submit' },
  ]
