import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar glass-card">
      <a href="#hero" className="brand-block interactive">
        <span className="brand-mark">MV</span>
        <div>
          <p className="eyebrow">Digital Identity</p>
          <h1>Mrinal Vyas</h1>
        </div>
      </a>

      <button
        className="nav-toggle interactive"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="interactive"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <Link
          to="/admin/login"
          className="admin-link interactive"
          onClick={() => setOpen(false)}
        >
          <ShieldCheck size={16} />
          Admin
        </Link>
      </nav>
    </header>
  );
}
