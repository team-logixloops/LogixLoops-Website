import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/data/blog";
import { Badge, Button } from "@/components/ui";
import ArticleContent from "./ArticleContent";

// Pre-render all blog posts at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* ArticleContent is a Client Component to handle framer-motion scroll progress */}
      <ArticleContent post={post} />
      
      {/* Newsletter / Final CTA Footer */}
      <section className="bg-surface-container-low py-stack-xl border-t border-outline-variant/20 mt-24 w-full">
         <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto text-center">
            <h3 className="font-display text-headline-md text-on-surface mb-4">Did you find this insightful?</h3>
            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8">
              Join our engineering newsletter to get deep-dives like this delivered straight to your inbox every month.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 justify-center">
              <input 
                type="email" 
                placeholder="Enter your work email" 
                className="flex-grow max-w-[280px] bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary transition-colors"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
         </div>
      </section>
    </div>
  );
}
