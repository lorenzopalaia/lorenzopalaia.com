import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="my-16">
      <div className="min-h-screen">
        <h1 className="title text-2xl sm:text-3xl">Contact Me</h1>
        <ContactForm />
      </div>
    </section>
  );
}
