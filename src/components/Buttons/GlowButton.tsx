type GlowButtonProps = { label: string };

export default function GlowButton({ label }: GlowButtonProps) {
  return (
    <button className=" group relative px-10 py-5 bg-[#001a4d] text-white rounded-xl border border-blue-900/50 transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] overflow-visible ">
      <span className="relative z-10 uppercase text-xs">{label}</span>
    </button>
  );
}
