/**
 * LOGIXLOOPS: Insights & Editorial Data Layer
 *
 * One object, newest post first. `getAllPosts()` returns them in that order
 * and the index takes the head as its featured card, so the order here is the
 * order on the page, there is no sort step to keep in agreement with it.
 *
 * Every post carries three date-shaped fields for three different consumers,
 * and they are separate on purpose:
 *
 *   `publishedAt`  the human string, rendered as-is on the card and the article
 *   `isoDate`      the machine value for `<time datetime>` and JSON-LD
 *   `updatedAt`    optional; set it when a post is materially revised
 *
 * They used to be one field. `<time dateTime="Oct 12, 2026">` is not a valid
 * datetime, parsers reject it, so the date carried no structured meaning at
 * all, and `new Date("Oct 12, 2026")` leaned on a lenient parser to produce
 * the `datePublished` in the article schema. An ISO string costs one line per
 * post and removes both problems.
 *
 * `faqs` is optional and feeds a `FAQPage` block on the post. Answer engines
 * lift those pairs directly, which is worth more on a technical article than
 * another paragraph of prose is. Keep answers to two or three sentences and
 * make them stand alone, an answer that only makes sense after reading the
 * section above it is no use once it has been extracted.
 */

export const BLOG_CATEGORIES = [
  "All Insights",
  "AI Engineering",
  "Cloud Infrastructure",
  "Web Performance",
  "DevOps",
  "Architecture",
  "Engineering Culture",
];

/* The byline. Every post is written by the same person, so this is one
   object rather than a roster — `post.author` feeds the article header, the
   `authors` metadata, and the `author` node of the BlogPosting schema, and
   those three have to agree. Changing the name or the title here changes it
   in all of them. */
const AUTHOR = {
  name: "Aaradhy Raghav Duvey",
  role: "Chief Technology Officer and Outreach Head",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ3Qc6aH_O_88TqYpL45p6eLpL8KzW_k_dGqX1tM2J-wN_T3J1O_X4fK1Tz2M5vH_cR-Y_WfJ4c5sO-l6rQ5nL9aO_U6X-sP_A",
};

