import { Resend } from "resend";

export async function sendEmail({to, subject, react}){
  const resend = new Resend(process.env.RESEND_API_KEY || "")

  try {
    const data = await resend.emails.send({
    from: 'Saveior <onboarding@resend.dev>',
    to,
    subject,
    react,

  });
  
  return { success: true, data}
  } catch (error) {
    console.error("Resend Error:", JSON.stringify(error, null, 2));
    return { success: false, error}
  }
}