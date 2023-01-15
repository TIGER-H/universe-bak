/**
 * give filename to downloaded file
 */

const contents = Deno.readDirSync("./link/original/");
for (const content of contents) {
  const filename = content.name;

  const mappings = JSON.parse(
    Deno.readTextFileSync(`./link/original/${filename}/${filename}.json`)
  );

  for (const mapping of mappings) {
    const [hash, name] = Object.entries(mapping)[0];
    try {
      Deno.renameSync(
        `./link/original/${filename}/${hash} [${hash}].mp4`,
        `./link/original/${filename}/${name}`,
      );
    } catch (e) {
      console.error(e);
    }
  }

}

