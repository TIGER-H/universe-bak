import { backupFns, backupOriginals, backupPhotos } from "./op.ts";
import { backupDetailOriginals } from "./original/original.ts";
import { backupDetailPhotos } from "./photos/photo.ts";

const [opt] = Deno.args;
if (opt !== "nometa") {
  Deno.removeSync("./log.md");
}

/**
 * meta: artist-board & media(original+photo) meta
 * nometa: detailed original
 */

switch (opt) {
  case "nometa": {
    await backupDetailOriginals();
    await backupDetailPhotos();
    Deno.exit();
    break;
  }
  case "fns": {
    await backupFns();
    break;
  }
  case "photo": {
    await backupPhotos();
    break;
  }

  case "original": {
    await backupOriginals();
    break;
  }
  case "all":
  default:
    await Promise.all([backupFns(), backupPhotos(), backupOriginals()]);
}

/**
 * add header to markdown table
 */
const txt = Deno.readTextFileSync("./log.md");

const markdownHeader =
  `| Type | Name | Count | UpdateDate |\n| ---- | ---- | ----- | ---- |\n`;
const sorted = txt.split("\n").filter((str) => str !== "").sort();
Deno.writeFileSync(
  "./log.md",
  new TextEncoder().encode(markdownHeader + sorted.join("\n")),
  { append: false },
);
