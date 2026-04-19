export default function Pricing() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-start leading-none">
              <div className="text-[12px] font-medium tracking-[0.3em]">CLS</div>
              <div className="mt-1.5 h-[1.5px] w-7 bg-blue-600" />
            </div>
            <div className="h-6 w-px bg-neutral-100" />
            <div className="text-[13px] tracking-[0.12em]">Complete Law Support</div>
          </div>
          <a href="mailto:hello@completelawsupport.com.au" className="rounded-full bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700">Get in touch</a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Workflow tools</p>
          <div className="mt-2 h-[1.5px] w-12 bg-blue-600" />
          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">Workflow tools access</h1>
          <p className="mt-6 max-w-2xl text-lg text-neutral-600">Flexible access to workflow tools designed to support your firm’s day-to-day processes.</p>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-3 lg:px-10">
            <div className="border bg-white p-8">
              <h2 className="text-xl font-semibold">Individual tools</h2>
              <p className="mt-4 text-sm text-neutral-600">Select individual tools to suit your firm’s needs.</p>
              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                <li>Billing tracker</li>
                <li>Extensions helper</li>
                <li>Forms and templates</li>
              </ul>
            </div>
            <div className="border bg-white p-8">
              <h2 className="text-xl font-semibold">Flexible access</h2>
              <p className="mt-4 text-sm text-neutral-600">Combine multiple tools based on your firm’s workflow requirements.</p>
              <p className="mt-6 text-sm text-neutral-500">Bundle access options are available.</p>
            </div>
            <div className="border bg-white p-8">
              <h2 className="text-xl font-semibold">Full workflow tools access</h2>
              <p className="mt-4 text-sm text-neutral-600">Access all available tools and future releases.</p>
              <p className="mt-6 text-sm text-neutral-500">Pricing available upon request.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <h2 className="text-2xl font-semibold">Existing clients</h2>
            <p className="mt-4 max-w-2xl text-base text-neutral-600">Workflow tools are available to firms currently using Complete Law Support support services. Preferential access may apply.</p>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-900 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <h2 className="text-3xl font-semibold">If you would like more information, please get in touch.</h2>
            <div className="mt-6">
              <a href="mailto:hello@completelawsupport.com.au" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm text-neutral-900 hover:bg-blue-50">hello@completelawsupport.com.au</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
