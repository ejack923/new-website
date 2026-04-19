export default function Services() {
  const sections = [
    { title: "Overview", body: "Complete Law Support works alongside private law firms to assist with day-to-day administrative processes, helping reduce internal workload and improve consistency across matters." },
    { title: "What we assist with", items: ["Lodging completed applications", "Assisting with extensions", "Billing and claims support", "Invoice and disbursement processing", "General enquiries and administrative follow-up"] },
    { title: "Approach", body: "We work alongside your firm to assist with internal processes, ensuring work is handled consistently and efficiently, without disrupting your existing systems." },
    { title: "Outcomes", items: ["Reduced administrative burden", "More consistent billing processes", "Improved file organisation", "Greater day-to-day workflow clarity"] }
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
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">Services</p>
          <div className="mb-6 h-[1.5px] w-12 bg-blue-600" />
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-5xl">Practical support for your firm.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">Practical, reliable support to assist with your firm’s day-to-day administration and internal processes.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="border border-neutral-200 bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Key point</p>
                  <p className="mt-4 text-sm leading-7 text-neutral-700">Complete Law Support works alongside your firm to assist with internal processes.</p>
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
                <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-300">We can provide further information about how Complete Law Support may assist your firm.</p>
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
