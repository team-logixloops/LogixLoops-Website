import { LINES } from "@/data/lines";
import { CATALOGUE_UPDATED, KITS } from "@/data/kits";
import { getAllPosts } from "@/data/blog";
import { getAllCaseStudies } from "@/data/caseStudies";

/*
 * `lastModified` is only set where the content carries a real date: the kit
 * catalogue (lines, kits, /kits, /pricing, /services read their prices from
 * it) and each blog post. Everything else omits it. A build-time date on
 * every URL tells Google that every page changed on every deploy, and it
 * learns to ignore the field for the whole site.
 */
const CATALOGUE_ROUTES = new Set(["/services", "/kits", "/pricing"]);

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
    ...(CATALOGUE_ROUTES.has(route) && { lastModified: new Date(CATALOGUE_UPDATED) }),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Line pages
  const serviceRoutes = LINES.map((line) => ({
    url: `${baseUrl}/services/${line.slug}`,
    lastModified: new Date(CATALOGUE_UPDATED),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Kit pages
  const kitRoutes = KITS.map((kit) => ({
    url: `${baseUrl}/kits/${kit.slug}`,
    lastModified: new Date(CATALOGUE_UPDATED),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Dynamic Blog routes
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.isoDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic Work routes
  const caseStudies = getAllCaseStudies();
  const workRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...kitRoutes, ...blogRoutes, ...workRoutes];
}
