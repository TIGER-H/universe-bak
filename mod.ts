import { backupFns, backupOriginals, backupPhotos } from "./op.ts";

Deno.removeSync('./log.md');
const [opt] = Deno.args;

switch (opt) {
  case "fns":
    {
      await backupFns();
      break;
    }
  case "photo":
    {
      await backupPhotos();
      break;
    }

  case "original":
    {
      await backupOriginals();
      break;
    }
  default:
    await Promise.all([backupFns(), backupPhotos(), backupOriginals()]);
}

/**
 * add header to markdown table
 */
const txt = Deno.readTextFileSync('./log.md');

const markdownHeader = `| Type | Name | Count | UpdateDate |\n| ---- | ---- | ----- | ---- |\n`;
const sorted = txt.split("\n").filter(str => str !== "").sort();
Deno.writeFileSync('./log.md', new TextEncoder().encode(markdownHeader + sorted.join('\n')), { append: false })

