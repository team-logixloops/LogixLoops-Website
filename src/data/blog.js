/**
 * LOGIXLOOPS — Insights & Editorial Data Layer
 */

export const BLOG_CATEGORIES = [
  "All Insights",
  "AI Engineering",
  "Cloud Infrastructure",
  "DevOps",
  "Architecture",
  "Engineering Culture"
];

export const BLOG_POSTS = {
  "strangling-the-monolith": {
    slug: "strangling-the-monolith",
    title: "Strangling the Monolith: Zero-Downtime Migration Patterns",
    excerpt: "How to decouple a monolithic legacy system into event-driven microservices without dropping a single production transaction.",
    category: "Architecture",
    author: {
      name: "Elena Rostova",
      role: "VP of Cloud Architecture",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ3Qc6aH_O_88TqYpL45p6eLpL8KzW_k_dGqX1tM2J-wN_T3J1O_X4fK1Tz2M5vH_cR-Y_WfJ4c5sO-l6rQ5nL9aO_U6X-sP_A" // abstract avatar placeholder
    },
    publishedAt: "Oct 12, 2026",
    readTime: "8 min read",
    featuredImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQHoCZ_5_lPRuG5JxozpWfBLrawGk-XQtTX9e9SSqz4CfMl5csBptT7QI1rvgGWOz61M1QyCSbXycnr2NifglQXfHNtxUnDBx8YBDP8tqisZ7BMmSRkbkSuQa50KTio_38Ld5woGsyZ5bz3K_AKafh5u3xRxbYTeFGMTqYyxGUTvY59NdaqEzafbRjbi0HBVVIY2jBbM1A0OTweLaQEY1qlWsisVahJLVRRl0U3alj9PWrZy6cyxtgh6hymcATP9JnneJoAoCDjtQX",
    featured: true,
    content: `
## The Legacy Trap
Most enterprise architectures inevitably calcify. What begins as a neatly organized MVC application slowly degrades into a monolithic dependency web. Teams stop shipping. Builds take hours. Deployment requires weekend war rooms.

The solution is the **Strangler Fig Pattern**.

## Defining the Strangler Fig
Instead of attempting a "Big Bang" rewrite—which fails in 70% of enterprise scenarios—we incrementally replace legacy functionality with new microservices. We deploy an API Gateway to intercept traffic, routing it to either the legacy monolith or the new microservice based on the URL path or feature flag.

### Step 1: The Edge Proxy
Before writing a single line of microservice code, deploy a strict reverse proxy (like NGINX or Envoy) at the edge. 

\`\`\`yaml
# envoy.yaml proxy configuration
routes:
  - match: { prefix: "/api/v2/checkout" }
    route: { cluster: "new_checkout_service" }
  - match: { prefix: "/" }
    route: { cluster: "legacy_monolith" }
\`\`\`

### Step 2: Event Interception
Legacy systems often rely on shared database state. To decouple the new microservice, we implement **Change Data Capture (CDC)** (often using Debezium and Kafka) to stream database row changes from the legacy database into the new service's isolated datastore.

## Conclusion
Migrating a monolith is a marathon of discipline. By prioritizing edge-routing and asynchronous data replication, engineering teams can modernize their stack while keeping the business running at full velocity.
    `
  },
  "llm-orchestration-in-production": {
    slug: "llm-orchestration-in-production",
    title: "LLM Orchestration: Managing Latency in Production",
    excerpt: "Strategies for managing rate limits, semantic caching, and token streaming when deploying Large Language Models at scale.",
    category: "AI Engineering",
    author: {
      name: "Marcus Chen",
      role: "Lead Machine Learning Engineer",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ3Qc6aH_O_88TqYpL45p6eLpL8KzW_k_dGqX1tM2J-wN_T3J1O_X4fK1Tz2M5vH_cR-Y_WfJ4c5sO-l6rQ5nL9aO_U6X-sP_A"
    },
    publishedAt: "Oct 05, 2026",
    readTime: "6 min read",
    featuredImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZvmvrZfhsNbfdKzh6YP0cb3wmwsjKz7k1BVA_LVySLiBce4SD3CsOhjapSQhXMQQ2CnlDvUxR9GB8oIL36dWUY7Sfzo1KxEa_iP_RKhahpR6grlia04nkB1N4c2mOh3_eWMQVQvkeRXIlXpxR-DP5en4Vj1dneXG0pwtSQwu4Pd18tASE8AcCh1PJhSROB5Cnle5ljY8TEXiu9LSB9iYBrNbY_-Ypg2iAEMKaKNlQoCczibZPLo1JiQoFA3MnZFFjnfWI3v_V0q1V",
    featured: false,
    content: `
## The Illusion of AI Speed
Demos of AI integrations are always fast. Production environments are a different reality. When user volume spikes, API rate limits are hit, and TTFB (Time to First Byte) balloons to 10 seconds.

## Semantic Caching
Why generate the same answer twice? By implementing a vector database (like Pinecone or Milvus) in front of your LLM call, you can achieve **Semantic Caching**. 

If a user asks "How do I reset my password?" and another asks "Password reset instructions?", the vector embeddings are highly similar. We intercept the query, check for a similarity score > 0.95 in the cache, and return the answer in 20ms instead of 3000ms.

## Token Streaming
Never make a user wait for the entire completion. Always stream the tokens via Server-Sent Events (SSE) or WebSockets. The psychological difference between waiting 3 seconds for a block of text, versus seeing the first word appear in 400ms, is the difference between a successful product and a failed one.
    `
  },
  "kubernetes-zero-trust": {
    slug: "kubernetes-zero-trust",
    title: "Enforcing Zero-Trust in Multi-Tenant Kubernetes",
    excerpt: "A deep dive into NetworkPolicies, Istio sidecars, and enforcing strict mutual TLS between internal container workloads.",
    category: "Cloud Infrastructure",
    author: {
      name: "David Kim",
      role: "DevSecOps Director",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ3Qc6aH_O_88TqYpL45p6eLpL8KzW_k_dGqX1tM2J-wN_T3J1O_X4fK1Tz2M5vH_cR-Y_WfJ4c5sO-l6rQ5nL9aO_U6X-sP_A"
    },
    publishedAt: "Sep 28, 2026",
    readTime: "11 min read",
    featuredImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6ihbOLbKZ8wZKf-Z8h26XdDeUn4PiuCnOCs7WbtFNd3xIlYSqOZGnKQGZqgeE5-hlbaFhs71XiUevO-Oe9pXaBf5KKNRismY9uuoTEJtUUGT7CQXf1DrtP-U6jKqN_903KAiUSZMPdjmwND4C1s9i98zWJQ_jBdy7Wt1vuylz_b6JopzBdH8LZSXLWs1TzeVoZoi2B2pJ0-RHWzIeWsLv5vveEStPOH4qsKlikAMYJ1OvjyCF86ZrKTbqJE6HaGG3cT8C3mCNOstV",
    featured: false,
    content: `
## Perimeter Security is Dead
In a modern cloud-native architecture, assuming internal network traffic is safe is a catastrophic error. A single compromised container in a multi-tenant cluster can laterally scan and exploit the entire network.

## Mutual TLS via Service Mesh
By injecting an Envoy sidecar proxy into every pod using Istio, we force all traffic to traverse the proxy. 

1. **Authentication:** The proxies authenticate each other using short-lived certificates.
2. **Encryption:** All internal traffic is encrypted (mTLS).
3. **Authorization:** We define strict policies regarding which service can talk to which service. The \`frontend\` service can talk to \`api-gateway\`, but absolutely cannot connect directly to \`database-core\`.

Implementing this requires discipline, but it ensures that even if an attacker achieves Remote Code Execution (RCE) on a worker node, their blast radius is contained.
    `
  }
};

export function getAllPosts() {
  return Object.values(BLOG_POSTS);
}

export function getPostBySlug(slug) {
  return BLOG_POSTS[slug] || null;
}
