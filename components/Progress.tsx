export default function Progress({ value }: { value: number; index: number }) {
  return (
    <div className="w-full h-2 mt-3 mb-0 rounded-full bg-teal-400/10">
      <div
        className="h-2 bg-teal-300 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
