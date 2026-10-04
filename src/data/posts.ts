// EDITABLE: knowledge articles. ICAI permits professional updates only —
// no general news, entertainment or promotional content.
export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  coverImage: string
  author: string
  date: string // ISO
  updated?: string
  readingTime: string
  body: string // markdown
}

export const posts: BlogPost[] = [
  {
    slug: 'old-vs-new-tax-regime-fy-2026-27',
    title: 'Old vs New Tax Regime for FY 2026-27: How to Decide',
    excerpt:
      'Slab rates, the ₹12 lakh rebate and the deductions you give up — a practical way to compare both regimes for the current year.',
    category: 'Income Tax',
    coverImage: '',
    author: 'CA Rakesh Rathi',
    date: '2026-04-10',
    updated: '2026-09-15',
    readingTime: '6 min read',
    body: `## Slab rates under the new regime

| Total income | Rate |
| --- | --- |
| Up to ₹4,00,000 | Nil |
| ₹4,00,001 – ₹8,00,000 | 5% |
| ₹8,00,001 – ₹12,00,000 | 10% |
| ₹12,00,001 – ₹16,00,000 | 15% |
| ₹16,00,001 – ₹20,00,000 | 20% |
| ₹20,00,001 – ₹24,00,000 | 25% |
| Above ₹24,00,000 | 30% |

A rebate of up to ₹60,000 makes income up to **₹12 lakh** tax-free for resident individuals. Salaried individuals also get a standard deduction of **₹75,000**.

## What you give up

The new regime does not allow most deductions and exemptions — 80C, 80D, HRA, LTA and interest on a self-occupied home loan, among others. The old regime retains them, with a standard deduction of ₹50,000.

## A simple way to decide

1. Compute tax under the new regime on your gross income.
2. Add up the deductions you can genuinely claim under the old regime.
3. Compute tax under the old regime and compare.

As a rule of thumb, the new regime is beneficial unless your deductions are substantial. Our [income tax calculator](/tools/income-tax-calculator) does this comparison instantly.

> This article is for general information only. [Contact us](/contact) for advice on your specific facts.`,
  },
  {
    slug: 'gst-rate-rationalisation-what-changed',
    title: 'GST Rate Rationalisation: What Changed for Businesses',
    excerpt:
      'The revised GST structure moved most supplies to 5% and 18%, with a 40% rate for specified items. Here is what to review in your business.',
    category: 'GST',
    coverImage: '',
    author: 'CA Neha Rathi',
    date: '2026-01-20',
    readingTime: '5 min read',
    body: `## The new structure

Effective **22 September 2025**, the GST rate structure was rationalised. Most goods and services now fall under two principal rates — **5%** and **18%** — with a **40%** rate for specified items. Special rates continue for items such as gold and precious stones.

## What businesses should review

- **Item master and HSN mapping** — update rates in billing and accounting software.
- **Contracts spanning the change date** — determine the time of supply to apply the correct rate.
- **Input tax credit** — rate reductions on outputs may create an inverted duty structure; review refund eligibility.
- **Pricing** — ensure benefits of rate reductions are reflected in prices.

## Our suggestion

Run a reconciliation of invoices issued around the change date and review a sample of HSN classifications. Errors here typically surface during GST audits.

> Need help with a GST rate review? [Contact us](/contact).`,
  },
  {
    slug: 'income-tax-act-2025-key-changes',
    title: 'The Income-tax Act, 2025: Key Changes for Taxpayers',
    excerpt:
      'The new Income-tax Act applies from 1 April 2026. We summarise the structural changes — including the concept of a “tax year”.',
    category: 'Income Tax',
    coverImage: '',
    author: 'CA Pooja Jain',
    date: '2026-03-05',
    readingTime: '7 min read',
    body: `## Why a new Act

The Income-tax Act, 2025 replaces the Income-tax Act, 1961 from **1 April 2026**. The stated aim is simplification — fewer sections, simpler language and consolidated provisions — rather than a change in tax policy.

## Key structural changes

- **Tax year** — the concepts of "previous year" and "assessment year" are replaced by a single "tax year".
- **Renumbered sections** — familiar provisions such as deductions, TDS and exemptions now sit under new section numbers.
- **Consolidated tables** — TDS rates and many exemptions are presented in tabular form.

## What stays the same

Slab rates for the year, the basic charging structure and most deductions continue. Matters relating to years up to 2025-26 continue under the 1961 Act.

## Practical steps

- Update internal checklists and software references to new section numbers.
- Review TDS processes against the consolidated TDS provisions.
- Keep both old and new references handy during the transition.

> For a review of your compliance processes, [contact us](/contact).`,
  },
  {
    slug: 'llp-or-private-limited-company',
    title: 'LLP or Private Limited Company: Choosing a Structure',
    excerpt:
      'The choice affects funding, compliance and taxation. We compare the two structures for early-stage businesses.',
    category: 'Company Law',
    coverImage: '',
    author: 'CA Arjun Mehta',
    date: '2025-12-12',
    readingTime: '5 min read',
    body: `## Private limited company

- Suits businesses planning external equity funding or ESOPs.
- Higher compliance — board meetings, AGM, statutory audit and ROC filings.
- Limited liability and a clear shareholding structure.

## Limited Liability Partnership

- Lower compliance; audit only above prescribed thresholds.
- Flexible profit-sharing among partners.
- Not suited to institutional equity funding.

## How to decide

If external equity funding is planned, a **private limited company** is usually appropriate. For professional or bootstrapped businesses, an **LLP** may be simpler to operate.

> Every situation is different — [contact us](/contact) to discuss yours.`,
  },
]
