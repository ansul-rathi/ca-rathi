// EDITABLE: factual firm information only. ICAI does not permit client counts,
// "countries served" or other subjective claims, so keep these objective.
import { SITE } from '@/config/site'

export type Stat = {
  label: string
  value: number
  suffix: string
}

export const stats: Stat[] = [
  { label: 'Year Established', value: SITE.foundedYear, suffix: '' },
  { label: 'Partners', value: SITE.partnersCount, suffix: '' },
  { label: 'Professional Staff', value: SITE.professionalsCount, suffix: '+' },
  { label: 'Service Areas', value: 10, suffix: '' },
]
