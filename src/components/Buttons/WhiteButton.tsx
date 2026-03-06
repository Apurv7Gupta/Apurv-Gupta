type ButtonProps = {
  label: string;
};

export default function WhiteButton({ label }: ButtonProps) {
  return (
    <button className="px-10 py-5 border border-white/10 rounded-lg hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-semibold uppercase text-xs tracking-widest">
      {label}
    </button>
  );
}
