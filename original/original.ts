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
      "./original/contents/" + original.seriesId + ".json",
      new TextEncoder().encode(JSON.stringify(contentsList, null, 2)),
    );
  }
};

// const generateDlink = () => {
//   const dir = Deno.readDirSync('./original/contents');
//   for (const file of dir) {
//     const contents = JSON.parse(Deno.readTextFileSync('./original/contents/' + file.name));
//     //@ts-ignore any
//     const dlink = contents.map(content => content.path);
//     Deno.writeFileSync('./original/dlink/' + file.name.split(".")[0] + ".txt", new TextEncoder().encode(dlink.join("\n")));
//   }
// };

// generateDlink();
