// EDITABLE: general FAQs (Home + /faqs). Rendered with FAQPage schema, which
// also helps answer engines (Google AI Overviews, ChatGPT, Perplexity) cite the site.
export type Faq = { q: string; a: string; category: string }

export const faqs: Faq[] = [
  {
    category: 'Income Tax',
    q: 'What is the due date for filing income-tax returns?',
    a: 'For individuals and entities not requiring audit, the due date is generally 31 July following the end of the financial (tax) year. For taxpayers requiring a tax audit, it is generally 31 October, and 30 November for those with transfer pricing reports. The government may extend these dates by notification.',
  },
  {
    category: 'Income Tax',
    q: 'Is income up to ₹12 lakh tax-free under the new tax regime?',
    a: 'Yes, for resident individuals under the new regime, the rebate makes total income up to ₹12 lakh effectively tax-free (₹12.75 lakh for salaried individuals after the ₹75,000 standard deduction). Income taxed at special rates, such as certain capital gains, is not covered by the rebate.',
  },
  {
    category: 'Income Tax',
    q: 'Which documents are needed to file an income-tax return?',
    a: 'Typically PAN, Aadhaar, Form 16 (for salaried persons), Form 26AS/AIS, bank interest certificates, capital gain statements and proofs of deductions if you opt for the old regime.',
  },
  {
    category: 'GST',
    q: 'What is the GST registration threshold?',
    a: 'For most states the threshold is ₹40 lakh aggregate turnover for suppliers of goods and ₹20 lakh for suppliers of services. Lower limits apply in special category states, and some businesses must register irrespective of turnover.',
  },
  {
    category: 'GST',
    q: 'What are the due dates for GSTR-1 and GSTR-3B?',
    a: 'For monthly filers, GSTR-1 is due on the 11th and GSTR-3B on the 20th of the following month. Taxpayers under the QRMP scheme file quarterly returns with monthly tax payment.',
  },
  {
    category: 'Company Law',
    q: 'What are the annual compliances for a private limited company?',
    a: 'Key compliances include holding board meetings and the annual general meeting, statutory audit, filing financial statements in Form AOC-4 and the annual return in Form MGT-7/7A with the ROC, director KYC, and income-tax and GST compliance.',
  },
  {
    category: 'General',
    q: 'How can I engage your firm?',
    a: 'You can call or email us, or use the enquiry form on the Contact page. After understanding your requirement, we issue an engagement letter setting out the scope of work.',
  },
  {
    category: 'General',
    q: 'Do you provide services outside Jaipur?',
    a: 'Yes. Most compliance work can be carried out digitally, and documents can be shared securely by email or a client portal.',
  },
]
