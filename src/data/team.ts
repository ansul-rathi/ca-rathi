// EDITABLE: partners. ICAI permits name, qualifications, membership number,
// areas of practice and a passport-style photograph only.
import { SITE } from '@/config/site'

export type TeamMember = {
  name: string
  role: string
  qualifications: string
  membershipNo: string // ICAI membership number (dummy)
  bio?: string
  photo?: string // passport-style photo path, e.g. /team/rakesh.webp
  social: { linkedin?: string; email?: string }
}

export const team: TeamMember[] = [
  {
    name: 'CA Rakesh Rathi',
    role: 'Founder & Managing Partner',
    qualifications: 'FCA, DISA (ICAI)',
    membershipNo: '400001',
    bio: 'Practice areas: statutory audit, direct taxation and representation before appellate authorities.',
    social: { linkedin: '#', email: SITE.email },
  },
  {
    name: 'CA Neha Rathi',
    role: 'Partner — Indirect Taxation',
    qualifications: 'FCA, Certificate Course on GST (ICAI)',
    membershipNo: '400002',
    bio: 'Practice areas: GST compliance, refunds, audits and advisory on rate and classification matters.',
    social: { linkedin: '#', email: SITE.email },
  },
  {
    name: 'CA Arjun Mehta',
    role: 'Partner — Corporate & Advisory',
    qualifications: 'ACA, B.Com (Hons.)',
    membershipNo: '400003',
    bio: 'Practice areas: company law, virtual CFO engagements, due diligence and valuation.',
    social: { linkedin: '#', email: SITE.email },
  },
  {
    name: 'CA Pooja Jain',
    role: 'Partner — International Taxation',
    qualifications: 'ACA, Certificate Course on International Taxation (ICAI)',
    membershipNo: '400004',
    bio: 'Practice areas: DTAA, transfer pricing, FEMA and NRI taxation.',
    social: { linkedin: '#', email: SITE.email },
  },
]
