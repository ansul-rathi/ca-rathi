// EDITABLE: service catalogue.
// ICAI note: describe professional services factually. No fees, no "best/leading",
// no loan arrangement, no claims of liaison with government offices.
export type ServiceFaq = { q: string; a: string }

export type Service = {
  slug: string
  title: string
  shortDesc: string
  icon: string // key in components/ui/Icon.tsx
  heroLine: string
  overview: string[]
  offerings: string[]
  documents?: string[] // typical documents required
  faqs: ServiceFaq[]
}

export const services: Service[] = [
  {
    slug: 'audit-assurance',
    title: 'Audit & Assurance',
    shortDesc:
      'Statutory, tax, internal and special-purpose audits carried out in accordance with the Standards on Auditing.',
    icon: 'ShieldCheck',
    heroLine: 'Independent audit and assurance engagements performed under ICAI Standards on Auditing.',
    overview: [
      'Our audit practice undertakes statutory audits under the Companies Act, 2013, tax audits under the Income-tax law, and internal, concurrent, stock and special-purpose audits for companies, LLPs, partnership firms, trusts and societies.',
      'Engagements follow a documented, risk-based methodology aligned with the Standards on Auditing issued by the Institute of Chartered Accountants of India (ICAI), with independence and quality-control requirements observed at every stage.',
      'Along with the audit report, management receives observations on internal controls and process gaps identified during the engagement.',
    ],
    offerings: [
      'Statutory audit under the Companies Act, 2013',
      'Tax audit under the Income-tax law',
      'Internal audit and process reviews',
      'Stock, fixed-asset and concurrent audits',
      'Audit of trusts, societies and NGOs',
      'Internal Financial Controls (IFC) reporting',
      'Certification engagements (net-worth, turnover, utilisation)',
    ],
    documents: [
      'Trial balance and books of account',
      'Bank statements and reconciliations',
      'Fixed asset register',
      'Statutory registers, minutes and agreements',
      'GST, TDS and other statutory returns filed during the year',
    ],
    faqs: [
      {
        q: 'Which standards are followed in your audits?',
        a: 'All audit engagements are performed in accordance with the Standards on Auditing issued by ICAI and the applicable provisions of the Companies Act, 2013 or other governing law.',
      },
      {
        q: 'Who requires a tax audit?',
        a: 'A tax audit is required where business turnover or professional receipts exceed the thresholds prescribed under the Income-tax law, or in certain cases where presumptive taxation provisions are not opted for. We can review your facts and confirm applicability.',
      },
    ],
  },
  {
    slug: 'income-tax',
    title: 'Direct Taxation',
    shortDesc:
      'Income-tax return filing, tax planning, TDS compliance, assessments and appellate representation.',
    icon: 'Receipt',
    heroLine: 'Compliance, planning and representation under the Income-tax law.',
    overview: [
      'We handle income-tax compliance for individuals, HUFs, firms, LLPs, companies and trusts — from computation of income and return filing to advance tax and TDS/TCS compliance.',
      'With the Income-tax Act, 2025 applicable from 1 April 2026, we assist clients in transitioning their compliance processes, while continuing to handle matters for earlier years under the Income-tax Act, 1961.',
      'We prepare replies to notices, represent clients in assessments and appeals before the appropriate authorities, and advise on the tax implications of transactions before they are undertaken.',
    ],
    offerings: [
      'Income-tax return filing for individuals, HUFs, firms, LLPs and companies',
      'Tax planning and old vs new regime evaluation',
      'Advance tax computation',
      'TDS/TCS compliance, quarterly returns and corrections',
      'Replies to notices and scrutiny assessments',
      'Representation before CIT(Appeals) and ITAT',
      'Capital gains computation and advisory',
    ],
    documents: [
      'PAN and Aadhaar',
      'Form 16 / salary slips',
      'Form 26AS, AIS and TIS',
      'Bank statements and interest certificates',
      'Investment proofs and capital gain statements',
    ],
    faqs: [
      {
        q: 'Should I choose the old or the new tax regime?',
        a: 'It depends on your income and the deductions you can claim. The new regime has lower slab rates and a rebate that makes income up to ₹12 lakh tax-free, while the old regime allows deductions such as 80C, 80D and HRA. Use our income tax calculator for an estimate, or contact us for a detailed comparison.',
      },
      {
        q: 'I have received an income-tax notice. What should I do?',
        a: 'Do not ignore it. Note the response due date, collect the documents referred to in the notice and have the notice reviewed by a professional before replying on the e-filing portal.',
      },
    ],
  },
  {
    slug: 'gst',
    title: 'GST Advisory & Compliance',
    shortDesc:
      'GST registration, monthly and annual returns, reconciliations, refunds, audits and notice replies.',
    icon: 'BadgePercent',
    heroLine: 'End-to-end Goods and Services Tax compliance and advisory.',
    overview: [
      'Our indirect tax team manages GST compliance for businesses of all sizes — registration, periodic returns, input tax credit reconciliation, e-invoicing and e-way bill processes.',
      'We advise on classification, place of supply and rate applicability, including the revised GST rate structure, and assist with refunds for exporters and inverted duty structures.',
      'We also prepare replies to departmental notices and represent clients in GST audits, assessments and appeals.',
    ],
    offerings: [
      'GST registration, amendment and cancellation',
      'GSTR-1, GSTR-3B and QRMP compliance',
      'Annual return (GSTR-9) and reconciliation statement (GSTR-9C)',
      'Input tax credit reconciliation with GSTR-2B',
      'GST refunds — exports and inverted duty structure',
      'Replies to notices, audits and appeals',
      'Classification and rate advisory',
    ],
    documents: [
      'PAN of the business and promoters',
      'Proof of principal place of business',
      'Bank account details',
      'Sales and purchase registers',
    ],
    faqs: [
      {
        q: 'When is GST registration mandatory?',
        a: 'Registration is generally required once aggregate turnover crosses the threshold limit (₹40 lakh for goods and ₹20 lakh for services in most states, lower in special category states), and in certain cases — such as inter-state supply of goods or e-commerce sales — irrespective of turnover.',
      },
      {
        q: 'What are the current GST rates?',
        a: 'Following the GST rate rationalisation effective 22 September 2025, most goods and services fall under 5% or 18%, with a 40% rate for specified items and special rates for items such as gold. Use our GST calculator for quick computations.',
      },
    ],
  },
  {
    slug: 'international-taxation',
    title: 'International Taxation & FEMA',
    shortDesc:
      'DTAA advisory, transfer pricing, foreign remittance certification and FEMA compliance.',
    icon: 'Globe',
    heroLine: 'Advisory on cross-border taxation, transfer pricing and foreign exchange regulations.',
    overview: [
      'We advise on Double Taxation Avoidance Agreements (DTAA), tax residency, permanent establishment and withholding tax on payments to non-residents.',
      'Our transfer pricing support covers benchmarking studies, documentation and the accountant’s report for international and specified domestic transactions.',
      'For FEMA, we assist with FDI and ODI reporting, annual returns on foreign liabilities and assets, and compliance for inbound and outbound investments.',
    ],
    offerings: [
      'DTAA and tax residency advisory',
      'Transfer pricing documentation and accountant’s report',
      'Foreign remittance certification (Form 15CA/15CB)',
      'FDI / ODI reporting and FLA return',
      'Taxation of expatriates and NRIs',
    ],
    faqs: [
      {
        q: 'When is a CA certificate required for foreign remittances?',
        a: 'For many taxable remittances to non-residents above the prescribed limit, an accountant’s certificate in Form 15CB is required before the remittance is made. We review the transaction and issue the certificate where applicable.',
      },
      {
        q: 'Do you assist NRIs with Indian tax filings?',
        a: 'Yes. We assist NRIs with return filing, DTAA relief, lower deduction certificates and repatriation-related compliance.',
      },
    ],
  },
  {
    slug: 'company-law',
    title: 'Company Law & ROC Compliance',
    shortDesc:
      'Incorporation of companies and LLPs, annual ROC filings and event-based compliance under the Companies Act, 2013.',
    icon: 'Scale',
    heroLine: 'Incorporation and ongoing compliance with the Ministry of Corporate Affairs.',
    overview: [
      'We assist with incorporation of private limited companies, one person companies and LLPs, including name reservation, drafting of constitutional documents and filings on the MCA portal.',
      'For existing entities we manage annual filings, statutory registers, board and general meeting documentation, and event-based filings for changes in directors, capital or registered office.',
      'We also assist with conversions, strike-off applications and compliance for dormant entities.',
    ],
    offerings: [
      'Private limited company, OPC and LLP incorporation',
      'Annual filings — AOC-4, MGT-7/7A, LLP Form 8 and Form 11',
      'Director KYC and DIN-related compliance',
      'Changes in directors, share capital and registered office',
      'Maintenance of statutory registers and minutes',
      'Conversion and strike-off applications',
    ],
    documents: [
      'PAN and Aadhaar of directors / partners',
      'Address proof of registered office',
      'Proposed names and objects of the business',
      'Digital Signature Certificates',
    ],
    faqs: [
      {
        q: 'Which is better for a startup — LLP or private limited company?',
        a: 'A private limited company is generally preferred where external equity funding or ESOPs are planned. An LLP carries lower compliance and suits professional or bootstrapped businesses. We can evaluate your plans before you decide.',
      },
      {
        q: 'What happens if annual ROC filings are delayed?',
        a: 'Late filing attracts additional fees for each day of delay and, in prolonged cases, can lead to penalties or disqualification of directors. Filing on time avoids these consequences.',
      },
    ],
  },
  {
    slug: 'business-registration',
    title: 'Business Registrations',
    shortDesc:
      'PAN/TAN, GST, MSME (Udyam), IEC, professional tax and Shops & Establishment registrations.',
    icon: 'Building2',
    heroLine: 'Statutory registrations required to start and operate a business in India.',
    overview: [
      'Starting a business involves several registrations under different laws. We identify the registrations applicable to your business and complete them in the correct sequence.',
      'We also advise on the choice of constitution — proprietorship, partnership, LLP or company — from a tax and compliance perspective.',
    ],
    offerings: [
      'PAN and TAN applications',
      'GST registration',
      'MSME / Udyam registration',
      'Import Export Code (IEC)',
      'Professional tax and Shops & Establishment registration',
      'Partnership deed drafting and firm registration',
      'Trust, society and Section 8 company registration',
    ],
    faqs: [
      {
        q: 'Which registrations does a new business need?',
        a: 'Most businesses need PAN, a bank account and, depending on turnover and activity, GST registration. Others — such as IEC, Udyam or professional tax — depend on the nature and location of the business.',
      },
    ],
  },
  {
    slug: 'accounting-payroll',
    title: 'Accounting & Payroll',
    shortDesc:
      'Bookkeeping, finalisation of accounts, payroll processing and statutory deductions.',
    icon: 'Calculator',
    heroLine: 'Accurate books of account and payroll, maintained month after month.',
    overview: [
      'We maintain books of account on commonly used accounting software, prepare periodic financial statements and assist in finalisation of accounts at year end.',
      'Our payroll service covers salary computation, payslips, TDS on salary and PF, ESI and professional tax compliance.',
      'Where we are appointed as statutory auditors, accounting services are not provided to the same entity, in line with independence requirements.',
    ],
    offerings: [
      'Bookkeeping and periodic accounting',
      'Finalisation of accounts and financial statements',
      'Payroll processing and payslips',
      'PF, ESI and professional tax compliance',
      'Accounts payable and receivable reconciliation',
      'MIS reports',
    ],
    faqs: [
      {
        q: 'Which accounting software do you work on?',
        a: 'We work on commonly used software such as Tally, Zoho Books and QuickBooks, and can adapt to the system you already use.',
      },
    ],
  },
  {
    slug: 'virtual-cfo-advisory',
    title: 'Virtual CFO & Business Advisory',
    shortDesc:
      'Budgeting, MIS, financial projections, CMA data and management advisory for growing businesses.',
    icon: 'LineChart',
    heroLine: 'Finance-function support and management advisory for growing businesses.',
    overview: [
      'For businesses without a full-time finance head, our virtual CFO service provides budgeting, cash-flow planning, MIS and board reporting on a periodic basis.',
      'We prepare financial projections, project reports and CMA data for credit proposals, and advise on business structuring and internal controls.',
    ],
    offerings: [
      'Budgeting and cash-flow forecasting',
      'Monthly MIS and board reporting',
      'Financial projections and project reports',
      'CMA data preparation',
      'Business structuring and restructuring advisory',
      'Internal control design and review',
    ],
    faqs: [
      {
        q: 'What does a virtual CFO engagement include?',
        a: 'Typically budgeting, monthly MIS, cash-flow monitoring, compliance oversight and periodic review meetings with management. The scope is agreed in the engagement letter.',
      },
    ],
  },
  {
    slug: 'due-diligence-valuation',
    title: 'Due Diligence & Valuation',
    shortDesc:
      'Financial and tax due diligence and valuation for transactions, FEMA and income-tax purposes.',
    icon: 'SearchCheck',
    heroLine: 'Financial and tax diligence and valuation support for transactions.',
    overview: [
      'Before an acquisition, investment or restructuring, we review the target’s financial statements, tax positions and statutory compliance to identify risks that may affect value.',
      'We undertake valuations for purposes permitted to chartered accountants under FEMA and the Income-tax law, using accepted valuation methodologies.',
    ],
    offerings: [
      'Financial due diligence',
      'Tax due diligence — direct and indirect taxes',
      'Compliance and secretarial review',
      'Valuation under FEMA and Income-tax rules',
      'Assistance with transaction structuring',
    ],
    faqs: [
      {
        q: 'How long does a due diligence review take?',
        a: 'Depending on the size of the target and readiness of data, a focused review usually takes two to four weeks.',
      },
    ],
  },
  {
    slug: 'nri-services',
    title: 'NRI Taxation Services',
    shortDesc:
      'Return filing, DTAA relief, lower TDS certificates and repatriation compliance for non-residents.',
    icon: 'Plane',
    heroLine: 'Indian tax compliance for non-resident Indians.',
    overview: [
      'Non-residents with income in India — rent, interest, capital gains or business income — have specific compliance obligations. We help NRIs determine residential status and file returns correctly.',
      'We assist with applications for lower or nil TDS certificates on property sales, claims of DTAA relief, and certifications required for repatriation of funds.',
    ],
    offerings: [
      'Residential status determination',
      'Income-tax return filing for NRIs',
      'Lower / nil TDS certificate applications',
      'Capital gains on sale of property in India',
      'Form 15CA/15CB for repatriation',
    ],
    faqs: [
      {
        q: 'Is an NRI required to file a return in India?',
        a: 'An NRI must file a return if total income in India exceeds the basic exemption limit, or to claim a refund of excess TDS. We can assess your situation.',
      },
    ],
  },
]
