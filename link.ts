/**
 * generate link for 3rd party downloader to download
 */
const generateLink = () => {
  const dir = Deno.readDirSync("./original/contents");
  for (const file of dir) {
    const name = file.name.split(".")[0];
    const contents = JSON.parse(
      Deno.readTextFileSync("./original/contents/" + file.name),
    );
    //@ts-ignore any
    const links = contents.map((content) => content.previewPath) as string[];

    //change to original link
    const convertedLinks = links.map((link) => {
      // before
      // https://d1ksgh4vgfm8hg.cloudfront.net/converted/5/3/4/32553025-07c0-4ab5-b173-f09141b887cf.mp4/preview/32553025-07c0-4ab5-b173-f09141b887cfmaster.m3u8
      // after
      // https://d1ksgh4vgfm8hg.cloudfront.net/5/3/4/32553025-07c0-4ab5-b173-f09141b887cf.mp4
      return link.replace("converted/", "").replace(/\/preview\/.*/, "");
    });

    // https://deno.land/std@0.172.0/fs/mod.ts?s=exists
    try {
      Deno.mkdirSync(`./link/original/${name}`);
    } catch (error) {
      if (!(error instanceof Deno.errors.AlreadyExists)) {
        // file already exists, ignore
      }
    }

    Deno.writeFileSync(
      `./link/original/${name}/` + file.name.split(".")[0] + ".txt",
      new TextEncoder().encode(convertedLinks.join("\n")),
    );
  }
};

generateLink();
