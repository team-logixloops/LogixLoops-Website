/**
 * Lets `node --test` load the app's own modules the way Next does: resolves
 * the `@/` alias from jsconfig.json, and the extensionless relative imports
 * (`./constants`) that Node's ESM loader otherwise rejects.
 */
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = fileURLToPath(new URL("../src", import.meta.url));

function withExtension(file) {
  if (path.extname(file)) return file;
  for (const candidate of [`${file}.js`, path.join(file, "index.js")]) {
    if (existsSync(candidate)) return candidate;
  }
  return file;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const file = withExtension(path.join(SRC, specifier.slice(2)));
      return nextResolve(pathToFileURL(file).href, context);
    }
    if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
      // Resolve against the URL, not `path.dirname` of it: the test runner's
      // child processes import this file relative to the cwd, whose URL is a
      // directory ("file:///E:/repo/"), and dirname would drop a level.
      const file = withExtension(fileURLToPath(new URL(specifier, context.parentURL)));
      return nextResolve(pathToFileURL(file).href, context);
    }
    return nextResolve(specifier, context);
  },
});
