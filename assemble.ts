/**
 * give filename to downloaded file
 */

const contents = Deno.readDirSync("./link/original/");
for (const content of contents) {
  const filename = content.name;

  const contentsJSON = JSON.parse(
    Deno.readTextFileSync(`./original/contents/${filename}.json`),
  );

  for (const detail of contentsJSON) {
    const { title, path } = detail;
    // find hash from url like this
    // https://d1ksgh4vgfm8hg.cloudfront.net/converted/2022/12/14/jHcPIBZJLxshZR3U8jG3NA.mp4/preview/jHcPIBZJLxshZR3U8jG3NAmaster.m3u8
    // after:
    // jHcPIBZJLxshZR3U8jG3NA
    const hash = path.split(".mp4")[0].split("/").pop() as string;

    const targetDir = Deno.readDirSync(`./link/original/${filename}`);
    for (const file of targetDir) {
      if (file.name.startsWith(hash)) {
        // rename
        const [_oldname, ...ext] = file.name.split(".");
        Deno.renameSync(
          `./link/original/${filename}/${file.name}`,
          `./link/original/${filename}/${title}.${ext.join(".")}`,
        );
      }
    }
  }
}
