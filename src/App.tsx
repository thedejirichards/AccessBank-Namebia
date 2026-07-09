import { useState } from 'react'
import StartPage from './components/StartPage'
import ProgressSteps from './components/ProgressSteps'
import AccountTypeStep from './components/AccountTypeStep'
import PersonalDetailsStep from './components/PersonalDetailsStep'
import AddressStep from './components/AddressStep'
import EmploymentStep from './components/EmploymentStep'
import ServicesStep from './components/ServicesStep'
import ReviewStep from './components/ReviewStep'
import DocumentsStep from './components/DocumentsStep'
import TermsStep from './components/TermsStep'
import SignatureStep from './components/SignatureStep'
import SubmitStep from './components/SubmitStep'
import SuccessStep from './components/SuccessStep'
import {
  ACCOUNT_PRODUCTS,
  EMPTY_APPLICATION,
  type ApplicationData,
  type StepId,
} from './types'
import heroImg from './assets/hero.jpg'
import accessMark from './assets/access-mark.svg'
import './App.css'

function generateAccountNumber(): string {
  return String(Math.floor(1000000000 + Math.random() * 9000000000))
}

function App() {
  const [step, setStep] = useState<StepId>('start')
  const [application, setApplication] = useState<ApplicationData>(EMPTY_APPLICATION)
  const [accountNumber, setAccountNumber] = useState('')

  const product = ACCOUNT_PRODUCTS.find((item) => item.id === application.productId)

  const handleSubmit = () => {
    if (product?.tier !== 'tier2') {
      setAccountNumber(generateAccountNumber())
    }
    setStep('success')
  }

  const handleStartOver = () => {
    setApplication(EMPTY_APPLICATION)
    setAccountNumber('')
    setStep('start')
  }

  const isFormStep = step !== 'start' && step !== 'success'
  const showHero = step === 'start'
  const showSideNav = isFormStep

  return (
    <div className="app-shell">
      {showHero && (
        <div className="hero-panel">
          <img src={heroImg} alt="" />
        </div>
      )}

      {showSideNav && <ProgressSteps currentStep={step} />}

      <div
        className={`content-panel ${showHero || showSideNav ? '' : 'content-panel--full'}`}
      >
        <div className={`panel-inner ${step === 'start' ? 'panel-inner--plain' : ''}`}>
          {step === 'start' && <StartPage onStart={() => setStep('account-type')} />}

          {step === 'account-type' && (
            <AccountTypeStep
              productId={application.productId}
              onBack={() => setStep('start')}
              onContinue={(productId) => {
                setApplication((prev) => ({ ...prev, productId }))
                setStep('personal')
              }}
            />
          )}

          {step === 'personal' && (
            <PersonalDetailsStep
              value={application.personal}
              onBack={() => setStep('account-type')}
              onContinue={(personal) => {
                setApplication((prev) => ({ ...prev, personal }))
                setStep('address')
              }}
            />
          )}

          {step === 'address' && (
            <AddressStep
              value={application.address}
              onBack={() => setStep('personal')}
              onContinue={(address) => {
                setApplication((prev) => ({ ...prev, address }))
                setStep('employment')
              }}
            />
          )}

          {step === 'employment' && (
            <EmploymentStep
              value={application.employment}
              onBack={() => setStep('address')}
              onContinue={(employment) => {
                setApplication((prev) => ({ ...prev, employment }))
                setStep('services')
              }}
            />
          )}

          {step === 'services' && (
            <ServicesStep
              value={application.services}
              onBack={() => setStep('employment')}
              onContinue={(services) => {
                setApplication((prev) => ({ ...prev, services }))
                setStep('review')
              }}
            />
          )}

          {step === 'review' && (
            <ReviewStep
              data={application}
              product={product}
              onBack={() => setStep('services')}
              onEdit={(target) => setStep(target)}
              onSubmit={() => setStep('documents')}
            />
          )}

          {step === 'documents' && (
            <DocumentsStep
              value={application.documents}
              tier={product?.tier ?? null}
              isEmployed={
                application.employment.employmentStatus === 'employed' ||
                application.employment.employmentStatus === 'self-employed'
              }
              onBack={() => setStep('review')}
              onContinue={(documents) => {
                setApplication((prev) => ({ ...prev, documents }))
                setStep('terms')
              }}
            />
          )}

          {step === 'terms' && (
            <TermsStep onBack={() => setStep('documents')} onContinue={() => setStep('signature')} />
          )}

          {step === 'signature' && (
            <SignatureStep
              value={application.signatureDataUrl}
              onBack={() => setStep('terms')}
              onContinue={(signatureDataUrl) => {
                setApplication((prev) => ({ ...prev, signatureDataUrl }))
                setStep('submit')
              }}
            />
          )}

          {step === 'submit' && (
            <SubmitStep
              applicantName={application.personal.firstName}
              productName={product?.name ?? 'account'}
              onBack={() => setStep('signature')}
              onSubmit={handleSubmit}
            />
          )}

          {step === 'success' && (
            <SuccessStep
              tier={product?.tier ?? null}
              accountNumber={accountNumber}
              accountName={`${application.personal.firstName} ${application.personal.middleName} ${application.personal.surname}`
                .replace(/\s+/g, ' ')
                .trim()}
              applicantName={application.personal.firstName}
              productName={product?.name ?? 'account'}
              onStartOver={handleStartOver}
            />
          )}
        </div>

        <img src={accessMark} className="corner-logo" alt="" aria-hidden="true" />
      </div>
    </div>
  )
}

export default App
