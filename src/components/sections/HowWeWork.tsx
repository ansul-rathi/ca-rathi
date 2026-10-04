import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

// Describes the engagement process factually (ICAI bars "why choose us" style content).
const steps = [
  {
    no: '01',
    title: 'Understanding the requirement',
    desc: 'An initial discussion to understand the facts, applicable law and timelines.',
  },
  {
    no: '02',
    title: 'Engagement letter',
    desc: 'Scope, responsibilities and deliverables are documented in a written engagement letter.',
  },
  {
    no: '03',
    title: 'Execution',
    desc: 'Work is carried out by the assigned team under partner supervision, with documents exchanged securely.',
  },
  {
    no: '04',
    title: 'Review & reporting',
    desc: 'Partner review before reports, returns or opinions are issued, followed by statutory filing where applicable.',
  },
]

export function HowWeWork() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="engagement process"
          title="How We Work"
          intro="Every engagement follows a documented process from the first discussion to final reporting."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 80}>
              <div className="card h-full p-6 sm:p-7">
                <span className="font-heading text-4xl font-extrabold text-accent-500" aria-hidden="true">
                  {s.no}
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-brand-800">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
