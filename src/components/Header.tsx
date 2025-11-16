import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Product", to: "/" },
  { label: "1-min Demo", to: "/demo" },
];

const ctaHref = "https://calendar.app.google/Ypk96WxWr9GvoXsM9";

const NavItem = ({ label, to }: { label: string; to: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "text-sm font-medium transition-colors",
        isActive ? "text-ink" : "text-mute hover:text-ink",
      ].join(" ")
    }
  >
    {label}
  </NavLink>
);

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/80 backdrop-blur-lg">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-xl font-semibold tracking-tight text-ink">Ragsites</div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mute">
              Demo Mode
            </p>
            <motion.span
              className="flex items-center gap-1 text-xs font-medium text-mute"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Proof-of-value
              <span className="h-2 w-2 rounded-full bg-brand2 shadow-glow" />
            </motion.span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
        <nav className="flex items-center gap-4 text-xs font-medium text-mute md:hidden">
          {navItems.slice(0, 2).map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand/90 px-5 py-2 text-sm font-semibold text-bg shadow-soft transition hover:-translate-y-0.5 hover:bg-brand2/80"
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
          >
            Book Free Consultation
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
