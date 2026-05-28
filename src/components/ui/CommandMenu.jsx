"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, NAV_LINKS } from "@/lib/constants";
import { getAllPosts } from "@/data/blog";

export default function CommandMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setQuery(""), 200);
  };

  // Global Keyboard Listener (Cmd+K / Ctrl+K) and Custom Event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        handleClose();
      }
    };
    
    const handleCustomEvent = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-menu", handleCustomEvent);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-menu", handleCustomEvent);
    };
  }, []);

  // Derived Search Results
  const posts = getAllPosts();
  
  const searchResults = {
    pages: NAV_LINKS.flatMap(link => 
      link.hasDropdown ? link.children.map(child => ({ ...child, parent: link.label })) : [link]
    ).filter(l => l.label?.toLowerCase().includes(query.toLowerCase())),
    services: SERVICES.filter(s => 
      s.title.toLowerCase().includes(query.toLowerCase()) || 
      s.shortDescription.toLowerCase().includes(query.toLowerCase())
    ),
    insights: posts.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    )
  };

  const hasResults = searchResults.pages.length > 0 || searchResults.services.length > 0 || searchResults.insights.length > 0;

  const handleNavigate = (path) => {
    handleClose();
    router.push(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-on-surface/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden pointer-events-auto flex flex-col max-h-[70vh]"
            >
              {/* Search Header */}
              <div className="flex items-center px-4 py-3 border-b border-outline-variant/20 gap-3">
                <span className="material-symbols-outlined text-outline-variant">search</span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search services, insights, or pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow bg-transparent border-none outline-none font-body text-on-surface placeholder:text-outline-variant text-[15px]"
                />
                <button 
                  onClick={handleClose}
                  className="font-mono text-xs text-outline bg-surface-container px-1.5 py-0.5 rounded border border-outline-variant/30"
                >
                  ESC
                </button>
              </div>

              {/* Results Container */}
              <div className="overflow-y-auto flex-grow p-2 no-scrollbar">
                {!hasResults && query !== "" && (
                  <div className="py-12 text-center text-outline">
                    No results found for &quot;{query}&quot;
                  </div>
                )}

                {query === "" && (
                  <div className="py-6 px-4">
                    <p className="font-label text-xs uppercase tracking-widest text-outline-variant mb-4">Quick Actions</p>
                    <div className="space-y-1">
                      <button onClick={() => handleNavigate('/contact')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container text-left group transition-colors">
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">mail</span>
                        <span className="font-body text-sm text-on-surface">Contact Engineering Team</span>
                      </button>
                      <button onClick={() => handleNavigate('/pricing')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container text-left group transition-colors">
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary">payments</span>
                        <span className="font-body text-sm text-on-surface">View Pricing Tiers</span>
                      </button>
                    </div>
                  </div>
                )}

                {(query !== "" && searchResults.pages.length > 0) && (
                  <div className="mb-6">
                    <p className="font-label text-xs uppercase tracking-widest text-outline-variant px-4 mb-2 mt-4">Pages</p>
                    <div className="space-y-1 px-2">
                      {searchResults.pages.map((page, idx) => (
                        <button key={idx} onClick={() => handleNavigate(page.href)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/5 text-left group transition-colors">
                          <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:text-primary">{page.icon || "article"}</span>
                          <span className="font-body text-sm text-on-surface group-hover:text-primary font-medium">{page.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(query !== "" && searchResults.services.length > 0) && (
                  <div className="mb-6">
                    <p className="font-label text-xs uppercase tracking-widest text-outline-variant px-4 mb-2">Services</p>
                    <div className="space-y-1 px-2">
                      {searchResults.services.map((service, idx) => (
                        <button key={idx} onClick={() => handleNavigate(`/services/${service.slug}`)} className="w-full flex flex-col gap-1 px-3 py-2.5 rounded-lg hover:bg-primary/5 text-left group transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:text-primary">{service.icon}</span>
                            <span className="font-body text-sm text-on-surface group-hover:text-primary font-medium">{service.title}</span>
                          </div>
                          <span className="font-body text-xs text-outline ml-8 line-clamp-1">{service.shortDescription}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(query !== "" && searchResults.insights.length > 0) && (
                  <div className="mb-6">
                    <p className="font-label text-xs uppercase tracking-widest text-outline-variant px-4 mb-2">Insights</p>
                    <div className="space-y-1 px-2">
                      {searchResults.insights.map((post, idx) => (
                        <button key={idx} onClick={() => handleNavigate(`/blog/${post.slug}`)} className="w-full flex flex-col gap-1 px-3 py-2.5 rounded-lg hover:bg-primary/5 text-left group transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:text-primary">newspaper</span>
                            <span className="font-body text-sm text-on-surface group-hover:text-primary font-medium">{post.title}</span>
                          </div>
                          <span className="font-body text-xs text-outline ml-8 line-clamp-1">{post.excerpt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
