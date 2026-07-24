export default function Spinner({ label = "Chargement..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
      <div className="w-5 h-5 border-2 border-gray-300 border-t-green-700 rounded-full animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
