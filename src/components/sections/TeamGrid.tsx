import { Mail } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/Social'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { team } from '@/data'

const initials = (name: string) =>
  name
    .replace(/^CA\s+/, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

export function TeamGrid({ limit }: { limit?: number }) {
  const list = team.slice(0, limit ?? undefined)

  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="partners"
          title="Our Partners"
          intro="Members of The Institute of Chartered Accountants of India."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 80}>
              <article className="card h-full p-6 text-center">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={`Passport photograph of ${m.name}`}
                    width={112}
                    height={140}
                    loading="lazy"
                    className="mx-auto h-[140px] w-28 rounded-lg object-cover"
                  />
                ) : (
                  <span
                    className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-700 font-heading text-2xl font-bold text-white"
                    aria-hidden="true"
                  >
                    {initials(m.name)}
                  </span>
                )}
                <h3 className="mt-5 font-heading text-lg font-bold text-brand-800">{m.name}</h3>
                <p className="mt-0.5 text-sm font-semibold text-accent-700">{m.role}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {m.qualifications} · M.No. {m.membershipNo}
                </p>
                {m.bio && <p className="mt-3 text-sm text-slate-600">{m.bio}</p>}
                <div className="mt-4 flex items-center justify-center gap-2">
                  {m.social.linkedin && (
                    <a
                      href={m.social.linkedin}
                      aria-label={`${m.name} on LinkedIn`}
                      className="rounded-full bg-brand-50 p-2 text-brand-700 transition hover:bg-brand-700 hover:text-white"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                  )}
                  {m.social.email && (
                    <a
                      href={`mailto:${m.social.email}`}
                      aria-label={`Email ${m.name}`}
                      className="rounded-full bg-brand-50 p-2 text-brand-700 transition hover:bg-brand-700 hover:text-white"
                    >
                      <Mail size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
