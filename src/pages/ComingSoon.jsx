import { useState } from "react";

export default function ComingSoon() {
  const [open, setOpen] = useState(false);
  const [inquiry, setInquiry] = useState("");

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-start justify-center leading-none">
              <div className="text-[12px] font-medium tracking-[0.3em] text-neutral-900">CLS</div>
              <div className="mt-1.5 h-[1.5px] w-7 bg-blue-600" />
            </div>
            <div className="h-6 w-px bg-neutral-100" />
            <div>
              <div className="text-[13px] font-normal tracking-[0.12em] text-neutral-900">
                Complete Law Support
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="hidden rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 md:inline-flex"
          >
            Get in touch
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl items-center px-6 py-24 lg:min-h-[calc(100vh-81px)] lg:px-10 lg:py-32">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">New website coming soon</p>
          <div className="mb-6 h-[1.5px] w-12 bg-blue-600" />

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-5xl">
            Continuing to support your firm,
            <br />
            with a refreshed approach.
          </h1>

          <p className="mt-8 text-lg leading-8 text-neutral-600">
            Complete Law Support continues to support firms with applications and payment processing,
            while introducing downloadable workflow tools for your firm. Our full website is coming soon.
          </p>

          <p className="mt-6 text-base leading-8 text-neutral-600">
            Complete Law Support has been supporting private law firms across day-to-day administration
            for several years. This page reflects a brand refresh, bringing together our ongoing support
            services with a new focus on practical, downloadable tools that fit within your firm’s existing processes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Get in touch
            </button>
          </div>
        </div>
      </main>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6">
          <div className="w-full max-w-md bg-white p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-neutral-900">Get in touch</h2>
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              If you would like more information about our workflow tools or about the business,
              please send us an email and we will get back to you shortly.
            </p>

            <form
              action="mailto:hello@completelawsupport.com.au"
              method="POST"
              encType="text/plain"
              className="mt-6 space-y-4"
            >
              <input type="text" name="name" placeholder="Your name" className="w-full border border-neutral-200 px-4 py-2 text-sm" required />
              <input type="text" name="business" placeholder="Business name" className="w-full border border-neutral-200 px-4 py-2 text-sm" />
              <input type="email" name="email" placeholder="Email address" className="w-full border border-neutral-200 px-4 py-2 text-sm" required />

              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Please send me information about</p>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-neutral-700">
                  <input type="radio" name="inquiry" value="tools" onChange={(e) => setInquiry(e.target.value)} />
                  New workflow tools
                </label>
                <label className="flex items-center gap-2 text-sm text-neutral-700">
                  <input type="radio" name="inquiry" value="services" onChange={(e) => setInquiry(e.target.value)} />
                  How CLS can help your firm
                </label>
                <label className="flex items-center gap-2 text-sm text-neutral-700">
                  <input type="radio" name="inquiry" value="other" onChange={(e) => setInquiry(e.target.value)} />
                  Anything else
                </label>
              </div>

              {inquiry === "other" && (
                <textarea name="message" placeholder="Your message" rows={4} className="w-full border border-neutral-200 px-4 py-2 text-sm" required />
              )}

              <div className="flex items-center justify-between pt-4">
                <button type="button" onClick={() => setOpen(false)} className="text-sm text-neutral-500">Cancel</button>
                <button type="submit" className="rounded-full bg-blue-600 px-5 py-2 text-sm text-white">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
