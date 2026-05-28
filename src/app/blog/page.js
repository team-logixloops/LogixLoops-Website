"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader, GlassCard, Badge, Button } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { BLOG_CATEGORIES, getAllPosts } from "@/data/blog";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const posts = getAllPosts();
  
  const filteredPosts = activeCategory === "All Insights" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);
    
  const featuredPost = posts.find(post => post.featured) || posts[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Insights Hero */}
      <section className="pt-40 pb-stack-lg px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center relative overflow-hidden w-full">
        <div className="absolute inset-0 z-[-1] bg-ambient-glow-cyan pointer-events-none opacity-30"></div>
        <FadeInUp>
          <span className="font-label text-label-caps text-secondary tracking-widest uppercase mb-4 block">
            Editorial
          </span>
          <h1 className="font-display text-display-xl text-on-surface mb-stack-sm max-w-4xl mx-auto tracking-tight">
            Engineering <span className="text-primary">Insights</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
            Deep technical dives, architectural patterns, and operational philosophies from the engineers building the future of enterprise software.
          </p>
        </FadeInUp>
      </section>

      {/* 2. Featured Editorial Article */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl w-full">
        <FadeInUp delay={0.2}>
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="relative rounded-2xl overflow-hidden border border-outline-variant/30 shadow-glass-elevated bg-surface-container-lowest/40 backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto relative overflow-hidden bg-surface-variant">
                   {/* Abstract Placeholder for Featured Image */}
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                   <div className="absolute inset-0 opacity-30 group-hover:scale-105 transition-transform duration-700 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center relative">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full"></div>
                   
                   <div className="flex items-center gap-3 mb-6 relative z-10">
                     <Badge variant="subtle" className="bg-primary/10 text-primary border-primary/20">{featuredPost.category}</Badge>
                     <span className="font-mono text-xs text-outline-variant">{featuredPost.readTime}</span>
                   </div>
                   
                   <h2 className="font-display text-headline-lg text-on-surface mb-4 group-hover:text-primary transition-colors relative z-10">
                     {featuredPost.title}
                   </h2>
                   <p className="font-body text-body-lg text-on-surface-variant mb-8 relative z-10">
                     {featuredPost.excerpt}
                   </p>
                   
                   <div className="flex items-center gap-3 mt-auto relative z-10">
                      <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline-variant/50">
                        {/* Avatar placeholder */}
                        <div className="w-full h-full bg-gradient-to-tr from-secondary to-primary opacity-80"></div>
                      </div>
                      <div>
                        <div className="font-label text-sm text-on-surface">{featuredPost.author.name}</div>
                        <div className="font-mono text-[10px] text-outline-variant uppercase tracking-wider">{featuredPost.publishedAt}</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </Link>
        </FadeInUp>
      </section>

      {/* 3. Category Filter & Article Grid */}
      <section className="bg-surface-container-low py-stack-xl border-t border-outline-variant/20 w-full">
        <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-stack-lg">
            {BLOG_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-label text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(0,74,198,0.4)] border border-primary"
                    : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/50 hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <StaggerContainer key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredPosts.map((post, idx) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <GlassCard padding="none" className="h-full border border-outline-variant/30 hover:border-primary/30 transition-all duration-500 group overflow-hidden flex flex-col">
                    <div className="h-48 bg-surface-variant relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-surface-variant to-outline-variant/20"></div>
                       {/* Subtle hover scale on the image container */}
                       <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 bg-ambient-glow-blue opacity-20"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow relative">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="subtle" className="text-xs">{post.category}</Badge>
                        <span className="font-mono text-[10px] text-outline-variant">{post.readTime}</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm text-on-surface-variant mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/20">
                        <div className="font-label text-xs text-on-surface">{post.author.name}</div>
                        <div className="font-mono text-[10px] text-outline-variant">{post.publishedAt}</div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. Newsletter CTA */}
      <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center w-full">
        <div className="py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
          <span className="material-symbols-outlined text-primary text-[40px] mb-4">mark_email_read</span>
          <h2 className="font-display text-headline-lg text-on-surface mb-4 relative z-10">Engineering Excellence, Delivered.</h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto relative z-10">
            Join 15,000+ technical leaders receiving our monthly deep-dives on system architecture and cloud infrastructure.
          </p>
        </div>
      </section>
    </div>
  );
}
