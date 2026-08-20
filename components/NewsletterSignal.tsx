"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { unlockSignal } from "@/components/ExplorationSignals";
import { addLead } from "@/lib/lead";

export function NewsletterSignal() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus(null);
    setIsSubmitting(true);

    try {
      const result = await addLead(email);

      if (result.error) {
        setStatus("Unable to subscribe. Please try again.");
        return;
      }

      unlockSignal("lead");
      setStatus("Subscribed. New notes will reach your inbox.");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("Unable to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="newsletter-signal" onSubmit={submit}>
      <div>
        <span className="scene-eyebrow">Field-notes relay</span>
        <p>Occasional writing on engineering, systems and experiments.</p>
      </div>

      <label>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-label="Email for field notes"
          autoComplete="email"
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle size={15} className="spin" />
          ) : (
            <ArrowRight size={15} />
          )}
        </button>
      </label>

      {status && (
        <small role="status" aria-live="polite">
          {status}
        </small>
      )}
    </form>
  );
}
