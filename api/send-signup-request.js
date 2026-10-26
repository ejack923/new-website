// Visitors type these values, so they must not be able to put links or markup in Emma's email.
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

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
    const email = escapeHtml(String(payload.email || "").trim());
    const firmName = escapeHtml(String(payload.firmName || "").trim());

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
        <p style="font-size: 15px; color: #4a5568; line-height: 1.6;">
          No account has been created. If this person should have access, add them as a user in the
          portal's sign-in system and assign their firm, then let them know how to sign in.
          If not, no action is needed.
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
        subject: `Portal access request - ${String(payload.firmName).trim().replace(/\s+/g, " ").slice(0, 100)}`,
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
