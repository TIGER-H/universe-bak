import { backupFns, backupOriginals, backupPhotos } from "./op.ts";

const [opt] = Deno.args;

switch (opt) {
  case "fns":
    {
      await backupFns();
      break;
    }
  case "photo":
    {
      await backupPhotos();
      break;
    }

  case "original":
    {
      await backupOriginals();
      break;
    }
  default:
    await Promise.all([backupFns(), backupPhotos(), backupOriginals()]);
}

