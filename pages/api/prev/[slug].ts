import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../utils/env';

type DataRes = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<DataRes>) {
  switch (req.method) {
    case 'GET':
      return sendPrev(req, res);
    default:
      return res.status(400).json({ message: 'Method not allowed' });
  }
}
const sendPrev = async (req: NextApiRequest, res: NextApiResponse<DataRes>) => {
  const { slug, key } = req.query;
  if (typeof slug !== 'string' || typeof key !== 'string') {
    return res.status(400).json({ message: 'Bad request' });
  }

  if (key !== env.cms.key) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.setPreviewData({});
  res.redirect(`/project/${slug}`).end();
};
