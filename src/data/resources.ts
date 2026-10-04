// EDITABLE: useful links and document checklists.
// ICAI permits links to the Institute, regulators and government portals only —
// do not add links to commercial companies.
export type UsefulLink = { name: string; url: string; desc: string }

export const usefulLinks: { group: string; links: UsefulLink[] }[] = [
  {
    group: 'Income Tax',
    links: [
      { name: 'Income Tax e-Filing Portal', url: 'https://www.incometax.gov.in', desc: 'File returns, view AIS/26AS, respond to notices.' },
      { name: 'TRACES', url: 'https://www.tdscpc.gov.in', desc: 'TDS statements, Form 16/16A, correction requests.' },
      { name: 'Central Board of Direct Taxes', url: 'https://incometaxindia.gov.in', desc: 'Acts, rules, circulars and notifications.' },
    ],
  },
  {
    group: 'GST',
    links: [
      { name: 'GST Portal', url: 'https://www.gst.gov.in', desc: 'Registration, returns, payments and refunds.' },
      { name: 'e-Invoice Portal', url: 'https://einvoice1.gst.gov.in', desc: 'Generation of IRN for e-invoices.' },
      { name: 'e-Way Bill Portal', url: 'https://ewaybillgst.gov.in', desc: 'Generation of e-way bills.' },
      { name: 'CBIC', url: 'https://www.cbic.gov.in', desc: 'GST laws, rate notifications and circulars.' },
    ],
  },
  {
    group: 'Corporate & Regulatory',
    links: [
      { name: 'Ministry of Corporate Affairs', url: 'https://www.mca.gov.in', desc: 'Company and LLP filings and master data.' },
      { name: 'Udyam Registration', url: 'https://udyamregistration.gov.in', desc: 'MSME registration.' },
      { name: 'EPFO', url: 'https://www.epfindia.gov.in', desc: 'Provident Fund compliance.' },
      { name: 'Reserve Bank of India', url: 'https://www.rbi.org.in', desc: 'FEMA regulations and master directions.' },
    ],
  },
  {
    group: 'Professional',
    links: [
      { name: 'The Institute of Chartered Accountants of India', url: 'https://www.icai.org', desc: 'Statutory body regulating the CA profession.' },
      { name: 'ICAI Ethical Standards Board', url: 'https://esb.icai.org', desc: 'Code of Ethics and guidelines for members.' },
    ],
  },
]

export type Checklist = { slug: string; title: string; intro: string; items: string[] }

export const checklists: Checklist[] = [
  {
    slug: 'itr-salaried',
    title: 'Income-tax return — salaried individuals',
    intro: 'Documents generally required to file a return for salary income.',
    items: [
      'PAN and Aadhaar (linked)',
      'Form 16 from employer(s)',
      'Form 26AS, AIS and TIS',
      'Bank account details and interest certificates',
      'Rent receipts and landlord PAN (for HRA, old regime)',
      'Proofs for 80C, 80D and other deductions (old regime)',
      'Home loan interest certificate',
      'Capital gain statements from brokers / mutual funds',
    ],
  },
  {
    slug: 'gst-registration',
    title: 'GST registration',
    intro: 'Documents for a new GST registration.',
    items: [
      'PAN of the business',
      'PAN, Aadhaar and photograph of proprietor / partners / directors',
      'Constitution document — partnership deed, incorporation certificate',
      'Proof of principal place of business (electricity bill, rent agreement / NOC)',
      'Bank statement or cancelled cheque',
      'Authorisation letter / board resolution for authorised signatory',
    ],
  },
  {
    slug: 'company-incorporation',
    title: 'Private limited company incorporation',
    intro: 'Information and documents for incorporating a company.',
    items: [
      'Two or more proposed names',
      'PAN, Aadhaar and address proof of all directors and shareholders',
      'Passport-size photographs of directors',
      'Registered office address proof and NOC from the owner',
      'Proposed authorised and paid-up capital',
      'Main objects of the business',
    ],
  },
  {
    slug: 'tax-audit',
    title: 'Tax audit',
    intro: 'Records generally required for a tax audit.',
    items: [
      'Books of account and trial balance',
      'Fixed asset register with additions and disposals',
      'GST returns and reconciliation',
      'TDS returns and challans',
      'Loan confirmations and bank statements',
      'Details of payments to related parties',
      'Stock statements and valuation basis',
    ],
  },
]
