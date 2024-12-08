"use client";

import { sendEmail } from "@/lib/email";
import { ContactFormSchema } from "@/lib/schemas";

import { zodResolver } from "@hookform/resolvers/zod";

import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";

import { SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";

import { z } from "zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import Link from "next/link";

import { useAchievementsContext } from "@/contexts/AchievementsContext";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { toast } = useToast();

  const { unlockAchievement } = useAchievementsContext();

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await sendEmail(data);

    if (result.error) {
      toast({
        title: "An error occurred! Please try again later.",
        variant: "destructive",
      });
      return;
    }

    unlockAchievement("contact");

    toast({ title: "Message sent successfully!" });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="h-16">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="given-name"
            {...register("name")}
            className="bg-background"
          />
          {errors.name?.message && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </div>
        <div className="h-16">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
            className="bg-background"
          />
          {errors.email?.message && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>
        <div className="h-32 sm:col-span-2">
          <Textarea
            rows={4}
            placeholder="Leave feedback about the site, career opportunities or just to say hello etc."
            autoComplete="Message"
            className="resize-none bg-background"
            {...register("message")}
          />
          {errors.message?.message && (
            <p className="input-error">{errors.message.message}</p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <span>Sending...</span>
              <ReloadIcon className="ml-2 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Send Message</span>
              <PaperPlaneIcon className="ml-2" />
            </div>
          )}
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          By submitting this form, I agree to the{" "}
          <Link href="/privacy" className="link font-semibold">
            privacy&nbsp;policy.
          </Link>
        </p>
      </div>
    </form>
  );
}
