"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function addLead(email: string) {
  try {
    const { data, error } = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });

    if (!data || error) {
      console.error(error?.message);
      throw new Error("Failed to add lead!");
    }

    return { success: true };
  } catch (error) {
    return { error };
  }
}
