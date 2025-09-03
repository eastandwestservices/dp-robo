import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // simple heuristic: Vercel provides x-vercel-ip-country header in req.headers
  const country = (req.headers["x-vercel-ip-country"] || "US") as string;
  const currencyMap: Record<string, string> = {
    US: "USD",
    DE: "EUR",
    FR: "EUR",
    IT: "EUR",
    ES: "EUR",
    JP: "JPY",
    CA: "CAD",
    AU: "AUD",
    NZ: "NZD",
  };
  const currency = currencyMap[country] || "USD";
  res.status(200).json({ country, currency, locale: country === "JP" ? "ja-JP" : "en-US" });
}
