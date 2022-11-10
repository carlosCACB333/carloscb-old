import type { NextApiRequest, NextApiResponse } from 'next';
type DataRes = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<DataRes>) {
  switch (req.method) {
    case 'GET':
      return clearPreview(req, res);
    default:
      return res.status(400).json({ message: 'Method not allowed' });
  }
}

const clearPreview = async (req: NextApiRequest, res: NextApiResponse<DataRes>) => {
  const url = req.query.url as string;
  res.clearPreviewData({});
  res.redirect(url).end();
};
