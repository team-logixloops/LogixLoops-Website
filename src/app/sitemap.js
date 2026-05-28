import { SERVICES } from "@/lib/constants";
import { getAllPosts } from "@/data/blog";
import { getAllCaseStudies } from "@/data/caseStudies";

export default function sitemap() {
  const baseUrl = "https://logixloops.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/case-studies",
    "/careers",
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

  // Dynamic Service routes
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
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

  // Dynamic Case Study routes
  const caseStudies = getAllCaseStudies();
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...caseStudyRoutes];
}
