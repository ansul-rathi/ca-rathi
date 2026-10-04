// Recurring statutory due dates (standard dates; the government may extend any
// of them by notification). The calendar is generated for any date range, so
// it never goes stale.
export type DueCategory = 'GST' | 'Income Tax' | 'TDS / TCS' | 'Company Law' | 'Payroll'

export type DueDate = {
  date: Date
  title: string
  detail: string
  category: DueCategory
}

type Rule = {
  day: number | 'last'
  months?: number[] // 1-12; omitted = every month
  title: string
  detail: string | ((d: Date) => string)
  category: DueCategory
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const prevMonth = (d: Date) => MONTHS[(d.getMonth() + 11) % 12]
const quarterEndingBefore = (d: Date) => {
  const start = new Date(d.getFullYear(), d.getMonth() - 3, 1)
  const end = new Date(d.getFullYear(), d.getMonth() - 1, 1)
  return `${MONTHS[start.getMonth()]}–${MONTHS[end.getMonth()]} ${end.getFullYear()}`
}

const rules: Rule[] = [
  // Monthly
  {
    day: 7,
    months: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
    title: 'TDS / TCS deposit',
    detail: (d) => `Deposit of tax deducted / collected during ${prevMonth(d)}.`,
    category: 'TDS / TCS',
  },
  {
    day: 30,
    months: [4],
    title: 'TDS deposit for March',
    detail: 'Deposit of tax deducted during March.',
    category: 'TDS / TCS',
  },
  {
    day: 11,
    title: 'GSTR-1 (monthly)',
    detail: (d) => `Statement of outward supplies for ${prevMonth(d)}.`,
    category: 'GST',
  },
  {
    day: 15,
    title: 'PF & ESI contribution',
    detail: (d) => `Provident Fund and ESI contribution for ${prevMonth(d)} wages.`,
    category: 'Payroll',
  },
  {
    day: 20,
    title: 'GSTR-3B (monthly)',
    detail: (d) => `Summary return and tax payment for ${prevMonth(d)}.`,
    category: 'GST',
  },
  {
    day: 25,
    months: [2, 3, 5, 6, 8, 9, 11, 12],
    title: 'PMT-06 (QRMP)',
    detail: (d) => `Monthly GST payment by QRMP taxpayers for ${prevMonth(d)}.`,
    category: 'GST',
  },
  // Quarterly
  {
    day: 13,
    months: [1, 4, 7, 10],
    title: 'GSTR-1 (QRMP)',
    detail: (d) => `Quarterly statement of outward supplies for ${quarterEndingBefore(d)}.`,
    category: 'GST',
  },
  {
    day: 22,
    months: [1, 4, 7, 10],
    title: 'GSTR-3B (QRMP)',
    detail: (d) =>
      `Quarterly return for ${quarterEndingBefore(d)} (22nd or 24th depending on the state).`,
    category: 'GST',
  },
  {
    day: 15,
    months: [1, 5, 7, 10],
    title: 'TCS return (Form 27EQ)',
    detail: 'Quarterly TCS statement.',
    category: 'TDS / TCS',
  },
  {
    day: 31,
    months: [1, 5, 7, 10],
    title: 'TDS returns (24Q / 26Q / 27Q)',
    detail: 'Quarterly TDS statements for salary and non-salary payments.',
    category: 'TDS / TCS',
  },
  {
    day: 15,
    months: [6, 9, 12, 3],
    title: 'Advance tax instalment',
    detail: (d) =>
      `${{ 5: '15%', 8: '45%', 11: '75%', 2: '100%' }[d.getMonth()] ?? ''} of estimated tax liability (cumulative).`,
    category: 'Income Tax',
  },
  {
    day: 15,
    months: [6],
    title: 'Form 16 to employees',
    detail: 'Issue of TDS certificate on salary for the previous year.',
    category: 'TDS / TCS',
  },
  {
    day: 30,
    months: [4, 10],
    title: 'MSME Form-1 (half-yearly)',
    detail: 'Return of outstanding payments to micro and small enterprises.',
    category: 'Company Law',
  },
  // Annual
  {
    day: 30,
    months: [5],
    title: 'LLP Form 11',
    detail: 'Annual return of LLPs.',
    category: 'Company Law',
  },
  {
    day: 15,
    months: [7],
    title: 'FLA return (RBI)',
    detail: 'Annual return on foreign liabilities and assets.',
    category: 'Company Law',
  },
  {
    day: 31,
    months: [7],
    title: 'Income-tax return (non-audit)',
    detail: 'Due date for individuals and entities not liable to tax audit.',
    category: 'Income Tax',
  },
  {
    day: 30,
    months: [9],
    title: 'Tax audit report',
    detail: 'Filing of tax audit report (check for notified extensions).',
    category: 'Income Tax',
  },
  {
    day: 30,
    months: [9],
    title: 'DIR-3 KYC',
    detail: 'Annual KYC of directors holding a DIN.',
    category: 'Company Law',
  },
  {
    day: 30,
    months: [10],
    title: 'AOC-4 & LLP Form 8',
    detail: 'Financial statements of companies (AGM on 30 Sep) and LLP statement of account.',
    category: 'Company Law',
  },
  {
    day: 31,
    months: [10],
    title: 'Income-tax return (audit cases)',
    detail: 'Due date for taxpayers liable to tax audit.',
    category: 'Income Tax',
  },
  {
    day: 29,
    months: [11],
    title: 'MGT-7 / MGT-7A',
    detail: 'Annual return of companies (60 days from AGM).',
    category: 'Company Law',
  },
  {
    day: 30,
    months: [11],
    title: 'Income-tax return (transfer pricing)',
    detail: 'Due date for taxpayers with international / specified domestic transactions.',
    category: 'Income Tax',
  },
  {
    day: 31,
    months: [12],
    title: 'GSTR-9 / GSTR-9C',
    detail: 'GST annual return and reconciliation statement for the previous year.',
    category: 'GST',
  },
]

const daysIn = (y: number, m: number) => new Date(y, m + 1, 0).getDate()

export function getDueDates(from: Date, to: Date): DueDate[] {
  const out: DueDate[] = []
  const start = new Date(from.getFullYear(), from.getMonth(), 1)
  for (let cur = start; cur <= to; cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1)) {
    const y = cur.getFullYear()
    const m = cur.getMonth()
    for (const r of rules) {
      if (r.months && !r.months.includes(m + 1)) continue
      const day = r.day === 'last' ? daysIn(y, m) : Math.min(r.day, daysIn(y, m))
      const date = new Date(y, m, day)
      if (date < new Date(from.getFullYear(), from.getMonth(), from.getDate()) || date > to) continue
      out.push({
        date,
        title: r.title,
        detail: typeof r.detail === 'function' ? r.detail(date) : r.detail,
        category: r.category,
      })
    }
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const DUE_CATEGORIES: DueCategory[] = [
  'GST',
  'Income Tax',
  'TDS / TCS',
  'Company Law',
  'Payroll',
]
