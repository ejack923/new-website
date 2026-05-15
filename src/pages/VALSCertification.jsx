export default function VALSCertification() {
  return (
    <div className="fixed inset-0 flex flex-col">
      <iframe
        src="https://vals-certsheet.vercel.app"
        title="Victorian Aboriginal Legal Service Guideline Certification Form"
        className="flex-1 w-full border-none"
        allow="print"
      />
    </div>
  );
}
