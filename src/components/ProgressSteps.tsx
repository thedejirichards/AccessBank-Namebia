import { WIZARD_STEPS, type StepId } from '../types'
import accessMark from '../assets/access-mark.svg'

interface ProgressStepsProps {
  currentStep: StepId
}

function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const currentIndex = WIZARD_STEPS.findIndex((step) => step.id === currentStep)

  return (
    <nav className="side-nav" aria-label="Application progress">
      <img src={accessMark} className="side-nav-logo" alt="" aria-hidden="true" />
      <ol className="progress-steps">
        {WIZARD_STEPS.map((step, index) => {
          const state =
            index < currentIndex
              ? 'done'
              : index === currentIndex
                ? 'active'
                : 'upcoming'
          return (
            <li key={step.id} className={`progress-step ${state}`}>
              <span className="progress-step-marker">
                {state === 'done' ? '✓' : index + 1}
              </span>
              <span className="progress-step-label">{step.label}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default ProgressSteps
