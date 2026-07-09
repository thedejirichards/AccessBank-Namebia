import { useState } from 'react'

interface TermsStepProps {
  onBack: () => void
  onContinue: () => void
}

const SUB_CLAUSES: string[] = [
  'I/We accept full responsibility for the authenticity and accuracy of all signatures or endorsements on transactions, notes, receipts and other financial documents deposited into my/our account. The bank will not be held liable for any issues arising from incorrect or fraudulent endorsements.',
  'I/We accept full responsibility for the authenticity and accuracy of all signatures or endorsements on transactions, notes, receipts and other financial documents deposited into my/our account. The bank will not be held liable for any issues arising from incorrect or fraudulent endorsements.',
  "I/We release the bank from any responsibility for loss or damage to funds deposited in my/our account(s) resulting from future government actions, laws, taxes, levies, embargoes or any other events beyond the bank's control.",
  'I/We acknowledge that all funds in my/our account are payable on demand only in the local currency legally in circulation in Namibia at the time of withdrawal.',
  'I/We agree to be bound by any changes to the account(s) terms and conditions that are sent to my/our last known address. Any notice or letter sent to that address will be considered as properly delivered and received at the time it would normally be delivered by post.',
  "I/We acknowledge that the bank will not be held liable for any funds handed to bank staff outside the bank's official premises.",
  "I/We agree to raise any concerns or disagreements with entries on my/our bank statement within 15 days from the date the statement is sent. If the bank does not receive a notice of disagreement within that period, the statement will be considered correct and accepted.",
  'I/We agree to take full responsibility, at my/our own expense, to protect and indemnify the bank against any claims, losses or liabilities that may arise from the use of my/our account or services. This includes any breach of terms, failure to perform or any errors, false statements, misconduct or negligence on my/our part.',
  'I/We acknowledge that the bank will not be liable for any indirect, incidental or consequential losses or damages related to the use of my/our account or banking services, under any circumstances.',
  "I/We acknowledge that the bank will not be held liable for any failure to meet its obligations under these terms, or for any loss or damage I/We may suffer, regardless of the cause, including disputes or other circumstances beyond the bank's control.",
  "I/We agree to fully indemnify and protect the bank from any claims, losses, legal actions, costs (including legal fees) or damages that may arise from disputes related to my/our account(s), the enforcement of the bank's rights or the bank acting on my/our instructions, including electronic instructions, or failing to act on them.",
  'I/We agree that if any amount owed to the bank is not paid by the due date, I/We will be liable to pay interest on the unpaid amount, both before and after any legal judgment. The interest rate will be determined by the bank and will apply from the date the payment was due until it is fully paid.',
  'I/We accept full responsibility for complying with all applicable laws and regulations in Namibia and any other relevant jurisdiction when opening and operating my/our account. I/We agree to indemnify and protect the bank from any claims, losses, legal actions or costs (including legal fees) that may arise from failure to comply with such laws or regulations.',
  'I/We acknowledge that the obligation to indemnify the bank will remain in effect even after my/our account has been closed or terminated.',
  "I/We agree that any negative balance on my/our transactional account(s) will attract interest at a rate determined by the bank from time to time. I/We authorize the bank to deduct standard banking charges, including interest, commissions and service fees, as set by the bank's management.",
  "I/We agree that, in addition to any legal rights the bank may have, the bank may at any time without prior notice combine or consolidate any of my/our account(s) and transfer funds or assets (including cash, deposits or securities) to settle any debts or liabilities I/we owe to the bank. This applies to all types of liabilities, whether direct, indirect, joint or contingent.",
  'I/We accept full responsibility for keeping my/our account(s)-related items secure and confidential. This includes account statements, balance confirmation certificates, debit cards and PINs, internet banking user IDs and passwords, and any other items linked to my/our account.',
  'I/We agree not to initiate any payment instruction or financial transaction on my/our account unless there are sufficient funds to cover it. I/We authorize the bank to report any failed or dishonoured transactions due to insufficient funds to the Bank of Namibia (BON) or any other relevant regulatory authority for further investigation.',
  'I/We pledge to comply with all applicable rules and regulations issued by the Bank of Namibia or any other relevant authority regarding failed or dishonoured payment instructions, including electronic transfers and debit orders. I/We irrevocably authorize the bank to enforce such rules without further notice in the event of any breach, including reporting incidents to the appropriate regulatory bodies.',
]

function TermsStep({ onBack, onContinue }: TermsStepProps) {
  const [accepted, setAccepted] = useState(false)

  const handleSubmit = () => {
    if (accepted) onContinue()
  }

  return (
    <div className="wizard-step">
      <h2>Terms and conditions</h2>
      <p className="step-intro">Please read and accept the terms below to continue.</p>

      <div className="terms-box">
        <ol className="terms-list">
          <li>
            Open an account(s) in my/our name and at any time subsequently open further
            accounts as I/we may direct.
          </li>
          <li>
            I/We authorize the bank to process all payment instructions from this
            account(s), as long as they are signed by me/us. The bank may debit these
            payments even if the account(s) has insufficient funds, which may result in an
            overdraft. However, the bank is not obligated to approve or extend any
            overdraft. I/We accept these terms as part of our banking agreement.
            <ol className="terms-sublist">
              {SUB_CLAUSES.map((clause, index) => (
                <li key={index}>{clause}</li>
              ))}
            </ol>
          </li>
        </ol>
      </div>

      <label className="checkbox-option declaration">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
        />
        <span>I have read and accept the Terms and Conditions.</span>
      </label>

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" disabled={!accepted} onClick={handleSubmit}>
          Submit application
        </button>
      </div>
    </div>
  )
}

export default TermsStep
