import { ogCard, clampSubtitle, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getAllPosts, getPostBySlug } from "@/data/blog";

// `alt` is a static export, so it cannot carry the post title. It stays
// generic; the card itself carries the specifics.
export const alt = "A LogixLoops engineering insight.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return ogCard({
      eyebrow: "Insights",
      title: "Engineering insights.",
      subtitle: "Deep technical dives from the LogixLoops engineering team.",
    });
  }

  // Byline rather than the excerpt: a post card is shared to say who wrote
  // this and how long it takes, and the headline above already carries the
  // subject.
  return ogCard({
    eyebrow: post.category,
    title: post.title,
    subtitle: clampSubtitle(
      [post.author?.name, post.readTime].filter(Boolean).join(" · ")
    ),
  });
}
