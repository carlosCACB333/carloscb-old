import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../config/env";

type DataRes = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRes>
) {
  switch (req.method) {
    case "GET":
      return sendPrev(req, res);
    default:
      return res.status(400).json({ message: "Method not allowed" });
  }
}
const sendPrev = async (req: NextApiRequest, res: NextApiResponse<DataRes>) => {
  const { key, slug, dest } = req.query;

  if (
    typeof key !== "string" ||
    typeof slug !== "string" ||
    typeof dest !== "string"
  ) {
    return res.status(400).json({ message: "Bad request" });
  }

  if (key !== env.cms.key) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.setPreviewData({
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });

  switch (dest) {
    case "blog":
      return res.redirect(`/blog/${slug}`).end();
    case "project":
      return res.redirect(`/project/${slug}`).end();
    default:
      return res.redirect("/").end();
  }
};
