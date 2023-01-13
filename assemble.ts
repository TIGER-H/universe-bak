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
    const hash = path.split("/").at(-1).split(".")[0];

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
