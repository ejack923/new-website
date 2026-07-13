export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "RESEND_API_KEY is not configured on Vercel environment variables." });
    return;
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { email, firmName } = payload;

    if (!email || !firmName) {
      res.status(400).json({ error: "Missing required fields (email, firmName)" });
      return;
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@completelawsupport.com";
    const fromAddress = fromEmail === "onboarding@resend.dev"
      ? "onboarding@resend.dev"
      : `Complete Law Support <${fromEmail}>`;

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #1a202c; margin-top: 0;">New Signup Request</h2>
        <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
          A new user has requested access to the Complete Law Support client portal.
        </p>
        <div style="background-color: #f7fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #718096; width: 120px;">Email:</td>
              <td style="padding: 6px 0; color: #2d3748;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #718096;">Firm Name:</td>
              <td style="padding: 6px 0; color: #2d3748;">${firmName}</td>
            </tr>
          </table>
        </div>
        <p style="font-size: 15px; color: #4a5568; font-weight: bold; margin-bottom: 12px;">
          Approve this user and assign them to a firm portal by clicking a link below:
        </p>
        <ul style="padding-left: 20px; margin-top: 0; line-height: 2;">
          <li><a href="https://completelawsupport.com/client-login?action=approve&email=${encodeURIComponent(email)}&portal=rga" style="color: #3182ce; text-decoration: none; font-weight: bold;">Approve for RGA (Robyn Greensill & Associates)</a></li>
          <li><a href="https://completelawsupport.com/client-login?action=approve&email=${encodeURIComponent(email)}&portal=lacw" style="color: #3182ce; text-decoration: none; font-weight: bold;">Approve for LACW (Law and Advocacy Centre for Women)</a></li>
          <li><a href="https://completelawsupport.com/client-login?action=approve&email=${encodeURIComponent(email)}&portal=vals" style="color: #3182ce; text-decoration: none; font-weight: bold;">Approve for VALS (Victorian Aboriginal Legal Service)</a></li>
          <li><a href="https://completelawsupport.com/client-login?action=approve&email=${encodeURIComponent(email)}&portal=jbl" style="color: #3182ce; text-decoration: none; font-weight: bold;">Approve for JBL (Jarrod Baxter Law)</a></li>
          <li><a href="https://completelawsupport.com/client-login?action=approve&email=${encodeURIComponent(email)}&portal=eas" style="color: #3182ce; text-decoration: none; font-weight: bold;">Approve for EAS Legal</a></li>
          <li><a href="https://completelawsupport.com/client-login?action=approve&email=${encodeURIComponent(email)}&portal=counsel" style="color: #3182ce; text-decoration: none; font-weight: bold;">Approve for Counsel / Barrister</a></li>
          <li><a href="https://completelawsupport.com/client-login?action=approve&email=${encodeURIComponent(email)}&portal=admin" style="color: #3182ce; text-decoration: none; font-weight: bold;">Approve for Admin Portal</a></li>
        </ul>
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 24px 0;" />
        <p style="font-size: 15px; color: #4a5568;">
          To decline this request:
        </p>
        <p>
          <a href="https://completelawsupport.com/client-login?action=reject&email=${encodeURIComponent(email)}" style="color: #e53e3e; text-decoration: none; font-weight: bold;">Reject Signup Request</a>
        </p>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: ["ejackson@completelawsupport.com"],
        subject: `Pending Signup Approval - ${firmName}`,
        html: htmlContent,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to send email via Resend");
    }

    res.status(200).json({ ok: true, id: result.id });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: error?.message || "Failed to process email" });
  }
}
