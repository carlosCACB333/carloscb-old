export const env = {
  cms: {
    url: process.env.NEXT_PUBLIC_GRAPHCMS || '',
    token: process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN || '',
    key: process.env.GRAPHCMS_KEY,
  },
  author: process.env.NEXT_PUBLIC_AUTHOR || '',
  email: {
    api: process.env.EMAIL_API || '',
    from: process.env.EMAIL_FROM || '',
  },
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
};
