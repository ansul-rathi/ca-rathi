import { MapPin, Clock, Briefcase, Mail, Check } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { jobs } from '@/data'
import { SITE } from '@/config/site'
import { firmId } from '@/lib/schema'

const applyHref = (role: string) =>
  `mailto:${SITE.careersEmail}?subject=${encodeURIComponent(`Application: ${role}`)}&body=${encodeURIComponent('Please find my resume attached.\n\nName:\nPhone:\n')}`

export default function Careers() {
  const today = new Date().toISOString().slice(0, 10)
  const jobsLd = jobs.map((j) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: j.title,
    description: `<p>${j.description}</p><ul>${j.responsibilities.map((r) => `<li>${r}</li>`).join('')}</ul>`,
    datePosted: today,
    employmentType: j.type === 'Full-time' ? 'FULL_TIME' : 'OTHER',
    hiringOrganization: { '@id': firmId, '@type': 'Organization', name: SITE.firmName, sameAs: SITE.domain },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.addressStreet,
        addressLocality: SITE.addressLocality,
        addressRegion: SITE.addressRegion,
        postalCode: SITE.postalCode,
        addressCountry: SITE.addressCountry,
      },
    },
    experienceRequirements: j.experience,
  }))

  return (
    <>
      <Seo
        title="Careers"
        description={`Current openings at ${SITE.firmName}, Chartered Accountants, ${SITE.addressLocality} — articleship, audit and GST roles.`}
        path="/careers"
        jsonLd={jobsLd}
      />
      <PageHeader
        eyebrow="careers"
        title="Careers"
        intro="Current openings for article assistants and qualified professionals."
        crumbs={[{ label: 'Careers' }]}
      />
      <section className="py-12 md:py-20">
        <Container className="space-y-6">
          {jobs.map((job, i) => (
            <Reveal key={job.slug} delay={i * 60}>
              <article className="card p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{job.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={15} aria-hidden="true" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} aria-hidden="true" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={15} aria-hidden="true" />
                        {job.experience}
                      </span>
                    </div>
                    <p className="mt-4 text-slate-600">{job.description}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {job.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-brand-700">
                          <Check size={16} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ButtonLink to={applyHref(job.title)} external className="shrink-0 self-start">
                    <Mail size={16} aria-hidden="true" />
                    Apply by email
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
          <p className="text-center text-sm text-slate-600">
            No suitable opening? Send your resume to{' '}
            <a href={`mailto:${SITE.careersEmail}`} className="font-semibold text-accent-700 underline">
              {SITE.careersEmail}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  )
}
