export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference">
      <div className="text-xl font-bold tracking-tighter">
        <a
          href="#home"
          aria-label="Home"
          className="flex items-center gap-1 select-none font-medium"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="fill-current text-white hover:text-[hsl(220,100%,60%)] transition-colors"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3L2 11H5V21H10V15H14V21H19V11H22L12 3Z" />
          </svg>
        </a>
      </div>
      {/* Links */}
      <div className="flex gap-8 text-xs font-medium uppercase tracking-[0.2em]">
        <a
          href="#work"
          className="hover:text-[hsl(220,100%,60%)] transition-colors"
        >
          Projects
        </a>
        <a
          href="#skills"
          className="hover:text-[hsl(220,100%,60%)] transition-colors"
        >
          Tech
        </a>
        <a
          href="#contact"
          className="hover:text-[hsl(220,100%,60%)] transition-colors"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
