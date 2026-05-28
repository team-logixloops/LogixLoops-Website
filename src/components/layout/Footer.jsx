import Link from "next/link";
import Image from "next/image";
import { BRAND, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 relative z-10 mt-auto">
      <div className="container-site py-stack-xl">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-gutter">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image 
                src="/logixloops_logo.png" 
                alt={`${BRAND.name} Logo`} 
                width={160} 
                height={32} 
                className="h-6 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-display font-semibold text-xl text-on-surface">
                {BRAND.name}
              </span>
            </Link>
            <p className="font-body text-body-md text-on-surface-variant mb-6 max-w-xs">
              {BRAND.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-5">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-label text-label-caps text-on-surface uppercase tracking-widest mb-5">
              Legal
            </h4>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-body-sm text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-body-sm text-on-surface-variant">
            {BRAND.copyright}
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            Engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
