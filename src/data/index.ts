// Single import surface for site content. Data is local and synchronous so
// every page can be prerendered to static HTML. To move to a CMS later, fetch
// at build time (in scripts/prerender.mjs) and write these arrays out.
export { services, type Service, type ServiceFaq } from './services'
export { team, type TeamMember } from './team'
export { stats, type Stat } from './stats'
export { posts, type BlogPost } from './posts'
export { jobs, type JobOpening } from './jobs'
export { faqs, type Faq } from './faqs'
export { usefulLinks, checklists } from './resources'
export { getDueDates, DUE_CATEGORIES, type DueDate, type DueCategory } from './compliance'

import { services } from './services'
import { posts } from './posts'

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug)
export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug)
export const sortedPosts = () => [...posts].sort((a, b) => b.date.localeCompare(a.date))
