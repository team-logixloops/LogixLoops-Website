import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/data/blog";
import { Button } from "@/components/ui";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import ArticleContent from "./ArticleContent";

// Pre-render all blog posts at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    ...buildMetadata({
      // Headlines run long; the title tag gets the trimmed form while the <h1>
      // keeps the full headline.
      title: post.seoTitle ?? post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      type: "article",
      keywords: post.keywords,
      article: {
        publishedTime: new Date(post.isoDate ?? post.publishedAt).toISOString(),
        modifiedTime: post.updatedAt
          ? new Date(post.updatedAt).toISOString()
          : undefined,
        authors: [post.author.name],
        images: post.featuredImage ? [post.featuredImage] : undefined,
      },
    }),
    authors: [{ name: post.author.name }],
  };
}

// `params` is a Promise in Next 16, reading `params.slug` directly yields
// undefined, which sent every post to notFound() (and a noindex 404).
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <SchemaMarkup schema={generateBlogPostingSchema(post)} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Insights", path: "/blog" },
          { label: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {/* The post's own Q&A pairs, emitted as FAQPage. These are the passages
          an answer engine extracts verbatim, so the markup has to match the
          visible copy at the foot of the article exactly, both are rendered
          from the same `post.faqs` array for that reason, not written twice. */}
      {post.faqs?.length ? (
        <SchemaMarkup schema={generateFaqSchema(post.faqs)} />
      ) : null}

      {/* ArticleContent is a Client Component to handle framer-motion scroll progress */}
      <ArticleContent post={post} />

      {/* Visible counterpart to the FAQPage markup above. Rendered from the
          same array, so the two cannot drift, a mismatch between marked-up
          and visible answers is a structured-data policy violation, and the
          rich result is withdrawn when it is detected.

          Server-rendered rather than folded into `ArticleContent`, which is a
          Client Component: these answers are the passages most likely to be
          quoted, and they should not depend on JavaScript running. */}
      {post.faqs?.length ? (
        <section
          aria-labelledby="post-faq"
          className="px-margin-x-mobile md:px-margin-x-desktop max-w-3xl mx-auto w-full mt-stack-xl"
        >
          <h2
            id="post-faq"
            className="font-display text-headline-lg text-on-surface mb-stack-md"
          >
            Common questions
          </h2>
          <dl className="divide-y divide-outline-variant/30 border-y border-outline-variant/30">
            {post.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="font-display text-headline-md text-on-surface mb-3">
                  {faq.question}
                </dt>
                <dd className="font-body text-body-md text-on-surface-variant">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

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