export const BLOG_POSTS = {
  "generative-engine-optimization": {
    slug: "generative-engine-optimization",
    seoTitle: "Generative Engine Optimization (GEO): A Technical Guide",
    title: "Generative Engine Optimization: Getting Cited by AI Search",
    excerpt:
      "How ChatGPT, Perplexity, and Google AI Overviews choose what to cite, and the markup, structure, and crawl decisions that decide whether your pages are in the answer.",
    category: "AI Engineering",
    keywords: [
      "generative engine optimization",
      "GEO",
      "answer engine optimization",
      "AI search visibility",
      "schema markup",
      "llms.txt",
    ],
    author: AUTHOR,
    publishedAt: "Aug 05, 2026",
    isoDate: "2026-08-05",
    readTime: "10 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    faqs: [
      {
        question: "What is generative engine optimization?",
        answer:
          "Generative engine optimization is the practice of structuring a site so AI answer engines can extract and cite it. It overlaps with SEO on crawlability and speed, and differs on format: GEO optimises for a passage being lifted into an answer rather than for a link being clicked.",
      },
      {
        question: "Does GEO replace SEO?",
        answer:
          "No. Answer engines still discover pages through conventional crawling and still weigh authority signals. GEO is an additional layer of structure on top of a technically sound site, not a substitute for one.",
      },
      {
        question: "How do you measure AI search visibility?",
        answer:
          "Query the engines directly on a fixed set of prompts each month and record whether you are cited, then cross-check referral traffic from AI hosts in your analytics. There is no rank tracker for answer engines, so a sampled prompt panel is the practical measurement.",
      },
    ],
    content: `
## How do AI answer engines decide what to cite?

They extract passages, not pages. An answer engine retrieves candidate
documents, splits them into passages, and assembles an answer from the ones
that state something specific, verifiable, and self-contained. A page ranks
into the candidate set the ordinary way, crawlable, fast, linked, credible.
It gets *cited* because one passage on it answered the question outright.

That difference is the whole discipline. Classical SEO optimises a page to be
chosen. GEO optimises a paragraph to be quoted.

## The three-part model

Every citation we have been able to trace back came from a page that got all
three of these right.

**1. Reachable.** The engine's crawler has to be allowed in, and it is not the
same crawler as Googlebot. \`GPTBot\`, \`PerplexityBot\`, \`ClaudeBot\` and
\`Google-Extended\` are separate user agents with separate rules. Blocking them
by accident is the most common cause of zero AI visibility we find on audit.

\`\`\`
# robots.txt, allow answer engines explicitly
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /
\`\`\`

**2. Parseable.** Client-rendered content is a coin flip. Most answer-engine
crawlers do not execute JavaScript, or execute it on a budget that a heavy
single-page app exhausts. If the substance of the page is not in the initial
HTML response, assume it does not exist. Server-render the content, and check
by fetching the URL with \`curl\` and reading what comes back rather than
trusting what the browser shows you.

**3. Extractable.** This is the part that is actually new. A passage gets
lifted when it can survive being separated from its page:

- A heading that states the question a reader would actually type
- An answer in the first 40–60 words underneath it, with no pronoun pointing
  back at the previous section
- Concrete nouns and numbers instead of adjectives. "settles in under 900µs"
  beats "blazing fast", every time
- One claim per paragraph

## Structured data still does most of the work

Schema.org markup is the cheapest signal available and remains
disproportionately effective, because it removes the parsing step entirely.
The types that earn their place on a technical site:

| Type | Where | What it buys |
| --- | --- | --- |
| \`Article\` / \`BlogPosting\` | every post | author, date, section |
| \`FAQPage\` | posts and service pages | direct answer-pair extraction |
| \`HowTo\` | procedural guides | step-level citation |
| \`Organization\` | site-wide | entity resolution, who is "LogixLoops" |
| \`BreadcrumbList\` | every page | site structure and context |

The \`FAQPage\` block is the highest-leverage of these on an engineering blog.
It hands the engine question-and-answer pairs that need no interpretation.
Keep the visible copy and the markup identical, divergence between them is
both a policy violation and, in our testing, a reliable way to lose the rich
result.

## llms.txt: worth adding, not worth arguing about

\`/llms.txt\` is a proposed convention: a plain-text map of your most useful
pages, written for a model rather than a crawler. Adoption is partial and it
is not a ranking factor. It costs about twenty minutes, it cannot hurt, and on
a documentation-heavy site it gives a model a clean route to the pages you
actually want quoted. We ship one on every build. We would not restructure a
site around it.

## What we measure, and what we ignore

There is no rank tracker for answer engines, and anyone selling you one is
selling you a sampling methodology with a dashboard on it. What works:

1. Fix a panel of 30–50 prompts a real buyer would type.
2. Run them monthly against each engine and record cited / not cited.
3. Cross-check referral traffic by host in analytics, \`chat.openai.com\`,
   \`perplexity.ai\`, and friends show up as referrers.

Two things we deliberately ignore: raw impression counts from AI surfaces,
which are not exposed reliably anywhere, and "AI visibility scores" from
third-party tools, which are that same prompt panel with an opaque weighting
applied.

## The uncomfortable part

The pages that get cited are usually the ones that say something specific
enough to be wrong. A page hedging every claim survives review and gets quoted
by nobody. If your content team's incentive is to avoid being contradicted,
GEO will not work, and no amount of markup fixes that.

## References
- [Schema.org. FAQPage](https://schema.org/FAQPage), the vocabulary reference.
- [Google Search Central, structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- [OpenAI. GPTBot documentation](https://platform.openai.com/docs/gptbot), including the published IP ranges.
- [llms.txt proposal](https://llmstxt.org/), for the file format itself.
    `,
  },

  "rag-that-survives-production": {
    slug: "rag-that-survives-production",
    seoTitle: "Production RAG: Chunking, Reranking, and Evaluation",
    title: "RAG That Survives Production: Chunking, Reranking, and Eval",
    excerpt:
      "Retrieval quality, not model choice, is what decides whether a RAG system is useful. The chunking, reranking, and evaluation decisions that separate a demo from a system people trust.",
    category: "AI Engineering",
    keywords: [
      "retrieval augmented generation",
      "RAG architecture",
      "vector database",
      "reranking",
      "LLM evaluation",
      "semantic chunking",
    ],
    author: AUTHOR,
    publishedAt: "Jul 29, 2026",
    isoDate: "2026-07-29",
    readTime: "12 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    faqs: [
      {
        question: "What is retrieval-augmented generation?",
        answer:
          "Retrieval-augmented generation is a pattern where a system searches a document store for relevant passages and passes them to a language model as context before it answers. It grounds answers in your own data instead of relying on what the model memorised during training.",
      },
      {
        question: "Why does a RAG prototype get worse in production?",
        answer:
          "Because retrieval degrades faster than generation does. A prototype is tested on questions whose answers sit in one obvious passage; real users ask questions whose answers are split across documents, phrased differently, or absent entirely, and a retriever tuned on the easy case returns confident nonsense on the hard one.",
      },
      {
        question: "How large should RAG chunks be?",
        answer:
          "Start at 400–800 tokens with roughly 15% overlap, then tune against your own evaluation set. Chunks smaller than that lose the context needed to interpret them; much larger and a single retrieved passage dilutes the signal with unrelated text.",
      },
    ],
    content: `
## Why do RAG prototypes fall over in production?

Because the prototype was measured on generation and production is limited by
retrieval. In a demo, every test question has its answer sitting in one clean
paragraph. Real users ask questions whose answer spans three documents, uses
none of the same words, or is not in the corpus at all. Swapping in a better
model does not fix any of those. Better retrieval does.

Across the RAG systems we have taken from prototype to production, the ranking
of what actually moved answer quality has been consistent:

1. Chunking strategy
2. Reranking
3. Query rewriting
4. Prompt construction
5. Base model choice

Model choice is last. It is also the first thing every team wants to change.

## Chunking is a content problem, not a parameter

Fixed-size chunking is the default and it is wrong for most technical
corpora, because it cuts through the middle of the structures that carry the
meaning, a table, a config block, a numbered procedure. A chunk containing
step 4 of 7 with no heading is retrievable and useless.

What has worked for us:

- **Split on structure first.** Headings, list boundaries, code fences. Only
  fall back to token counts inside a section that is too long.
- **Carry the heading path into every chunk.** Prefixing
  \`Security > Key rotation > Automating rotation\` to the chunk text costs a
  few tokens and measurably improves both embedding quality and the model's
  ability to interpret what it received.
- **Overlap around 15%.** Enough that a sentence cut at a boundary appears
  whole in one of the two chunks.
- **Keep tables intact** even when they blow the size budget. A half table is
  worse than no table.

## Reranking is the highest-leverage 30 lines you will write

Embedding search is fast and approximate. It optimises for "this passage is
about the same subject", which is not the same as "this passage answers the
question". A cross-encoder reranker reads the query and each candidate
together and scores actual relevance.

The pattern is: retrieve wide, rerank narrow.

\`\`\`python
# Retrieve 50 candidates by vector similarity, rerank, keep 5.
candidates = vector_store.search(query_embedding, top_k=50)

scored = reranker.score(
    query=user_query,
    documents=[c.text for c in candidates],
)

context = [
    c for c, s in sorted(zip(candidates, scored), key=lambda p: -p[1])
    if s > RELEVANCE_FLOOR
][:5]
\`\`\`

Two details that matter more than the model you pick. First, retrieve far
wider than you intend to use, the reranker can only fix ordering, not recall.
Second, keep the \`RELEVANCE_FLOOR\`. Passing five weak passages because you
promised the prompt five passages is how a system learns to answer questions
it should have declined.

## Hybrid search, because embeddings cannot spell

Vector search fails on exact tokens: error codes, version numbers, flag names,
part numbers. \`ERR_CONN_5521\` embeds near every other error string. Run BM25
keyword search alongside the vector search and fuse the results. Reciprocal
Rank Fusion is about ten lines and needs no tuning. On corpora full of
identifiers this is routinely a larger win than any embedding model upgrade.

## Evaluation, or you are guessing

You cannot improve retrieval you are not measuring, and "it looked better in
the playground" is not measurement. The minimum viable evaluation setup:

- **A golden set.** 100–200 real questions with the passages that should be
  retrieved, labelled by someone who knows the domain. This is a week of
  unglamorous work and it is the whole foundation.
- **Retrieval metrics, separately from answer metrics.** Recall@k and MRR tell
  you whether the right passage was found. Track them on their own, because a
  good answer from lucky retrieval is a bug that will surface later.
- **Answer grading.** An LLM judge scoring faithfulness, does every claim
  trace to a retrieved passage, plus periodic human spot-checks to keep the
  judge honest.
- **Regression gating in CI.** Every change to chunking, embeddings, or
  prompts runs the golden set. A drop over threshold fails the build.

## What we would skip next time

Building a bespoke vector store. Postgres with \`pgvector\` carried every
production workload we have run under roughly 5M chunks, kept retrieval in the
same transactional store as the metadata we needed to filter on, and removed a
whole system from the operational surface. Reach for a dedicated vector
database when you have measured that you need one.

## References
- [Reciprocal Rank Fusion (Cormack et al., 2009)](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf), the original hybrid-fusion paper.
- [pgvector](https://github.com/pgvector/pgvector), Postgres vector similarity search.
- [Anthropic. Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval), on prefixing chunks with their surrounding context.
- [BEIR benchmark](https://github.com/beir-cellar/beir), for comparing retrieval approaches across domains.
    `,
  },

  "postgres-at-ten-terabytes": {
    slug: "postgres-at-ten-terabytes",
    seoTitle: "Scaling PostgreSQL to 10TB: Partitioning and Pooling",
    title: "Postgres at 10 TB: What Breaks First, and in What Order",
    excerpt:
      "Connection exhaustion, autovacuum falling behind, and index bloat arrive in a predictable sequence as a Postgres database grows. Here is the order, and what to do at each step.",
    category: "Architecture",
    keywords: [
      "PostgreSQL scaling",
      "table partitioning",
      "connection pooling",
      "PgBouncer",
      "autovacuum tuning",
      "database performance",
    ],
    author: AUTHOR,
    publishedAt: "Jul 08, 2026",
    isoDate: "2026-07-08",
    readTime: "11 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    faqs: [
      {
        question: "At what size does PostgreSQL start needing special handling?",
        answer:
          "Size is the wrong axis, write rate and connection count are what actually bite. Most systems hit connection exhaustion long before they hit a size limit, typically somewhere past a few hundred concurrent clients, regardless of whether the database is 100 GB or 10 TB.",
      },
      {
        question: "Do I need to shard PostgreSQL?",
        answer:
          "Almost certainly not before you have partitioned your largest tables, added a connection pooler, and moved analytical reads to a replica. Sharding multiplies your operational surface permanently, and in most systems those three changes recover more headroom than a shard split would.",
      },
      {
        question: "What is the most common Postgres scaling mistake?",
        answer:
          "Raising max_connections instead of adding a pooler. Every Postgres connection is an OS process with its own memory; raising the ceiling converts a connection error into a memory-pressure and context-switching problem that is considerably harder to diagnose.",
      },
    ],
    content: `
## What actually breaks first as Postgres grows?

Connections, before anything else. Then autovacuum falls behind on your
highest-churn table. Then index bloat quietly doubles your working set until
it stops fitting in cache. Raw data volume is usually the *last* thing to hurt
you, which is why teams that plan for "scale" by planning for size get
surprised by an outage at 400 GB.

The sequence below is the one we have watched play out repeatedly on
transactional Postgres systems.

## Stage 1. Connection exhaustion

Every Postgres connection is a separate OS process holding its own work
memory. A few hundred idle application connections will consume gigabytes and
saturate the scheduler doing nothing at all. Serverless functions and
container autoscaling make this dramatically worse, because each new instance
opens its own pool.

The fix is a pooler, not a bigger \`max_connections\`.

\`\`\`ini
; pgbouncer.ini, transaction pooling
[databases]
app = host=primary.internal port=5432 dbname=app

[pgbouncer]
pool_mode = transaction
max_client_conn = 5000
default_pool_size = 40
server_idle_timeout = 120
\`\`\`

\`pool_mode = transaction\` is what buys the ratio, a connection returns to
the pool at commit rather than at disconnect, so 5,000 clients share 40 real
backends. The constraint you inherit is that session-scoped state stops
working: \`SET\` outside a transaction, session advisory locks, and
\`LISTEN\`/\`NOTIFY\` will not behave. Audit for those before switching, not
after.

## Stage 2. Autovacuum falls behind

Postgres marks deleted and updated rows dead rather than removing them, and
autovacuum reclaims them later. On a table taking heavy updates, the default
settings, vacuum at 20% dead tuples, mean a 500M-row table waits for 100M
dead rows before anything happens. By then the vacuum is long, disruptive, and
competing with your traffic.

Tune the hot tables individually. Global settings are the wrong granularity:

\`\`\`sql
ALTER TABLE events SET (
  autovacuum_vacuum_scale_factor = 0.01,   -- 1%, not 20%
  autovacuum_vacuum_cost_limit = 2000,     -- let it actually keep up
  autovacuum_analyze_scale_factor = 0.02
);
\`\`\`

Watch \`n_dead_tup\` in \`pg_stat_user_tables\` and alert when it trends up
between vacuums. A dead-tuple count that never comes back down is a vacuum
that is losing, and that is the leading indicator of the outage six weeks out.

## Stage 3. Partition the tables that only grow

Time-series tables, events, logs, ledger entries, audit trails, get
partitioned by range. The wins compound:

- Index maintenance stays proportional to the active partition, not the table
- Dropping old data becomes \`DETACH PARTITION\`, which is instant, instead of
  a \`DELETE\` that generates hundreds of millions of dead tuples
- The planner prunes irrelevant partitions from the scan entirely

\`\`\`sql
CREATE TABLE events (
  id          bigserial,
  tenant_id   bigint      NOT NULL,
  occurred_at timestamptz NOT NULL,
  payload     jsonb       NOT NULL
) PARTITION BY RANGE (occurred_at);

CREATE TABLE events_2026_07 PARTITION OF events
  FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
\`\`\`

Two things to get right up front. The partition key must appear in your
\`WHERE\` clauses or you gain nothing and lose the ability to have a simple
global unique constraint. And partition creation must be automated,
\`pg_partman\` or a scheduled job, because the failure mode of a missing
future partition is writes erroring at midnight.

## Stage 4. Bloat and the index you forgot

Indexes bloat as pages fragment under updates. A 40 GB index doing the work of
a 12 GB one is not just disk: it is cache you no longer have. \`REINDEX
CONCURRENTLY\` rebuilds without an exclusive lock and is safe to schedule.

While you are in there, drop what nobody uses. \`pg_stat_user_indexes\` will
tell you which indexes have never been scanned; on most mature schemas that is
a meaningful fraction of them, and every one is write amplification you are
paying for on every insert.

## What we would not do

Shard. Not until partitioning, pooling, and moving analytical reads to a
replica have all been done and measured. Sharding is a permanent tax on every
query, migration, and backup you will ever run, and most systems that reach
for it still have an unpartitioned 2 TB table and no pooler.

## References
- [PostgreSQL. Table Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html).
- [PostgreSQL. Routine Vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html).
- [PgBouncer configuration reference](https://www.pgbouncer.org/config.html).
- [pg_partman](https://github.com/pgpartman/pg_partman), for automated partition management.
    `,
  },

  "kubernetes-cost-control": {
    slug: "kubernetes-cost-control",
    seoTitle: "Kubernetes Cost Optimization: Where the Money Goes",
    title: "Cutting a Kubernetes Bill by 40% Without Touching Reliability",
    excerpt:
      "Most Kubernetes overspend is idle capacity you requested and never used. How to find it with the data you already have, and the four changes that recover the most.",
    category: "Cloud Infrastructure",
    keywords: [
      "Kubernetes cost optimization",
      "FinOps",
      "resource requests and limits",
      "cluster autoscaler",
      "spot instances",
      "cloud cost reduction",
    ],
    author: AUTHOR,
    publishedAt: "Jun 17, 2026",
    isoDate: "2026-06-17",
    readTime: "9 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    faqs: [
      {
        question: "Why is our Kubernetes cluster so expensive?",
        answer:
          "Usually because resource requests are set far above real usage. The scheduler reserves what you request, not what you use, so a fleet requesting 4 CPU and burning 0.3 pays for the 4, and no dashboard shows that as waste unless you go looking.",
      },
      {
        question: "What is the difference between requests and limits?",
        answer:
          "A request is the capacity the scheduler reserves for a pod and the number that drives your bill. A limit is the ceiling the runtime enforces at execution time. Overstated requests waste money; overstated CPU limits mostly do not, which is why the two should be tuned separately.",
      },
      {
        question: "Are spot instances safe for production?",
        answer:
          "For stateless, replicated workloads that tolerate a two-minute eviction notice, yes, and they typically cost 60–90% less. Keep control-plane components, stateful sets, and anything with a slow warm-up on on-demand nodes.",
      },
    ],
    content: `
## Where does Kubernetes overspend actually come from?

Requested capacity nobody uses. The scheduler bills you for what a pod
*reserves*, not what it consumes, so a service requesting 4 CPU and averaging
0.3 is paying for 4 forever, and every cluster dashboard will show that node
as healthily allocated. On the clusters we have audited, the gap between
requested and used CPU has run between 60% and 80%.

Nothing below involves running less software. It involves stopping paying for
capacity that was never doing anything.

## Step 1. Measure the gap before changing anything

You need two numbers per workload: what it requests, and its p95 actual usage
over a fortnight. If you run \`kube-state-metrics\` and Prometheus you already
have both.

\`\`\`promql
# Requested vs actually used CPU, by workload, over 14 days
sum by (namespace, workload) (
  kube_pod_container_resource_requests{resource="cpu"}
)
/
sum by (namespace, workload) (
  quantile_over_time(0.95, rate(container_cpu_usage_seconds_total[5m])[14d:5m])
)
\`\`\`

Anything above 3 is a candidate. Sort descending, and work down, cost is
almost always concentrated in a handful of workloads, and the top five
typically account for most of the recoverable spend.

## Step 2. Right-size requests, and treat CPU and memory differently

They fail differently, so tune them differently.

**CPU** is compressible. A pod that exceeds its CPU limit gets throttled, not
killed. Set the request at roughly p95 usage. Leave the CPU limit off entirely
on latency-sensitive services. CFS throttling on a bursty request path adds
tail latency for no reliability benefit, which is a trade most teams make by
accident.

**Memory** is not compressible. Exceed the limit and the pod is OOM-killed.
Set the request at p99 with real headroom, and set the limit equal to the
request so the pod lands in the Guaranteed QoS class and is evicted last.

\`\`\`yaml
resources:
  requests:
    cpu: "250m"      # p95 measured, not guessed
    memory: "512Mi"
  limits:
    memory: "512Mi"  # equal to request → Guaranteed QoS
    # no CPU limit: throttling costs latency, saves nothing
\`\`\`

## Step 3. Let the cluster shrink

Right-sizing only saves money if node count follows demand down. Three pieces
have to be in place together:

- **Cluster autoscaler or Karpenter**, with scale-*down* actually enabled and
  its aggressiveness tuned. Many clusters run with scale-down effectively
  disabled by a default nobody revisited.
- **Pod Disruption Budgets** on everything that matters, so the autoscaler can
  drain nodes without you fearing it.
- **No orphaned blockers.** A single pod with local storage, or a
  \`PodDisruptionBudget\` that permits zero disruptions, will pin an
  otherwise-empty node indefinitely. These are the most common reason a
  correctly configured autoscaler never scales anything down.

## Step 4. Move the tolerant workloads to spot

Spot capacity runs 60–90% cheaper with a short eviction notice. The split we
use:

- **Spot:** stateless services with 3+ replicas, batch jobs, CI runners, async
  workers
- **On-demand:** control plane, databases and stateful sets, anything with a
  warm-up longer than the eviction window, single-replica services

Spread across several instance types and availability zones. A spot pool
pinned to one instance type is a single point of failure that happens to be
cheap.

## What we deliberately did not do

Buy a cost-optimisation platform before doing any of the above. The data
needed for all four steps is already in Prometheus, and a tool that surfaces
the same numbers behind a subscription does not change them. Buy the platform
later, for continuous enforcement, once you know what your baseline should be.

## References
- [Kubernetes. Managing Resources for Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).
- [Kubernetes. Pod Quality of Service classes](https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/).
- [Karpenter documentation](https://karpenter.sh/docs/), on consolidation and node lifecycle.
- [FinOps Foundation. Kubernetes cost allocation](https://www.finops.org/projects/kubernetes/).
    `,
  },

  "kubernetes-zero-trust": {
    slug: "kubernetes-zero-trust",
    seoTitle: "Zero-Trust Security in Multi-Tenant Kubernetes",
    title: "Enforcing Zero-Trust in Multi-Tenant Kubernetes",
    excerpt:
      "A deep dive into NetworkPolicies, Istio sidecars, and enforcing strict mutual TLS between internal container workloads.",
    category: "Cloud Infrastructure",
    keywords: [
      "Kubernetes zero trust",
      "NetworkPolicy",
      "Istio mTLS",
      "service mesh security",
      "multi-tenant cluster",
    ],
    author: AUTHOR,
    publishedAt: "May 21, 2026",
    isoDate: "2026-05-21",
    readTime: "11 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    faqs: [
      {
        question: "How do you isolate tenants in a shared Kubernetes cluster?",
        answer:
          "Deny all pod-to-pod traffic by default with NetworkPolicies, then allow only the specific service-to-service paths your architecture requires. Add mutual TLS between pods so identity is cryptographic rather than network-positional.",
      },
      {
        question: "Is a namespace a security boundary in Kubernetes?",
        answer:
          "Not on its own. A namespace scopes names and RBAC, but by default any pod can reach any other pod's network address across namespaces. The boundary only exists once you add NetworkPolicies and, for stronger isolation, workload identity via mTLS.",
      },
    ],
    content: `
## How do you isolate tenants in a shared Kubernetes cluster?

Treat every pod as untrusted, including your own. Put a proxy in front of each
one so all traffic is authenticated and encrypted between services. Then write
policies that say exactly which service may call which. If an attacker gets
code running on a node, they land in a box that can only reach the few
services you allowed, instead of the whole cluster.

## Perimeter security is dead

In a modern cloud-native architecture, assuming internal network traffic is
safe is a catastrophic error. A single compromised container in a multi-tenant
cluster can laterally scan and exploit the entire network, because the default
Kubernetes network model is flat: every pod can reach every other pod.

A namespace does not change this. It scopes names and RBAC. It does not stop
packets.

## Default-deny, then allow deliberately

The first NetworkPolicy in any cluster should deny everything, so that every
subsequent policy is an explicit, reviewable grant rather than a patch on an
open network.

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: tenant-a
spec:
  podSelector: {}          # every pod in the namespace
  policyTypes: [Ingress, Egress]
\`\`\`

Egress matters as much as ingress and is the half teams routinely skip. Most
of what an attacker does after landing in a container, reaching a metadata
endpoint, exfiltrating to an external host, pulling a second-stage payload,
is outbound.

## Mutual TLS via service mesh

By injecting an Envoy sidecar proxy into every pod using Istio, we force all
traffic to traverse the proxy:

1. **Authentication:** proxies authenticate each other using short-lived
   workload certificates, so identity is cryptographic rather than based on IP
   address, which in a cluster is reassigned constantly.
2. **Encryption:** all internal traffic is encrypted with mTLS, including
   traffic that never leaves the node.
3. **Authorization:** policies define which service may call which. The
   \`frontend\` service can talk to \`api-gateway\`, but cannot connect directly
   to \`database-core\`.

Implementing this requires discipline, but it ensures that even if an attacker
achieves remote code execution on a worker node, their blast radius is
contained to the handful of services that workload identity was permitted to
reach.

## References
- [NIST SP 800-207. Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final), the reference definition.
- [Kubernetes. Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/).
- [Istio. Mutual TLS authentication](https://istio.io/latest/docs/concepts/security/#mutual-tls-authentication).
    `,
  },

  "multi-tenant-saas-data-isolation": {
    slug: "multi-tenant-saas-data-isolation",
    seoTitle: "Multi-Tenant SaaS: Choosing a Data Isolation Model",
    title: "Multi-Tenant SaaS: Shared Schema, Schema-per-Tenant, or Database-per-Tenant",
    excerpt:
      "The tenancy model you pick on day one decides your migration story, your compliance answers, and your per-customer cost for the life of the product. A decision framework with the trade-offs stated plainly.",
    category: "Architecture",
    keywords: [
      "multi-tenant SaaS architecture",
      "data isolation",
      "row level security",
      "schema per tenant",
      "SaaS database design",
      "noisy neighbour",
    ],
    author: AUTHOR,
    publishedAt: "Apr 30, 2026",
    isoDate: "2026-04-30",
    readTime: "10 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    faqs: [
      {
        question: "What are the multi-tenancy models for a SaaS database?",
        answer:
          "Three: a shared schema with a tenant column on every row, a separate schema per tenant inside one database, and a separate database per tenant. They trade operational cost against isolation strength in that order.",
      },
      {
        question: "Which multi-tenancy model should a new SaaS product start with?",
        answer:
          "Shared schema with row-level security, unless a signed customer contract already requires physical separation. It is the cheapest to operate and the only model where a schema migration is a single deployment, and it can be split later for the specific tenants that need it.",
      },
      {
        question: "Is row-level security enough to isolate tenants?",
        answer:
          "It is enough for the database layer when policies are enforced at the connection level and the application never connects as a superuser or table owner, both of which bypass RLS. It does not address noisy-neighbour performance or per-tenant backup and restore.",
      },
    ],
    content: `
## Which tenancy model should you choose?

Start with a shared schema and row-level security unless a contract already
requires otherwise. It is the cheapest model to run, the only one where a
migration is a single deployment, and it can be selectively split later for
the few tenants that genuinely need physical separation. Teams that start at
database-per-tenant to be safe usually discover they bought an isolation
guarantee nobody asked for and a migration process nobody can run.

Here is the whole decision in one table.

| | Shared schema | Schema per tenant | Database per tenant |
| --- | --- | --- | --- |
| Isolation | Logical | Strong logical | Physical |
| Migration | One deploy | N schemas | N databases |
| Cost per tenant | Lowest | Low | Highest |
| Noisy neighbour | Real risk | Real risk | Eliminated |
| Per-tenant restore | Hard | Moderate | Trivial |
| Practical ceiling | Millions | Low thousands | Hundreds |

## Shared schema, done properly

Every table carries a \`tenant_id\`, and the database, not the application,
enforces the filter. Application-level filtering is one forgotten \`WHERE\`
clause away from a cross-tenant data leak, and that is the single worst
incident class a SaaS product has.

\`\`\`sql
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON invoices
  USING (tenant_id = current_setting('app.tenant_id')::bigint);
\`\`\`

Then set \`app.tenant_id\` once, at connection checkout, from the authenticated
session, never from a request parameter.

Two failure modes to design against explicitly. Row-level security is bypassed
by superusers and by the table owner, so the application role must be neither.
And every index needs \`tenant_id\` as its leading column, or a query for one
tenant scans across all of them and the largest customer sets the latency for
everyone.

## When to actually split a tenant out

Not on a hunch. There are three defensible triggers:

1. **A contractual or regulatory requirement** for physical separation,
   common in health and public-sector deals, and usually non-negotiable.
2. **A tenant large enough to distort the shared cluster**, where their query
   patterns set p99 latency for every other customer.
3. **A residency requirement** placing one tenant's data in a specific
   jurisdiction.

Design for this from the start by keeping the tenant-to-connection-string
mapping in a routing layer, even while every tenant resolves to the same
database. Adding that layer later means touching every data-access path in the
product; having it from day one makes splitting a tenant a configuration
change.

## The part that gets underestimated

Operations, not architecture. Whichever model you pick, you will eventually
need to: restore one tenant to a point in time without touching the others,
export everything one tenant owns on request, delete it all on request, and
run a schema migration across the fleet without a maintenance window.

Write those four runbooks before you have fifty customers. Every model can
satisfy them; they just cost wildly different amounts of engineering depending
on how early you asked. Teams that pick a tenancy model on isolation alone,
and meet these requirements later, are the ones who end up rebuilding.

## References
- [PostgreSQL. Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).
- [AWS. SaaS tenant isolation strategies](https://docs.aws.amazon.com/whitepapers/latest/saas-tenant-isolation-strategies/saas-tenant-isolation-strategies.html).
- [Microsoft. Multi-tenant SaaS database tenancy patterns](https://learn.microsoft.com/en-us/azure/azure-sql/database/saas-tenancy-app-design-patterns).
    `,
  },

  "llm-orchestration-in-production": {
    slug: "llm-orchestration-in-production",
    seoTitle: "LLM Orchestration in Production",
    title: "LLM Orchestration: Managing Latency in Production",
    excerpt:
      "Strategies for managing rate limits, semantic caching, and token streaming when deploying Large Language Models at scale.",
    category: "AI Engineering",
    keywords: [
      "LLM latency",
      "semantic caching",
      "token streaming",
      "rate limits",
      "AI in production",
    ],
    author: AUTHOR,
    publishedAt: "Apr 09, 2026",
    isoDate: "2026-04-09",
    readTime: "6 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    faqs: [
      {
        question: "What makes an LLM feature slow in production?",
        answer:
          "Concurrency. A demo serves one person and a production system serves everyone, so requests queue behind provider rate limits and time-to-first-byte climbs from under a second into double digits. Caching repeated answers and streaming tokens address most of it.",
      },
      {
        question: "What is semantic caching?",
        answer:
          "Caching answers by meaning rather than by exact string. The incoming query is embedded and compared against previously answered queries; above a similarity threshold the stored answer is returned, turning a multi-second generation into a lookup of a few milliseconds.",
      },
    ],
    content: `
## What makes LLM features slow in production?

Demos are fast because one person is using them. Production is slow because
everyone is. You hit rate limits, requests queue, and time-to-first-byte
climbs from under a second to ten. The two fixes that matter most are caching
answers you have already generated, and streaming tokens so the user sees
words immediately instead of waiting for the whole reply.

## The illusion of AI speed

Demos of AI integrations are always fast. Production environments are a
different reality. When user volume spikes, API rate limits are hit, and time
to first byte balloons to ten seconds.

## Semantic caching

Why generate the same answer twice? By implementing a vector index in front of
your LLM call, you can achieve **semantic caching**.

If a user asks "How do I reset my password?" and another asks "Password reset
instructions?", the embeddings are highly similar. We intercept the query,
check for a similarity score above 0.95 in the cache, and return the answer in
20ms instead of 3000ms.

The threshold is the whole design. Too low and users get confidently wrong
answers to questions they did not ask; too high and the cache never hits. Tune
it against a labelled set of near-miss query pairs, and keep the cache scoped
per tenant so one customer's answer never surfaces for another.

## Token streaming

Never make a user wait for the entire completion. Always stream the tokens via
Server-Sent Events or WebSockets. The psychological difference between waiting
three seconds for a block of text, versus seeing the first word appear in
400ms, is the difference between a successful product and a failed one.

## References
- [MDN. Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).
- [Nielsen Norman Group. Response times: the three important limits](https://www.nngroup.com/articles/response-times-3-important-limits/), on the perception thresholds behind streaming.
    `,
  },

  "fixing-inp-in-react": {
    slug: "fixing-inp-in-react",
    seoTitle: "Fixing INP in React: Interaction to Next Paint",
    title: "INP Is the Metric That Finally Catches Slow React",
    excerpt:
      "Interaction to Next Paint measures every interaction on the page, not just the first. Why React applications fail it, and the four changes that fix most of the failures.",
    category: "Web Performance",
    keywords: [
      "Interaction to Next Paint",
      "INP",
      "Core Web Vitals",
      "React performance",
      "long tasks",
      "main thread blocking",
    ],
    author: AUTHOR,
    publishedAt: "Mar 12, 2026",
    isoDate: "2026-03-12",
    readTime: "8 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    faqs: [
      {
        question: "What is Interaction to Next Paint?",
        answer:
          "Interaction to Next Paint is a Core Web Vital measuring the delay between a user interaction and the next frame the browser paints, reported at roughly the worst interaction on the page. Google considers 200ms or less good and above 500ms poor.",
      },
      {
        question: "Why do React applications fail INP?",
        answer:
          "Because a single state update can re-render a large component tree synchronously, and that work blocks the main thread before the browser can paint. The interaction registers instantly; the frame showing its result does not arrive for hundreds of milliseconds.",
      },
      {
        question: "How is INP different from First Input Delay?",
        answer:
          "First Input Delay measured only the first interaction, and only the delay before the handler started, so a page could score well while every subsequent interaction was slow. INP measures all interactions across the full visit and includes the time to paint the result.",
      },
    ],
    content: `
## Why do React apps fail Interaction to Next Paint?

Because one state update can synchronously re-render a large tree, and that
work blocks the main thread before the browser gets a chance to paint. The
click is registered immediately. The frame showing its result arrives 400ms
later. First Input Delay never caught this, it only measured the first
interaction, and only the wait before the handler ran. INP measures every
interaction, all the way through to the pixels.

The target: **200ms or less** at the 75th percentile of real users. Above
500ms is a failure.

## Find the real long tasks first

Local profiling on a fast laptop will not reproduce this. Instrument
production and let real devices tell you.

\`\`\`js
import { onINP } from "web-vitals/attribution";

onINP(({ value, attribution }) => {
  // attribution names the element and splits the timing into
  // input delay / processing / presentation delay, which of the three
  // dominates is what tells you which fix below applies.
  sendToAnalytics({
    value,
    target: attribution.interactionTarget,
    inputDelay: attribution.inputDelay,
    processingDuration: attribution.processingDuration,
    presentationDelay: attribution.presentationDelay,
  });
});
\`\`\`

Read the split before changing anything. High input delay means the main
thread was already busy when the user clicked, the problem is elsewhere on
the page, often a third-party script. High processing duration means your
handler and the render it triggers are the problem. High presentation delay
usually means layout or paint cost, not JavaScript.

## Fix 1. Yield before the expensive part

The cheapest win is letting the browser paint before you do the heavy work.
Update what the user can see, hand the thread back, then continue.

\`\`\`js
function onFilterChange(next) {
  setFilterLabel(next);          // cheap: paint the new state now

  scheduler.yield?.() ?? new Promise((r) => setTimeout(r, 0));
  // ...then run the expensive recompute after the frame
}
\`\`\`

A visible response within 100ms and the full result at 400ms scores, and
feels, dramatically better than both arriving together at 400ms.

## Fix 2. Separate urgent from non-urgent updates

React 18's concurrent features exist for exactly this shape of problem. The
typed character must land immediately; the filtered list of 5,000 rows can
arrive a frame or two later.

\`\`\`jsx
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);

// Input stays responsive; the expensive list tracks the deferred value.
<input value={query} onChange={(e) => setQuery(e.target.value)} />
<ResultsList query={deferredQuery} />
\`\`\`

\`useTransition\` does the same job when you control the update site rather
than the value.

## Fix 3. Stop rendering rows nobody is looking at

If a list can exceed a few hundred rows, virtualise it. No amount of
memoisation makes rendering 5,000 DOM nodes fast, and every interaction that
touches that list pays the cost again. This is the single highest-impact
change on data-heavy internal tools, which is where we see the worst INP
numbers in practice.

## Fix 4. Audit the third parties

Analytics, chat widgets, tag managers and session recorders run on the same
single main thread as your application. A tag manager firing on every click is
a very common cause of high *input delay*, a component you did not write
making a component you did feel slow. Load them with \`async\`, defer anything
non-essential past first interaction, and re-measure with each one disabled to
find out what you are actually paying for.

## What not to bother with

Wrapping every component in \`React.memo\`. It adds a comparison cost to every
render and fixes nothing if the underlying problem is one very expensive
subtree or a 5,000-row list. Measure which interaction is slow, then fix that
one.

## References
- [web.dev. Interaction to Next Paint](https://web.dev/articles/inp), the metric definition and thresholds.
- [web.dev. Optimize long tasks](https://web.dev/articles/optimize-long-tasks), including \`scheduler.yield()\`.
- [React, useDeferredValue](https://react.dev/reference/react/useDeferredValue).
- [web-vitals attribution build](https://github.com/GoogleChrome/web-vitals#attribution-build), for field diagnostics.
    `,
  },

  "strangling-the-monolith": {
    slug: "strangling-the-monolith",
    seoTitle: "Strangler Fig Pattern for Monolith Migration",
    title: "Strangling the Monolith: Zero-Downtime Migration Patterns",
    excerpt:
      "How to decouple a monolithic legacy system into event-driven microservices without dropping a single production transaction.",
    category: "Architecture",
    keywords: [
      "strangler fig pattern",
      "monolith to microservices",
      "zero downtime migration",
      "change data capture",
      "legacy modernization",
    ],
    author: AUTHOR,
    publishedAt: "Feb 18, 2026",
    isoDate: "2026-02-18",
    readTime: "8 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    faqs: [
      {
        question: "What is the strangler fig pattern?",
        answer:
          "An incremental migration strategy where new services take over slices of a legacy system's behaviour one route at a time, behind a proxy that decides which system handles each request. The legacy system shrinks until it can be removed, with no cutover event.",
      },
      {
        question: "How do you migrate a monolith without downtime?",
        answer:
          "Put a reverse proxy in front of the monolith before writing any new code, then move one route at a time behind it. Replicate the data the new service needs with change data capture so both systems stay consistent while traffic is split.",
      },
    ],
    content: `
## The legacy trap

Most enterprise architectures inevitably calcify. What begins as a neatly
organized MVC application slowly degrades into a monolithic dependency web.
Teams stop shipping. Builds take hours. Deployment requires weekend war rooms.

The solution is the **strangler fig pattern**.

## Defining the strangler fig

Instead of attempting a "big bang" rewrite, which fails in the large majority
of enterprise scenarios, we incrementally replace legacy functionality with
new services. We deploy an API gateway to intercept traffic, routing it to
either the legacy monolith or the new service based on the URL path or a
feature flag.

### Step 1: The edge proxy

Before writing a single line of new service code, deploy a strict reverse
proxy at the edge. Everything routes to the monolith on day one; the proxy
exists so that changing that later is a config change rather than a project.

\`\`\`yaml
# envoy.yaml proxy configuration
routes:
  - match: { prefix: "/api/v2/checkout" }
    route: { cluster: "new_checkout_service" }
  - match: { prefix: "/" }
    route: { cluster: "legacy_monolith" }
\`\`\`

### Step 2: Event interception

Legacy systems often rely on shared database state. To decouple the new
service, we implement **change data capture**, commonly Debezium and Kafka,
to stream database row changes from the legacy database into the new service's
isolated datastore.

This is what makes the migration reversible. Both systems hold current data,
so a route can be moved back to the monolith at any point without a restore.

## Conclusion

Migrating a monolith is a marathon of discipline. By prioritizing edge-routing
and asynchronous data replication, engineering teams can modernize their stack
while keeping the business running at full velocity.

## References
- [Martin Fowler. StranglerFigApplication](https://martinfowler.com/bliki/StranglerFigApplication.html), the original description of the pattern.
- [Debezium documentation](https://debezium.io/documentation/reference/stable/index.html) on change data capture connectors.
- [Envoy Proxy routing configuration](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/http/http_routing).
    `,
  },
};

/** Insertion order is publication order, newest first. The index relies on it
 *  for both the featured slot and the "newest first" archive claim. */
export function getAllPosts() {
  return Object.values(BLOG_POSTS);
}

export function getPostBySlug(slug) {
  return BLOG_POSTS[slug] || null;
}
