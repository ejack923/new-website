export default function WorkflowTools() {
  const sections = [
    { title: "Overview", body: "Complete Law Support is developing a suite of practical workflow tools designed to support day-to-day administrative processes within your firm. These tools are designed to work alongside your existing systems, assisting with consistency, organisation and general workflow support." },
    { title: "Data", body: "All data generated and used within these tools is managed by your firm. Complete Law Support does not retain or store client or matter data." },
    { title: "What the tools assist with", items: ["Tracking key dates and appearances", "Supporting consistent billing processes", "Assisting with file organisation", "Providing structured prompts for day-to-day administration"] },
    { title: "How they work", body: "The tools are designed to run locally within your firm’s systems, allowing you to maintain control over your data and processes while introducing additional structure and support where needed." },
    { title: "Customisation", body: "Workflow tools can be provided with your firm’s name and logo. Relevant staff names can also be included within forms where appropriate." }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-start justify-center leading-none">
              <div className="text-[12px] font-medium tracking-[0.3em] text-neutral-900">CLS</div>
              <div className="mt-1.5 h-[1.5px] w-7 bg-blue-600" />
            </div>
            <div className="h-6 w-px bg-neutral-100" />
            <div className="text-[13px] font-normal tracking-[0.12em] text-neutral-900">Complete Law Support</div>
          </div>
          <a href="mailto:hello@completelawsupport.com.au" className="hidden rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 md:inline-flex">Get in touch</a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">Workflow tools</p>
          <div className="mb-6 h-[1.5px] w-12 bg-blue-600" />
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-5xl">Practical workflow tools for your firm.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">Practical tools designed to support your firm’s internal workflows while keeping data managed by your firm.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="border border-neutral-200 bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Key point</p>
                  <p className="mt-4 text-sm leading-7 text-neutral-700">All data generated and used within these tools is managed by your firm.</p>
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="space-y-6">
                  {sections.map((section) => (
                    <div key={section.title} className="border border-neutral-200 bg-white p-8">
                      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{section.title}</h2>
                      {section.body && <p className="mt-4 text-base leading-8 text-neutral-600">{section.body}</p>}
                      {section.items && (
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          {section.items.map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <div className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                              <p className="text-sm leading-7 text-neutral-700">{item}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-900 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">If you would like more information, please get in touch.</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-300">We can provide further information about our workflow tools and how they may fit within your firm’s existing processes.</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <a href="mailto:hello@completelawsupport.com.au" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-blue-50">hello@completelawsupport.com.au</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
