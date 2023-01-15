/**
 * generate link for 3rd party downloader to download
 */
const generateLink = () => {
  const dir = Deno.readDirSync("./original/contents");
  for (const file of dir) {
    const name = file.name.replace(".json", "");
    const contents = JSON.parse(
      Deno.readTextFileSync("./original/contents/" + file.name),
    );

    //@ts-ignore any
    const links = contents.map((content) => {
      const { previewPath, title, captions, thumbnailPath }: {
        previewPath: string;
        title: string;
        thumbnailPath: string;
        captions: {
          lang: string;
          path: string;
        }[];
      } = content;
      // convert link
      const convertedLink = previewPath.replace("converted/", "").replace(
        /\/preview\/.*/,
        "",
      );
      const captionLinks = captions.map((caption) => caption.path);
      const thumbnailLink = thumbnailPath.replace("w100", "w300");

      // map hash to title
      const videoHash = convertedLink.replace(/(.*)\/(.*).mp4/, "$2");
      const thumbnailHash = thumbnailLink.replace(/(.*)\/(.*).(jpg|png)(.*)/, "$2");

      const mapping = captions.map((caption) => {
        const { lang, path } = caption;
        const captionsHash = path.replace(/(.*)\/(.*).vtt/, "$2");
        return {
          [captionsHash]: `${title}.${lang}.vtt`,
        };
      });
      mapping.push({
        [videoHash]: `${title}.mp4`,
      });
      console.log(thumbnailHash);

      mapping.push({
        [thumbnailHash]: `${title}.jpg`,
      });

      return [convertedLink + `\n${captionLinks.join("\n")}`, mapping];
    });

    // https://deno.land/std@0.172.0/fs/mod.ts?s=exists
    try {
      Deno.mkdirSync(`./link/original/${name}`, { recursive: true });
    } catch (error) {
      if (!(error instanceof Deno.errors.AlreadyExists)) {
        // file already exists, ignore
      }
    }

    // for downloader
    //@ts-ignore any
    const downloadLinks = links.map((link) => link[0]);
    Deno.writeFileSync(
      `./link/original/${name}/` + name + ".txt",
      new TextEncoder().encode(downloadLinks.join("\n")),
    );

    // for rename
    //@ts-ignore any
    const mappingLinks = links.map((link) => link[1]).flat();
    Deno.writeFileSync(
      `./link/original/${name}/` + name + ".json",
      new TextEncoder().encode(JSON.stringify(mappingLinks, null, 2)),
    );
  }
};

generateLink();
