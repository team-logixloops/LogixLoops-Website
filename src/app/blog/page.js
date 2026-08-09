import Link from "next/link";
import { getAllPosts } from "@/data/blog";
import { Badge, SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem, MaskReveal } from "@/components/motion";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const BLOG_DESCRIPTION =
  "Deep technical writing on monolith migration, LLM orchestration in production, and zero-trust Kubernetes, from the engineers who build these systems.";

export const metadata = buildMetadata({
  title: "Engineering Insights",
  description: BLOG_DESCRIPTION,
  path: "/blog",
  keywords: [
    "software engineering blog",
    "monolith to microservices migration",
    "strangler fig pattern",
    "LLM orchestration production",
    "zero-trust Kubernetes",
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Insights", path: "/blog" },
        ])}
      />
      <SchemaMarkup
        schema={generateCollectionPageSchema({
          name: "Engineering Insights",
          description: BLOG_DESCRIPTION,
          path: "/blog",
          items: posts.map((post) => ({
            name: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
          })),
        })}
      />
      {/* Background Ambience */}
      {/* `ambient-glow-cyan`, not `bg-ambient-glow-cyan`. It is a hand-written
          utility in globals.css that sets its own gradient, not a colour in
          the palette, prefixed with `bg-` Tailwind looked for a colour named
          `ambient-glow-cyan`, found none, and emitted nothing. */}
      <div className="absolute inset-0 z-[-1] ambient-glow-cyan pointer-events-none opacity-20"></div>
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 1. Hero */}
      <PageHero
        preset="blog"
        eyebrow="Writing"
        title="Long-form,"
        accent="by the people building."
        lead="Migration patterns, production LLM behaviour, zero-trust inside a cluster. Written by engineers, at the length the subject actually needs, with the parts that went wrong left in."
        cue="Latest"
      />

      <PageSurface>
        {/* 2. Featured Post */}
        {featured && (
          <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto w-full pb-stack-lg">
            <FadeInUp>
              <Link
                href={`/blog/${featured.slug}`}
                className="rule-draw group grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface-container-lowest/60 backdrop-blur-xl shadow-glass-elevated hover:border-primary/30 transition-colors"
              >
                {/* The wipe is `clip-path`, so the image occupies its final box
                    from the first frame and the card never shifts under it.
                    Reserved for this one image: it is the only editorial
                    photograph above the fold on the route, and a wipe on every
                    card below would turn a moment into wallpaper. */}
                <MaskReveal
                  direction="left"
                  className="relative h-64 lg:h-full min-h-[280px] overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    width={1200}
                    height={675}
                    src={featured.featuredImage}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </MaskReveal>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge variant="accent">{featured.category}</Badge>
                    <span className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest">
                      Featured
                    </span>
                  </div>
                  <h2 className="font-display text-headline-lg text-on-surface mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="font-body text-body-md text-on-surface-variant mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-4 font-body text-body-sm text-on-surface-variant">
                    <span>{featured.author.name}</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant" />
                    {/* `isoDate` in the attribute, the human string in the
                        text. `dateTime="Aug 05, 2026"` is not a parseable
                        datetime, so the markup carried no machine-readable
                        date at all. */}
                    <time dateTime={featured.isoDate}>{featured.publishedAt}</time>
                    <span className="w-1 h-1 rounded-full bg-outline-variant" />
                    <span>{featured.readTime}</span>
                    <span
                      aria-hidden="true"
                      className="ml-auto flex items-center gap-1 font-label text-label-caps uppercase tracking-widest text-primary"
                    >
                      Read more
                      <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInUp>
          </section>
        )}

        {/* 3. All Posts */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto w-full py-stack-xl border-t border-outline-variant/20">
          <SectionHeader
            overline="Archive"
            title="Everything we have published"
            description="Newest first. No listicles."
          />

          {/* `focus-blur-cards`, the variant that dims through `filter` rather
              than the `opacity` property, these cards are also being revealed
              by `StaggerContainer`, which writes `opacity` on every scroll
              frame, and the two cannot share it. Same effect as the work grid
              on /case-studies: point at one card and its siblings recede. */}
          <StaggerContainer className="focus-blur-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-stack-lg">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full border border-outline-variant/30 rounded-xl overflow-hidden bg-surface-container-lowest hover:border-primary/30 hover:shadow-glass-elevated transition-colors"
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      width={800}
                      height={450}
                      src={post.featuredImage}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <Badge variant="accent" className="self-start mb-4">
                      {post.category}
                    </Badge>
                    <h3 className="font-display text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-body-sm text-on-surface-variant mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    {/* The whole card is the link, so this is an affordance
                        rather than a second target, it tells you the card is
                        clickable and where it goes. `aria-hidden` for exactly
                        that reason: a screen reader already has the link, and
                        announcing "Read more" after the headline only adds a
                        second, vaguer name for the same destination. */}
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-outline-variant/30">
                      <div className="flex items-center gap-3 font-body text-body-sm text-on-surface-variant">
                        <time dateTime={post.isoDate}>{post.publishedAt}</time>
                        <span className="w-1 h-1 rounded-full bg-outline-variant" />
                        <span>{post.readTime}</span>
                      </div>
                      <span
                        aria-hidden="true"
                        className="flex items-center gap-1 font-label text-label-caps uppercase tracking-widest text-primary"
                      >
                        Read more
                        <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </PageSurface>
    </div>
  );
}
