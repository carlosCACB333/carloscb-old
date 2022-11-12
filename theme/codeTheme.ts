import { vscDarkPlus, prism as vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const getCodeTheme = (theme: string) => {
  if (theme === 'dark') {
    return {
      ...vscDarkPlus,
      'pre[class*="language-"]': {
        ...vscDarkPlus['pre[class*="language-"]'],
      },
      'code[class*="language-"]': {
        ...vscDarkPlus["code[class*='language-']"],
        fontSize: '1rem',
      },
    };
  }
  return {
    ...vs,
    'pre[class*="language-"]': {
      ...vs['pre[class*="language-"]'],
    },
    'code[class*="language-"]': {
      ...vs["code[class*='language-']"],
      fontSize: '1rem',
    },
  };
};
