import type { AccountProduct } from '../types'

interface BreadcrumbProps {
  product: AccountProduct | undefined
}

const TIER_LABELS: Record<AccountProduct['tier'], string> = {
  tier1: 'Tier 1',
  tier2: 'Tier 2',
}

function Breadcrumb({ product }: BreadcrumbProps) {
  if (!product) return null

  return (
    <nav className="breadcrumb-trail" aria-label="Breadcrumb">
      <ol>
        <li className="breadcrumb-item">
          <span className="breadcrumb-label">{TIER_LABELS[product.tier]}</span>
          <span className="breadcrumb-separator" aria-hidden="true">
            ›
          </span>
        </li>
        <li className="breadcrumb-item">
          <span className="breadcrumb-label current" aria-current="step">
            {product.name}
          </span>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb
