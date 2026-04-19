export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-start justify-center leading-none">
              <div className="text-[12px] font-medium tracking-[0.3em] text-neutral-900">CLS</div>
              <div className="mt-1.5 h-[1.5px] w-7 bg-blue-600" />
            </div>
            <div className="h-6 w-px bg-neutral-100" />
            <div className="text-[13px] font-normal tracking-[0.12em] text-neutral-900">Complete Law Support</div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">
            <a href="/services" className="transition hover:text-blue-600">Services</a>
            <a href="/workflow-tools" className="transition hover:text-blue-600">Workflow tools</a>
            <a href="#contact" className="transition hover:text-blue-600">Contact</a>
          </nav>

          <a href="#contact" className="hidden rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 md:inline-flex">Get in touch</a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-500">Operational support for law firms</p>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-6xl">
              Legal administration,
              <br />
              done properly.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
              We support firms with billing, claims, workflow support and matter administration —
              helping your practice run with clarity and consistency.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700">Get in touch</a>
              <a href="/services" className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:border-blue-500 hover:text-blue-600">View services</a>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm leading-7 text-neutral-700">Built for firms managing complex, high-volume matters.</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {["Structured workflows", "Consistent billing processes", "Well-structured file management"].map((item) => (
                <div key={item} className="text-sm text-neutral-600">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">About</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                  Practical, reliable support for firms that need things done properly.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-base leading-8 text-neutral-600">
                  Complete Law Support provides operational support to private law firms across billing,
                  claims, workflow support and matter administration. We work alongside your team to
                  bring consistency to internal processes, reduce administrative pressure and ensure
                  critical workflows are handled with care and precision.
                </p>
                <p className="mt-6 text-base leading-8 text-neutral-600">
                  Our experience spans high-volume, complex matters across criminal, family violence,
                  youth, child protection and select civil work. We support firms at all stages —
                  from newly established practices to long-standing operations — with tailored,
                  dependable assistance.
                </p>
                <p className="mt-6 text-base leading-8 text-neutral-600">
                  Through our client portal and structured workflows, we help your firm maintain
                  well-structured files, capture billable work consistently and manage enquiries efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Services</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Focused support where it matters most.
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                { title: "Matter administration", text: "Support across file handling, workflow coordination and ongoing legal administration." },
                { title: "Billing and claims", text: "Structured assistance with billing processes, claims preparation and workflow consistency." },
                { title: "Workflow support", text: "Practical support that helps firms maintain organised, dependable internal processes." }
              ].map((card) => (
                <div key={card.title} className="group border-b border-neutral-200 pb-6">
                  <h3 className="text-xl font-semibold text-neutral-900">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="addons" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Workflow tools</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Practical tools to support your firm’s workflow.
              </h2>
              <p className="mt-6 text-base leading-8 text-neutral-600">
                Optional tools and resources that integrate with your existing processes and help
                maintain consistency across matters.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  { title: "Client portal access", text: "Centralised upload, tracking and communication to keep matters organised and moving." },
                  { title: "Forms & templates pack", text: "Backsheets, worksheets and standard forms designed for consistent file management." },
                  { title: "Billing calendar", text: "Capture billable appearances and maintain a steady, predictable billing rhythm." },
                  { title: "Extensions assistant", text: "Identify when extensions may be required and support timely, complete submissions." },
                  { title: "Invoices & disbursements", text: "Tools to manage fee slips and third-party payments with clarity and control." }
                ].map((item) => (
                  <div key={item.title} className="group border-b border-neutral-200 pb-6">
                    <h3 className="text-xl font-semibold text-neutral-900">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-neutral-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Testimonials</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                Trusted by firms who rely on consistent, structured support.
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                { quote: "Complete Law Support has significantly reduced our administrative load and brought real consistency to our billing processes.", author: "Private Practice, Melbourne" },
                { quote: "Reliable, responsive and highly organised. They’ve become an essential part of how we manage our matters.", author: "Criminal Law Firm" },
                { quote: "Their systems and support have made a noticeable difference to how efficiently our files are managed day to day.", author: "Family & Youth Practice" }
              ].map((item, i) => (
                <div key={i} className="border border-neutral-200 bg-white p-6">
                  <p className="text-sm leading-7 text-neutral-700">“{item.quote}”</p>
                  <p className="mt-4 text-xs text-neutral-500">{item.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-neutral-200 bg-neutral-900 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <h2 className="max-w-3xl text-3xl font-semibold md:text-4xl">Let’s simplify the operational load on your firm.</h2>
            <div className="mt-10">
              <a href="mailto:hello@completelawsupport.com.au" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-blue-50">hello@completelawsupport.com.au</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
