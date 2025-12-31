import GraphTaxonomy from '../components/Docs/GraphTaxonomy'
import { useI18n } from '../i18n.jsx'

export default function Docs() {
  const { t } = useI18n()
  return (
    <section className="min-h-screen flex flex-col pt-24 lg:pt-24 pb-12">
      <h1 className="sr-only">{t('pages.docsTitle')}</h1>
      <GraphTaxonomy />
    </section>
  )
}
