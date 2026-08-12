import { SITE_URL } from "@/lib/seo";

/**
 * A bare `User-agent: *` already permits AI crawlers, but several of them are
 * checked for by name, and Google-Extended is a separate opt-in signal that
 * governs Gemini and AI Overviews grounding. Listing them explicitly makes the
 * permission unambiguous rather than implied.
 *
 * Two things this list is not. It is not a filter, every entry is an allow,
 * and the wildcard above it already allows; the value is that a crawler
 * looking for its own token finds one instead of falling through to a rule
 * written for everybody. And it is not permanent: these tokens split and
 * rename constantly, Claude-SearchBot, DuckAssistBot and MistralAI-User all
 * appeared inside about a year, so this wants re-checking against
 * github.com/ai-robots-txt/ai.robots.txt every few months rather than being
 * treated as settled.
 *
 * Grouped by operator, because that is how they change.
 */
const AI_CRAWLERS = [
  // OpenAI: training, search index, and the fetch a user's own prompt triggers.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ChatGPT Agent",

  // Anthropic.
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Claude-Web",
  "anthropic-ai",

  // Google. `Google-Extended` is the Gemini and AI Overviews grounding
  // signal and is separate from Googlebot; the rest are the assistant
  // surfaces that fetch under their own token.
  "Google-Extended",
  "GoogleOther",
  "Google-NotebookLM",
  "Gemini-Deep-Research",
  "Google-CloudVertexBot",

  // xAI. Three tokens because Grok splits training, search and deep
  // research, and xAI publishes no crawler documentation page, so these
  // come from observed traffic rather than a vendor spec. Worth listing
  // anyway: the cost of a token that never shows up is one line.
  "GrokBot",
  "xAI-Grok",
  "Grok-DeepSearch",

  "PerplexityBot",
  "Perplexity-User",
  "Bravebot",
  "DuckAssistBot",
  "MistralAI-User",
  "DeepSeekBot",
  "Kimi-User",
  "YouBot",
  "PhindBot",
  "ExaBot",
  "TavilyBot",
  "LinerBot",
  "iAskBot",
  "kagi-fetcher",
  "Andibot",

  // Chinese and other non-Western assistants. Qwen crawls as TongyiBot,
  // Ernie as YiyanBot, Zhipu as ChatGLM-Spider.
  "TongyiBot",
  "YiyanBot",
  "ChatGLM-Spider",
  "PanguBot",
  "PetalBot",
  "Bytespider",
  "TikTokSpider",

  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "bedrockbot",
  "meta-externalagent",
  "meta-externalfetcher",
  "cohere-ai",
  "CCBot",
  "AI2Bot",
  "Diffbot",
  "Timpibot",
  "Webzio-Extended",
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
