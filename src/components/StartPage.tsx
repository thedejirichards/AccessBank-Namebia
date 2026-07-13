interface StartPageProps {
  onStart: () => void
}

function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="start-copy">
      <h1>Account Opening Namibia</h1>
      <p>Enjoy a savings account without hassles.</p>
      <button type="button" className="btn-primary" onClick={onStart}>
        Open Account
      </button>
    </div>
  )
}

export default StartPage
