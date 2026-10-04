// Income-tax computation for resident individuals, FY 2026-27 (tax year 2026-27).
// Simplified estimator: normal-rate income only (no special-rate capital gains).

export type AgeGroup = 'below60' | '60to80' | 'above80'
type Slab = [upTo: number, rate: number]

const NEW_SLABS: Slab[] = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.1],
  [1600000, 0.15],
  [2000000, 0.2],
  [2400000, 0.25],
  [Infinity, 0.3],
]

const oldSlabs = (age: AgeGroup): Slab[] => {
  const exempt = age === 'above80' ? 500000 : age === '60to80' ? 300000 : 250000
  return [
    [exempt, 0],
    ...(exempt < 500000 ? ([[500000, 0.05]] as Slab[]) : []),
    [1000000, 0.2],
    [Infinity, 0.3],
  ]
}

const slabTax = (income: number, slabs: Slab[]) => {
  let tax = 0
  let prev = 0
  for (const [upTo, rate] of slabs) {
    if (income <= prev) break
    tax += (Math.min(income, upTo) - prev) * rate
    prev = upTo
  }
  return tax
}

// Surcharge with marginal relief.
const surcharge = (income: number, tax: number, slabs: Slab[], regime: 'new' | 'old') => {
  const bands: [number, number][] = [
    [50_00_000, 0.1],
    [1_00_00_000, 0.15],
    [2_00_00_000, 0.25],
    ...(regime === 'old' ? ([[5_00_00_000, 0.37]] as [number, number][]) : []),
  ]
  let rate = 0
  let threshold = 0
  for (const [t, r] of bands) if (income > t) [threshold, rate] = [t, r]
  if (!rate) return 0
  const prevRate = bands.filter(([t]) => t < threshold).pop()?.[1] ?? 0
  const raw = tax * rate
  const taxAtThreshold = slabTax(threshold, slabs)
  const cap = taxAtThreshold * (1 + prevRate) + (income - threshold) - tax
  return Math.max(0, Math.min(raw, cap))
}

export type TaxInput = {
  age: AgeGroup
  salary: number // gross salary
  otherIncome: number // interest, rent (net), business etc.
  // old-regime deductions
  hraExemption: number
  sec80C: number
  sec80D: number
  homeLoanInterest: number
  sec80CCD1B: number
  otherDeductions: number
  // both regimes
  employerNps: number
}

export type TaxResult = {
  grossIncome: number
  deductions: number
  taxableIncome: number
  slabTax: number
  rebate: number
  surcharge: number
  cess: number
  total: number
  effectiveRate: number
}

const clamp = (n: number, max: number) => Math.max(0, Math.min(n || 0, max))
const round10 = (n: number) => Math.round(n / 10) * 10

export function computeTax(input: TaxInput, regime: 'new' | 'old'): TaxResult {
  const salary = Math.max(0, input.salary || 0)
  const gross = salary + Math.max(0, input.otherIncome || 0)
  let deductions: number

  if (regime === 'new') {
    deductions = Math.min(75000, salary) + clamp(input.employerNps, salary * 0.14)
  } else {
    deductions =
      Math.min(50000, salary) +
      clamp(input.hraExemption, salary) +
      clamp(input.sec80C, 150000) +
      clamp(input.sec80D, 100000) +
      clamp(input.homeLoanInterest, 200000) +
      clamp(input.sec80CCD1B, 50000) +
      clamp(input.otherDeductions, Infinity) +
      clamp(input.employerNps, salary * 0.1)
  }

  const taxable = Math.max(0, gross - deductions)
  const slabs = regime === 'new' ? NEW_SLABS : oldSlabs(input.age)
  const base = slabTax(taxable, slabs)

  let rebate = 0
  if (regime === 'new') {
    if (taxable <= 1200000) rebate = Math.min(base, 60000)
    else rebate = Math.max(0, base - (taxable - 1200000)) // marginal relief
  } else if (taxable <= 500000) {
    rebate = Math.min(base, 12500)
  }

  const afterRebate = base - rebate
  const sc = surcharge(taxable, afterRebate, slabs, regime)
  const cess = (afterRebate + sc) * 0.04
  const total = round10(afterRebate + sc + cess)

  return {
    grossIncome: gross,
    deductions,
    taxableIncome: taxable,
    slabTax: base,
    rebate,
    surcharge: sc,
    cess,
    total,
    effectiveRate: gross ? (total / gross) * 100 : 0,
  }
}

export const HRA_METROS = [
  'Delhi',
  'Mumbai',
  'Kolkata',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
]

export function computeHra(p: {
  basicDa: number
  hraReceived: number
  rentPaid: number
  metro: boolean
}) {
  const a = Math.max(0, p.hraReceived)
  const b = Math.max(0, p.rentPaid - 0.1 * p.basicDa)
  const c = (p.metro ? 0.5 : 0.4) * Math.max(0, p.basicDa)
  const exempt = Math.min(a, b, c)
  return { a, b, c, exempt, taxable: Math.max(0, a - exempt) }
}

export function computeGst(p: {
  amount: number
  rate: number
  mode: 'exclusive' | 'inclusive'
  interState: boolean
}) {
  const amount = Math.max(0, p.amount || 0)
  const base = p.mode === 'exclusive' ? amount : amount / (1 + p.rate / 100)
  const gst = base * (p.rate / 100)
  return {
    base,
    gst,
    total: base + gst,
    igst: p.interState ? gst : 0,
    cgst: p.interState ? 0 : gst / 2,
    sgst: p.interState ? 0 : gst / 2,
  }
}

export const inr = (n: number, digits = 0) =>
  '₹' +
  (Number.isFinite(n) ? n : 0).toLocaleString('en-IN', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })
