// import fs from "fs"
// import { Reader, CityResponse } from "maxmind"
// export const lookup = new Reader<CityResponse>(fs.readFileSync("./src/lib/ip-city.mmdb"))

/**
 * Reading local database files isn't supported on vercel. so IP lookups won't work
 */
