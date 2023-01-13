import { baseUrls, fetcher } from "../utils.ts";

import allPhoto from "./photoSeries-ALL.json" assert { type: "json" };

export const backupDetailPhotos = async () => {
  for (const photo of allPhoto) {
    console.log("current series:", photo.title);
    const url1 = new URL(`${baseUrls.PHOTO}/${photo.seriesId}`);
    const { photos } = await fetcher(url1);
    console.log("got", photos.length, "contents");

    Deno.writeFileSync(
      `./photos/contents/[${photo.seriesId}]${photo.title}.json`,
      new TextEncoder().encode(JSON.stringify(photos, null, 2)),
    );
  }
};