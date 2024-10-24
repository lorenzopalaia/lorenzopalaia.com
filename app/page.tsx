import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="max-w-screen-xl min-h-screen px-6 py-12 mx-auto font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:gap-4 lg:justify-between">
        <Header />
        <main></main>
      </div>
    </div>
  );
}
