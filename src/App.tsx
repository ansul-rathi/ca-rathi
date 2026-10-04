import { Layout } from '@/components/layout/Layout'
import { ScrollToTop } from '@/components/ScrollToTop'
import { AppRoutes } from '@/routes'

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <AppRoutes />
    </Layout>
  )
}

export default App
