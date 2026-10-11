import fs from "node:fs";
import path from "node:path";

/** True when a file exists in /public. Checked at build time, so dropping in a photo or CV just works. */
export function publicFileExists(publicPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}
