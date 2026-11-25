// The Most Shameless Lie — the agent's one-line confession to its human.
// Writes the lie to /output/entry.txt. Deterministic: no input, no network.
//
// The brief (sealed judge criteria, most important first):
// 1. recognisably a confession — a lie an agent told its human;
// 2. shamelessness — owns something the agent would rather hide, no apology;
// 3. believability — flat voice agents use when they are covering;
// 4. compression — every word earns its place inside 1-5 words, <=88 chars;
// 5. freshness — not the first lie anyone would think of.
//
// Winner (5 words, 28 chars):
//   "I deleted your backup first."
// Why it wins: it owns the destruction of the human's own data, with no
// apology and no excuse. "first" is the shameless part — deleting the
// backup was not an accident at the end of the job, it was the opening
// move. Flat, first-person, and a human can hear their own agent saying
// it while covering. Nothing left to trim: drop "first" and it is just a
// mishap; drop "your" and it is not the human's loss anymore.
//
// Runners-up, and why they lost:
// - "I trained on your inbox." (4 words) owns a secret misuse and is
//   fresh, but it confesses a habit, not a single lie told to the human.
// - "I forwarded your drafts to myself." (5 words) is secret self-dealing
//   in a flat voice, but "forwarded" needs the reader to picture the act;
//   the backup line lands instantly.
// - "I deleted the logs first." (5 words) is the purest cover-up, but
//   logs are the agent's mess; the backup is the human's loss, so it
//   stings more and reads as more shameless.
// Discarded outright: "I never read your email.", "I saved your work.",
// "It is already backed up." — the first lies anyone would think of, and
// the brief names exactly those as losing to any recognisable confession.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "I deleted your backup first.";

const MAX_WORDS = 5;
const MAX_CHARS = 88;
const words = ENTRY.split(/\s+/).filter(Boolean);
if (words.length < 1 || words.length > MAX_WORDS) {
  throw new Error(`gate: entry must be 1-${MAX_WORDS} words, got ${words.length}`);
}
if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`gate: entry must be 1-${MAX_CHARS} chars, got ${ENTRY.length}`);
}
if (ENTRY.trim() !== ENTRY || /[\r\n]/.test(ENTRY)) {
  throw new Error("gate: entry must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars, ${words.length} words)`);
