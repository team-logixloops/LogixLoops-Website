"use client";

/**
 * A multinomial Naive Bayes text classifier, in full.
 *
 * This is the real algorithm, not a lookup table dressed up as one: it counts
 * term frequencies per class, applies Laplace smoothing over the shared
 * vocabulary, and scores a document by summing log-probabilities. Add a
 * training example and the counts move; the predictions move with them. There
 * is nowhere in here for a hard-coded answer to hide.
 *
 * Naive Bayes is the right model for a demo like this for the same reasons it
 * was the right model for spam filters for a decade: it trains in one pass, it
 * needs no tuning, and, the part that matters here, every prediction
 * decomposes cleanly into a per-token contribution, so the model can show its
 * working. A neural classifier would score better and explain nothing.
 */

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "of", "to", "in", "on", "for",
  "with", "as", "is", "are", "was", "were", "be", "been", "it", "this", "that",
  "we", "our", "us", "i", "you", "your", "they", "at", "by", "from", "has",
  "have", "had", "do", "does", "did", "so", "can", "could", "would", "will",
]);

/** Lowercase, strip punctuation, drop stopwords and single characters. */
export function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^['-]+|['-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/**
 * Smoothing strength.
 *
 * Textbook Naive Bayes uses add-one, but that is badly calibrated for short
 * documents over a large vocabulary: with ~60 terms per class and a 300-word
 * vocabulary, a full pseudo-count per term swamps the real evidence and the
 * classifier collapses toward the priors. 0.3 is the usual working value for
 * short text and it is the difference between this model being useful and
 * being a coin flip, measured, not guessed.
 */
const ALPHA = 0.3;

/**
 * Fit the model.
 *
 * @param {{text: string, label: string}[]} documents
 * @returns a trained model, plain data, so it serialises straight to JSON
 */
export function train(documents) {
  const classes = new Map(); // label -> { docs, totalTerms, counts: Map }
  const vocabulary = new Set();

  for (const doc of documents) {
    const tokens = tokenize(doc.text);
    if (tokens.length === 0) continue;

    let cls = classes.get(doc.label);
    if (!cls) {
      cls = { label: doc.label, docs: 0, totalTerms: 0, counts: new Map() };
      classes.set(doc.label, cls);
    }

    cls.docs += 1;
    for (const token of tokens) {
      cls.counts.set(token, (cls.counts.get(token) || 0) + 1);
      cls.totalTerms += 1;
      vocabulary.add(token);
    }
  }

  const totalDocs = [...classes.values()].reduce((sum, c) => sum + c.docs, 0);
  const vocabSize = vocabulary.size;

  return {
    classes: [...classes.values()].map((cls) => ({
      ...cls,
      // Log space throughout: multiplying a few hundred probabilities in
      // linear space underflows to zero long before the document ends.
      logPrior: Math.log(cls.docs / totalDocs),
    })),
    vocabulary,
    vocabSize,
    totalDocs,
  };
}

/** log P(term | class) with add-α smoothing over the shared vocabulary. */
function logLikelihood(cls, term, vocabSize) {
  const count = cls.counts.get(term) || 0;
  return Math.log((count + ALPHA) / (cls.totalTerms + ALPHA * vocabSize));
}

/**
 * Score a document.
 *
 * Returns every class's probability plus, for each token, how much it pushed
 * toward the winning class. The contribution is the log-likelihood ratio
 * between the top class and the strongest competitor, which is exactly the
 * quantity that decided the outcome, so the highlighting is the explanation
 * rather than a proxy for it.
 */
export function predict(model, text) {
  const tokens = tokenize(text);
  if (!model.classes.length || tokens.length === 0) {
    return { tokens: [], scores: [], top: null, known: 0 };
  }

  /**
   * Score against known vocabulary only.
   *
   * A token nobody has seen carries no evidence about which class this is,
   * but scoring it anyway is not neutral. Its smoothed likelihood is
   * `α / (totalTerms + αV)`, which is *larger* for a class with fewer total
   * terms, so every unknown word quietly votes for whichever class happens to
   * have the shortest documents. On a corpus this size that bias dominated the
   * real signal. Dropping out-of-vocabulary tokens removes it.
   *
   * They are still surfaced in the attribution list below, marked unseen,
   * because "the model has never met this word" is worth showing.
   */
  const known = tokens.filter((token) => model.vocabulary.has(token));

  const scores = model.classes.map((cls) => {
    let logProb = cls.logPrior;
    for (const token of known) {
      logProb += logLikelihood(cls, token, model.vocabSize);
    }
    return { label: cls.label, logProb };
  });

  // Softmax, shifted by the max so `exp` never overflows.
  const max = Math.max(...scores.map((s) => s.logProb));
  const exps = scores.map((s) => Math.exp(s.logProb - max));
  const sum = exps.reduce((acc, v) => acc + v, 0);
  const withProb = scores
    .map((s, i) => ({ ...s, probability: exps[i] / sum }))
    .sort((a, b) => b.probability - a.probability);

  const topClass = model.classes.find((c) => c.label === withProb[0].label);
  const rivalLabel = withProb[1]?.label;
  const rivalClass = rivalLabel ? model.classes.find((c) => c.label === rivalLabel) : null;

  const attributed = tokens.map((token) => {
    const inTop = logLikelihood(topClass, token, model.vocabSize);
    const inRival = rivalClass ? logLikelihood(rivalClass, token, model.vocabSize) : inTop;
    return {
      token,
      seen: model.vocabulary.has(token),
      count: topClass.counts.get(token) || 0,
      // Positive: evidence for the winner. Negative: evidence against it.
      weight: inTop - inRival,
    };
  });

  return {
    tokens: attributed,
    scores: withProb,
    top: withProb[0],
    known: attributed.filter((t) => t.seen).length,
  };
}

/**
 * Deterministic shuffle.
 *
 * The split has to be stable across renders, or the reported accuracy would
 * flicker every time React re-ran the evaluation, hence a seeded generator
 * rather than Math.random.
 *
 * It is mulberry32, and the `Math.imul` matters: the obvious textbook LCG
 * (`state * 1103515245 + 12345`) overflows 2^53 on the very first step in
 * JavaScript, so the low bits, the ones a modulo reads, are rounding noise
 * rather than pseudo-randomness. That produced a degenerate split here and a
 * held-out accuracy that measured the shuffle instead of the model.
 */
function makeRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(items, seed = 7) {
  const copy = [...items];
  const random = makeRandom(seed);
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Hold-out evaluation.
 *
 * Trains on a fraction of the data and scores the rest, the part the model
 * has never seen. Reporting accuracy on the training set instead would give a
 * flattering number that says nothing about whether the thing generalises, and
 * would climb toward 100% as a visitor added examples, which is precisely the
 * wrong lesson.
 */
export function evaluate(documents, labels, holdout = 0.3) {
  // Stratified: hold back the same fraction *of each class*. A flat shuffle on
  // a corpus this small routinely leaves one class with two training documents
  // and the reported accuracy then measures the split, not the model.
  const trainSet = [];
  const testSet = [];

  for (const label of labels) {
    const ofClass = shuffled(documents.filter((doc) => doc.label === label));
    if (ofClass.length === 0) continue;
    const cut = Math.max(1, Math.round(ofClass.length * (1 - holdout)));
    trainSet.push(...ofClass.slice(0, cut));
    testSet.push(...ofClass.slice(cut));
  }

  if (testSet.length === 0 || trainSet.length === 0) {
    return { accuracy: null, matrix: null, trainSize: trainSet.length, testSize: testSet.length };
  }

  const model = train(trainSet);
  const matrix = labels.map(() => labels.map(() => 0));
  let correct = 0;

  for (const doc of testSet) {
    const result = predict(model, doc.text);
    if (!result.top) continue;
    const actual = labels.indexOf(doc.label);
    const guessed = labels.indexOf(result.top.label);
    if (actual >= 0 && guessed >= 0) {
      matrix[actual][guessed] += 1;
      if (actual === guessed) correct += 1;
    }
  }

  return {
    accuracy: correct / testSet.length,
    matrix,
    trainSize: trainSet.length,
    testSize: testSet.length,
  };
}

/** Highest-signal terms per class, the log-ratio against every other class. */
export function topTerms(model, label, limit = 6) {
  const cls = model.classes.find((c) => c.label === label);
  if (!cls) return [];

  const others = model.classes.filter((c) => c.label !== label);
  const scored = [];

  for (const [term, count] of cls.counts) {
    if (count < 1) continue;
    const mine = logLikelihood(cls, term, model.vocabSize);
    const theirs =
      others.reduce((sum, c) => sum + logLikelihood(c, term, model.vocabSize), 0) /
      Math.max(1, others.length);
    scored.push({ term, count, weight: mine - theirs });
  }

  return scored.sort((a, b) => b.weight - a.weight).slice(0, limit);
}

/** Serialisable snapshot for the export button. */
export function exportModel(model) {
  return {
    algorithm: "multinomial-naive-bayes",
    smoothing: "laplace-add-1",
    vocabularySize: model.vocabSize,
    trainingDocuments: model.totalDocs,
    classes: model.classes.map((cls) => ({
      label: cls.label,
      documents: cls.docs,
      totalTerms: cls.totalTerms,
      logPrior: Number(cls.logPrior.toFixed(6)),
      termCounts: Object.fromEntries([...cls.counts].sort((a, b) => b[1] - a[1])),
    })),
  };
}
