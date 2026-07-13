import { useRef, useState, type ChangeEvent, type PointerEvent } from 'react'

interface SignatureStepProps {
  value: string
  onBack: () => void
  onContinue: (signatureDataUrl: string) => void
}

type SignatureMode = 'draw' | 'upload'

function SignatureStep({ value, onBack, onContinue }: SignatureStepProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawing = useRef(false)
  const [mode, setMode] = useState<SignatureMode>('draw')
  const [hasSigned, setHasSigned] = useState(Boolean(value))
  const [uploadDataUrl, setUploadDataUrl] = useState(value)
  const [uploadFileName, setUploadFileName] = useState('')
  const [uploadError, setUploadError] = useState('')

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

  const handleSelectMode = (nextMode: SignatureMode) => {
    setMode(nextMode)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (PNG, JPG, etc).')
      setUploadDataUrl('')
      setUploadFileName('')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setUploadError('')
      setUploadDataUrl(String(reader.result))
      setUploadFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveUpload = () => {
    setUploadDataUrl('')
    setUploadFileName('')
    setUploadError('')
  }

  const handleNext = () => {
    if (mode === 'draw') {
      const canvas = canvasRef.current
      if (!canvas || !hasSigned) return
      onContinue(canvas.toDataURL('image/png'))
    } else {
      if (!uploadDataUrl) return
      onContinue(uploadDataUrl)
    }
  }

  const canContinue = mode === 'draw' ? hasSigned : Boolean(uploadDataUrl)

  return (
    <div className="wizard-step">
      <h2>Electronic signature</h2>
      <p className="step-intro">
        Sign using your mouse or finger, or upload a photo/scan of your signature.
      </p>

      <div className="signature-mode-toggle" role="tablist" aria-label="Signature method">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'draw'}
          className={`signature-mode-btn ${mode === 'draw' ? 'selected' : ''}`}
          onClick={() => handleSelectMode('draw')}
        >
          Draw signature
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'upload'}
          className={`signature-mode-btn ${mode === 'upload' ? 'selected' : ''}`}
          onClick={() => handleSelectMode('upload')}
        >
          Upload signature
        </button>
      </div>

      {mode === 'draw' ? (
        <>
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
        </>
      ) : (
        <>
          <label className="field field-wide">
            <span>Signature image</span>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <span className="field-hint">Upload a clear photo or scan of your signature.</span>
          </label>

          {uploadError && <p className="field-error">{uploadError}</p>}

          {uploadDataUrl && (
            <div className="signature-upload-preview">
              <img src={uploadDataUrl} alt="Uploaded signature preview" />
              <div className="signature-actions">
                <span className="field-hint">Selected: {uploadFileName}</span>
                <button type="button" className="link-button" onClick={handleRemoveUpload}>
                  Remove
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" disabled={!canContinue} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  )
}

export default SignatureStep
