import { useRef, useState, type PointerEvent } from 'react'

interface SignatureStepProps {
  value: string
  onBack: () => void
  onContinue: (signatureDataUrl: string) => void
}

function SignatureStep({ value, onBack, onContinue }: SignatureStepProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawing = useRef(false)
  const [hasSigned, setHasSigned] = useState(Boolean(value))

  const getContext = () => canvasRef.current?.getContext('2d') ?? null

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = getContext()
    if (!canvas || !ctx) return
    isDrawing.current = true
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top)
  }

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    const ctx = getContext()
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#08060d'
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top)
    ctx.stroke()
    setHasSigned(true)
  }

  const stopDrawing = () => {
    isDrawing.current = false
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    const ctx = getContext()
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSigned(false)
  }

  const handleNext = () => {
    const canvas = canvasRef.current
    if (!canvas || !hasSigned) return
    onContinue(canvas.toDataURL('image/png'))
  }

  return (
    <div className="wizard-step">
      <h2>Electronic signature</h2>
      <p className="step-intro">Please sign in the block below using your mouse or finger.</p>

      <canvas
        ref={canvasRef}
        className="signature-pad"
        width={600}
        height={200}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
      />

      <div className="signature-actions">
        <button type="button" className="link-button" onClick={handleClear}>
          Clear signature
        </button>
      </div>

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" disabled={!hasSigned} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  )
}

export default SignatureStep
