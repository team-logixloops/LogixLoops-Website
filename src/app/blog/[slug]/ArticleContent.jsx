"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Badge } from "@/components/ui";
import ReactMarkdown from 'react-markdown';
// react-markdown parses CommonMark only. The posts are written in GitHub
// Flavored Markdown, so without this every pipe table in `post.content`
// rendered as a paragraph of literal `|` characters.
import remarkGfm from 'remark-gfm';
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ArticleContent({ post }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      {/* Sticky Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <article ref={containerRef} className="pt-32 pb-stack-xl">
         {/* Breadcrumbs */}
         <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-4xl mx-auto mb-8">
            <Breadcrumbs />
         </div>

         {/* Article Hero */}
         <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-4xl mx-auto mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge variant="subtle" className="text-primary border-primary/20 bg-primary/10">{post.category}</Badge>
              <span className="font-mono text-xs text-outline-variant uppercase">{post.publishedAt}</span>
              <span className="font-mono text-xs text-outline-variant">&bull;</span>
              <span className="font-mono text-xs text-outline-variant">{post.readTime}</span>
            </div>
            
            <h1 className="font-display text-display-lg text-on-surface mb-8 tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-variant">
                 <div className="w-full h-full bg-gradient-to-tr from-secondary to-primary opacity-80"></div>
              </div>
              <div className="text-left">
                <div className="font-label text-sm text-on-surface">{post.author.name}</div>
                <div className="font-body text-xs text-on-surface-variant">{post.author.role}</div>
              </div>
            </div>
         </div>

         {/* Rich Text Body */}
         <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-3xl mx-auto relative">
           
           {/* Abstract Left Sidebar for Socials (Desktop Only) */}
           {/* The rail is parked out in the left margin for the whole length
               of the article, and its contents stick inside that column, so
               the share controls stay with the reader without the rail itself
               having to leave the flow. */}
           <div className="hidden lg:block absolute -left-32 top-0 bottom-0 sticky-sidebar">
            <div className="sticky top-36 flex flex-col gap-4">
              <span className="font-mono text-[10px] text-outline-variant uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>Share Article</span>
              <div className="w-[1px] h-12 bg-outline-variant/30 mx-auto"></div>
              {/* Both buttons were icon-only with no accessible name and no
                  handler, a screen reader announced two unlabelled buttons,
                  and pressing either did nothing. They are 32px of artwork
                  with a 44px hit area via `tap-target`, which keeps the visual
                  size the design wanted without failing WCAG 2.5.8. */}
              <button
                type="button"
                aria-label="Copy link to this article"
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="tap-target w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">link</span>
              </button>
              <button
                type="button"
                aria-label="Share this article"
                onClick={() => {
                  // `navigator.share` is absent on most desktop browsers, which
                  // is where this sidebar lives; falling back to the clipboard
                  // means the control always does something.
                  if (navigator.share) {
                    navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
                  } else {
                    navigator.clipboard?.writeText(window.location.href);
                  }
                }}
                className="tap-target w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">share</span>
              </button>
            </div>
           </div>

           {/* Markdown Content */}
           {/* Colours come from the `typography` block in tailwind.config.js,
               which maps the plugin's prose variables onto the site tokens.
               Only the typeface and the code-block chrome are set here.

               On the underline, `hover` goes last, after `prose-a`. Leading
               with it compiles to `.class:hover :is(a)`, which puts the hover
               state on the container rather than the link, so pointing at any
               part of the article underlined every link in it at once. */}
           <div className="prose prose-lg max-w-none
                prose-headings:font-display
                prose-p:font-body prose-p:leading-relaxed
                prose-a:no-underline prose-a:hover:underline
                prose-code:font-mono
                prose-pre:border prose-pre:border-outline/20 prose-pre:shadow-glass-elevated">
             {/* `body` is `overflow-x: hidden`, so a table wider than the
                 3xl column would be silently clipped rather than scrolled.
                 Each one gets its own scroll container instead. */}
             <ReactMarkdown
               remarkPlugins={[remarkGfm]}
               components={{
                 table: ({ node, ...props }) => (
                   <div className="overflow-x-auto my-8">
                     <table {...props} className="my-0" />
                   </div>
                 ),
               }}
             >
               {post.content}
             </ReactMarkdown>
           </div>
           
         </div>
      </article>
    </>
  );
}
