/**
 * give filename to downloaded file
 */

const contents = Deno.readDirSync("./link/original/");
for (const content of contents) {
  const filename = content.name;

  const mappings = JSON.parse(
    Deno.readTextFileSync(`./link/original/${filename}/${filename}.json`),
  );

  for (const mapping of mappings) {
    const [hash, name] = Object.entries(mapping)[0];

    // ......
    try {
      Deno.renameSync(
        `./link/original/${filename}/${hash}.mp4`,
        `./link/original/${filename}/${name}`,
      );
    } catch (_e) {
      // ignore
    }
    try {
      Deno.renameSync(
        `./link/original/${filename}/${hash}.jpg`,
        `./link/original/${filename}/${name}`,
      );
    } catch (_e) {
      // ignore
    }
    try {
      Deno.renameSync(
        `./link/original/${filename}/${hash}.png`,
        `./link/original/${filename}/${name}`,
      );
    } catch (_e) {
      // ignore
    }
    try {
      Deno.renameSync(
        `./link/original/${filename}/${hash}.vtt`,
        `./link/original/${filename}/${name}`,
      );
    } catch (_e) {
      // ignore
    }
  }
}
