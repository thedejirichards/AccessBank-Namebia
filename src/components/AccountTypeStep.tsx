import { useState } from 'react'
import { ACCOUNT_PRODUCTS, type Tier } from '../types'

interface AccountTypeStepProps {
  productId: string | null
  onBack: () => void
  onContinue: (productId: string) => void
}

const TIERS: { id: Tier; label: string; description: string }[] = [
  {
    id: 'tier1',
    label: 'Tier 1',
    description: 'A simple, low-documentation account.',
  },
  {
    id: 'tier2',
    label: 'Tier 2',
    description: 'Full-service accounts with more product choices.',
  },
]

function AccountTypeStep({ productId, onBack, onContinue }: AccountTypeStepProps) {
  const initialProduct = ACCOUNT_PRODUCTS.find((product) => product.id === productId)
  const [selectedTier, setSelectedTier] = useState<Tier | null>(
    initialProduct?.tier ?? null,
  )
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    productId,
  )

  const productsForTier = ACCOUNT_PRODUCTS.filter(
    (product) => product.tier === selectedTier,
  )

  const handleSelectTier = (tier: Tier) => {
    setSelectedTier(tier)
    setSelectedProductId(null)
  }

  return (
    <div className="wizard-step">
      <h2>Choose your account type</h2>
      <p className="step-intro">
        Select a tier, then pick the account product that suits you.
      </p>

      <div className="tier-options">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            className={`tier-card ${selectedTier === tier.id ? 'selected' : ''}`}
            onClick={() => handleSelectTier(tier.id)}
          >
            <span className="tier-card-label">{tier.label}</span>
            <span className="tier-card-description">{tier.description}</span>
          </button>
        ))}
      </div>

      {selectedTier && (
        <div className="product-options">
          {productsForTier.map((product) => (
            <label
              key={product.id}
              className={`product-card ${selectedProductId === product.id ? 'selected' : ''} ${product.enabled ? '' : 'disabled'}`}
            >
              <input
                type="radio"
                name="product"
                value={product.id}
                checked={selectedProductId === product.id}
                disabled={!product.enabled}
                onChange={() => setSelectedProductId(product.id)}
              />
              <span className="product-card-body">
                <span className="product-card-name">
                  {product.name}
                  {!product.enabled && <span className="product-card-tag">Coming soon</span>}
                </span>
                <span className="product-card-description">
                  {product.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="wizard-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          className="btn-primary"
          disabled={!selectedProductId}
          onClick={() => selectedProductId && onContinue(selectedProductId)}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default AccountTypeStep
