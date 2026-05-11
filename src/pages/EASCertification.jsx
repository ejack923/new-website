export default function EASCertification() {
  return (
    <div className="fixed inset-0 flex flex-col">
      <iframe
        src="https://eas-certsheet.vercel.app"
        title="EAS Legal Guideline Certification Form"
        className="flex-1 w-full border-none"
        allow="print"
      />
    </div>
  );
}
