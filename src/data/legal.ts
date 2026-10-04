// EDITABLE: legal page content (markdown). Review with the firm before go-live.
import { SITE } from '@/config/site'

export type LegalPage = { slug: string; title: string; description: string; updated: string; body: string }

const firm = SITE.firmName

export const legalPages: LegalPage[] = [
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    description: `Disclaimer for the website of ${firm}, Chartered Accountants, as per ICAI guidelines.`,
    updated: '2026-10-01',
    body: `As per the guidelines of The Institute of Chartered Accountants of India (ICAI), Chartered Accountants are not permitted to solicit work or advertise in any manner. By accessing this website, you acknowledge and confirm that:

- you are seeking information relating to ${firm} of your own accord, and there has been no form of solicitation, advertisement or inducement by ${firm} or any of its members;
- the information on this website is provided only on your request, for informational purposes, and should not be interpreted as soliciting or advertisement;
- no material or information on this website should be construed as professional advice; and
- ${firm} shall not be liable for any consequence of any action taken by relying on the material or information on this website.

## No professional relationship

Use of this website, including sending an enquiry, does not create a client relationship. A professional relationship is established only through a written engagement letter.

## Accuracy of information

While reasonable care is taken, laws, rules and due dates change frequently. Calculators and articles are for general guidance and may not reflect the latest amendments. Please consult a Chartered Accountant before acting on any information.

## External links

Links to government and regulatory websites are provided for convenience. ${firm} is not responsible for the content of external websites.`,
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description: `How ${firm} collects, uses and protects personal data submitted through this website, in line with the Digital Personal Data Protection Act, 2023.`,
    updated: '2026-10-01',
    body: `This policy explains how ${firm} ("we") processes personal data collected through this website, in accordance with the Digital Personal Data Protection Act, 2023 and applicable rules.

## Data we collect

- **Enquiry form:** name, email address, phone number, service of interest and the content of your query.
- **Technical data:** basic server logs (IP address, browser type, pages visited) maintained by our hosting provider for security.
- **Browser storage:** your acceptance of the website disclaimer and display preferences, stored only on your device. We do not use advertising or tracking cookies.

## Purpose and legal basis

We use your data only to respond to your query and, if you engage us, to provide professional services. Processing is based on the consent you give when submitting the form.

## Sharing

We do not sell or rent personal data. Data may be processed by our website hosting and email service providers solely to operate this website, under appropriate confidentiality obligations, or disclosed where required by law.

## Retention

Enquiry data is retained for up to 12 months unless an engagement follows, after which records are retained as required under professional and statutory obligations.

## Your rights

You may request access to, correction of, or erasure of your personal data, or withdraw consent, by writing to ${SITE.email}. You may also raise a grievance with our Grievance Officer at the same address. We will respond within the time prescribed by law.

## Security

We take reasonable technical and organisational measures to protect personal data, including encrypted (HTTPS) transmission.

## Contact

${SITE.firmLegalName}, ${SITE.address}. Email: ${SITE.email}.`,
  },
  {
    slug: 'terms-of-use',
    title: 'Terms of Use',
    description: `Terms governing the use of the website of ${firm}.`,
    updated: '2026-10-01',
    body: `By using this website you agree to these terms.

## Use of content

Content on this website is the property of ${firm} and is provided for general information. You may view and print pages for personal, non-commercial use. Reproduction for any other purpose requires prior written permission.

## Calculators and tools

Calculators provide indicative estimates based on simplified assumptions. They are not a substitute for professional advice, and ${firm} accepts no liability for decisions taken on their basis.

## Acceptable use

You must not misuse the website, attempt unauthorised access, or submit unlawful, false or harmful content through any form.

## Limitation of liability

To the extent permitted by law, ${firm} is not liable for any loss arising from the use of, or inability to use, this website or its content.

## Governing law

These terms are governed by the laws of India, and courts at ${SITE.addressLocality} shall have exclusive jurisdiction.`,
  },
]
