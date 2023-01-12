import { artistUserId, headers, photoCategoryId, baseUrls, originalType, generateUrl } from "./utils.ts";

/**
 * PHOTO
 */
export const photoUrls = generateUrl(baseUrls.PHOTO, photoCategoryId, "categoryId");

/**
 * ORIGINAL
 */
export const originalUrls = generateUrl(baseUrls.ORIGINAL, originalType, "type");

/**
 * FNS
 * 
 */
export const fnsUrls = generateUrl(baseUrls.FNS, artistUserId, "artistUserIds");

export const backup = async (metaType: "FNS" | "PHOTO" | "ORIGINAL", params: [string, URL]) => {
  const [name, url] = params;
  console.log("backup", `[${metaType}]:`, name);

  let cnt = 0;
  const meta = [];
  let isEnd = false;
  let nextCursor = null;
  while (true) {
    if (isEnd) break;
    if (nextCursor) {
      url.searchParams.set("cursor", nextCursor);
    }
    const resp = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    const data = await resp.json();
    cnt += data.seriesList ? data.seriesList.length : data.posts.length;
    console.log("got", cnt);

    switch (metaType) {
      case "FNS":
        {
          //@ts-ignore: ignore any & drop some properties
          const trimmedPost = data.posts.map(post => {
            // deno-lint-ignore no-unused-vars
            const { writer, comments, ...others } = post;
            const { commentTotalCount, ..._drop } = comments || { commentTotalCount: -1 };

            // drop writer and pagedComment
            return {
              ...others,
              comments: { commentTotalCount }
            };
          });
          meta.push(...trimmedPost);
          break;
        }
      default: {
        meta.push(...data.seriesList);
      }
    }

    if (!data.nextCursor) {
      isEnd = true;
    }
    nextCursor = data.nextCursor;
  }

  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(JSON.stringify(meta, null, 2));

  switch (metaType) {
    case "PHOTO":
      {
        Deno.writeFileSync(`./photos/photoSeries-${name}.json`, data);
        break;
      }
    case "ORIGINAL":
      {
        Deno.writeFileSync(`./original/original-${name}.json`, data);
        break;
      }
    case "FNS":
      {
        Deno.writeFileSync(`./artist-board/${name}.json`, data);
        break;
      }
  }
  Deno.writeFileSync('./log.txt', textEncoder.encode(`[${metaType}]\t[${name}]\t[${cnt}]\t${new Date().toISOString()}\n`), {
    append: true,
  });
  console.log("DONE", `[${metaType}]: `, name, cnt);
};

export const backupFns = async () => {
  for (const [name, url] of Object.entries(fnsUrls)) {
    await backup("FNS", [name, url]);
  }
};

export const backupPhotos = async () => {
  for (const [name, url] of Object.entries(photoUrls)) {
    await backup("PHOTO", [name, url]);
  }
};

export const backupOriginals = async () => {
  for (const [name, url] of Object.entries(originalUrls)) {
    await backup("ORIGINAL", [name, url]);
  }
};
