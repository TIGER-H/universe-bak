import { baseUrls, fetcher } from "../utils.ts";

import originals from "./original-ALL.json" assert { type: "json" };

export const backupDetailOriginals = async () => {
  for (const original of originals) {
    console.log("current series:", original.title);
    const url1 = new URL(`${baseUrls.ORIGINAL}/${original.seriesId}`);
    const data = await fetcher(url1);
    const contentsId = data.contentsList[0].contentsId;
    const url2 = new URL(`${url1}/contents/${contentsId}`);
    const { contentsList } = await fetcher(url2);
    console.log("got", contentsList.length, "contents");

    Deno.writeFileSync(
      `./original/contents/[${original.seriesId}]${original.title}.json`,
      new TextEncoder().encode(JSON.stringify(contentsList, null, 2)),
    );
  }
};
