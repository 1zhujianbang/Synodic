import GraphTaxonomy from '../components/Docs/GraphTaxonomy'

export default function Docs() {
  return (
    <section className="min-h-screen flex flex-col pt-10 lg:pt-12 pb-12">
      <div className="w-full px-[1px] sm:px-[1px] lg:px-[18px] xl:px-[24px]">
        <GraphTaxonomy />
      </div>
    </section>
  )
}