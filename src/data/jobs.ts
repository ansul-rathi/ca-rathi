// EDITABLE: career openings.
export type JobOpening = {
  slug: string
  title: string
  type: string
  location: string
  experience: string
  description: string
  responsibilities: string[]
}

export const jobs: JobOpening[] = [
  {
    slug: 'article-assistant',
    title: 'Article Assistant',
    type: 'Articleship',
    location: 'Jaipur (On-site)',
    experience: 'CA Intermediate — one or both groups cleared',
    description:
      'Articleship under the guidance of the partners, with exposure to audit, direct and indirect taxation and company law work.',
    responsibilities: [
      'Assist in statutory, tax and internal audit engagements',
      'Prepare income-tax and GST returns',
      'Maintain working papers as per firm documentation standards',
      'Coordinate with clients for data and queries',
    ],
  },
  {
    slug: 'audit-manager',
    title: 'Audit Manager',
    type: 'Full-time',
    location: 'Jaipur (On-site)',
    experience: 'Qualified CA with 3+ years of audit experience',
    description:
      'Manage audit engagements from planning to reporting, supervise audit teams and review working papers.',
    responsibilities: [
      'Plan and execute statutory and internal audits',
      'Review working papers and draft reports',
      'Supervise and train article assistants',
      'Ensure compliance with Standards on Auditing',
    ],
  },
  {
    slug: 'gst-executive',
    title: 'GST Executive',
    type: 'Full-time',
    location: 'Jaipur (On-site / Hybrid)',
    experience: '1–3 years in GST compliance',
    description:
      'Handle GST return filing, reconciliations and notice replies for a portfolio of clients.',
    responsibilities: [
      'Prepare and file GSTR-1, GSTR-3B and annual returns',
      'Reconcile input tax credit with GSTR-2B',
      'Draft replies to GST notices',
      'Track amendments and notifications',
    ],
  },
]
