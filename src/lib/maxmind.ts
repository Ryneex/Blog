import fs from "fs"
import { Reader, CityResponse } from "maxmind"
export const lookup = new Reader<CityResponse>(fs.readFileSync("./src/lib/ip-city.mmdb"))
