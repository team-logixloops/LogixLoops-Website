import { LINES } from "@/data/lines";
import { KITS } from "@/data/kits";
import { getAllPosts } from "@/data/blog";
import { getAllCaseStudies } from "@/data/caseStudies";

export default function sitemap() {
  const baseUrl = "https://logixloops.in";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/kits",
    "/work",
    "/blog",
    "/pricing",
    "/faq",
    "/contact",
    "/process",
    "/technology",
    "/security",
    "/legal/privacy",
    "/legal/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Line pages
  const serviceRoutes = LINES.map((line) => ({
    url: `${baseUrl}/services/${line.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Kit pages
  const kitRoutes = KITS.map((kit) => ({
    url: `${baseUrl}/kits/${kit.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Dynamic Blog routes
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic Work routes
  const caseStudies = getAllCaseStudies();
  const workRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...kitRoutes, ...blogRoutes, ...workRoutes];
}
