import "https://deno.land/std@0.171.0/dotenv/load.ts";

const token = Deno.env.get("TOKEN");
if (!token) {
  throw new Error("TOKEN not found");
}
export const headers = new Headers({
  Host: "api.nc-universe.io",
  "Content-Type": "application/json",
  Accept: "*/*",
  "X-Uni-App-User-Agent": "en:CN:1.2.0:I:16.1.1:iPhone10,6",
  "User-Agent":
    "UNIVERSE/1.2.0 (com.ncsoft.universeapp; build:3; iOS 16.1.1) Alamofire/5.6.2",
  "Accept-Language": "en-CN;q=1.0, zh-Hans-CN;q=0.9",
  Authorization: `Bearer ${token}`,
});

export const baseUrls = {
  PHOTO: "https://api.nc-universe.io/planet/v1/planets/4/media/photos",
  ORIGINAL: "https://api.nc-universe.io/planet/v1/planets/4/media/originals",
  FNS: "https://api.nc-universe.io/board/v1/planets/4/artist-board/posts",
};

export const photoCategoryId = {
  ALL: 0,
  ORIGINAL: 7,
  BEHIND: 8
};

export const originalType = {
  ALL: "",
  AUDIO: "AUDIO",
  VOD: "VOD"
};

export const WJSN = [
  "SEOLA",
  "BONA",
  "LUDA",
  "DAWON",
  "EXY",
  "SOOBIN",
  "EUNSEO",
  "YEOREUM",
  "DAYOUNG",
  "YEONJUNG",
];

export const artistUserId = {
  SEOLA: "2035721064356647380",
  BONA: "1954826911742415627",
  LUDA: "5069355247244392972",
  DAWON: "243014384239662066",
  EXY: "6095974143187636578",
  SOOBIN: "8655334370561676568",
  EUNSEO: "5463839564935826332",
  YEOREUM: "7077585596836504415",
  DAYOUNG: "6035978306678903507",
  YEONJUNG: "5926199399463284549"
};

export const generateUrl = (base: string, o: { [k in string]: string | number }, param: string) => {
  const urls = {};
  for (const [key, value] of Object.entries(o)) {
    const url = new URL(base);
    if (value) {
      url.searchParams.set(param, value.toString());
    }
    Object.assign(urls, { [key]: url });
  }

  return urls as { [k in string]: URL };
};