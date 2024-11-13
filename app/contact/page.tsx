import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="my-16">
      <div className="min-h-screen">
        <h1 className="text-2xl sm:text-3xl title">Contact Me</h1>
        <ContactForm />
      </div>
    </section>
  );
}
