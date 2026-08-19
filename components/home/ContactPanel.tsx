"use client";

import { ArrowUpRight, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { unlockSignal } from "@/components/ExplorationSignals";
import { sendEmail } from "@/lib/email";
import Link from "next/link";

export function ContactPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus(null);
    setIsSubmitting(true);

    try {
      const result = await sendEmail({
        name,
        email,
        message,
      });

      if (result.error) {
        setStatus("Something went wrong. Please try again later.");
        return;
      }

      unlockSignal("contact");

      setStatus("Message sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-panel" onSubmit={send}>
      <div className="contact-panel__heading">
        <span className="scene-eyebrow">Message relay</span>

        <Link href="mailto:info@lorenzopalaia.com" data-cursor="EMAIL">
          Or email directly
          <ArrowUpRight size={13} />
        </Link>
      </div>

      <div className="contact-panel__fields">
        <input
          required
          minLength={2}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          aria-label="Name"
          autoComplete="name"
        />

        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
        />

        <textarea
          required
          minLength={1}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What are you building?"
          aria-label="Message"
        />
      </div>

      <div className="contact-panel__footer">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle size={15} className="spin" />
          ) : (
            <Send size={15} />
          )}

          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        {status && (
          <p role="status" aria-live="polite">
            {status}
          </p>
        )}
      </div>
    </form>
  );
}
