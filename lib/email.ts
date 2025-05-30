"use server";

import Email from "@/components/contact/Email";

import { Resend } from "resend";

import { z } from "zod";

import { ContactFormSchema } from "@/lib/schemas";

import { email as toEmail } from "@/config";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  try {
    const { name, email, message } = result.data;
    const { data, error } = await resend.emails.send({
      from: "lorenzopalaia.com <contact@lorenzopalaia.com>",
      to: toEmail,
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
      react: await Email({ name, email, message }),
    });

    if (!data || error) {
      console.error(error?.message);
      throw new Error("Failed to send email!");
    }

    return { success: true };
  } catch (error) {
    return { error };
  }
}
