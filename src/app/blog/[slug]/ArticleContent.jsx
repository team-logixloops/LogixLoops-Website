"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Badge } from "@/components/ui";
import ReactMarkdown from 'react-markdown';
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
           <div className="hidden lg:flex absolute -left-32 top-0 flex-col gap-4 sticky-sidebar">
              <span className="font-mono text-[10px] text-outline-variant uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>Share Article</span>
              <div className="w-[1px] h-12 bg-outline-variant/30 mx-auto"></div>
              <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[16px]">link</span></button>
              <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[16px]">share</span></button>
           </div>

           {/* Markdown Content */}
           <div className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-display prose-headings:text-on-surface 
                prose-p:font-body prose-p:text-on-surface-variant prose-p:leading-relaxed 
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-code:font-mono prose-code:text-secondary prose-code:bg-surface-container-lowest prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-inverse-surface prose-pre:border prose-pre:border-outline/20 prose-pre:shadow-glass-elevated">
             <ReactMarkdown>{post.content}</ReactMarkdown>
           </div>
           
         </div>
      </article>
    </>
  );
}
