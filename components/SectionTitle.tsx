export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-20 w-screen px-6 py-5 mb-4 -mx-6 bg-slate-900/75 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
      <h2 className="text-sm font-bold tracking-widest uppercase text-slate-200 lg:sr-only">
        {children}
      </h2>
    </div>
  );
}
