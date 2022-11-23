import { Box, useTheme } from '@mui/material';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import { Prism } from 'react-syntax-highlighter';
import { useWidth } from '../../hooks/useWidth';
import { getCodeTheme } from '../../theme';

interface Props extends ReactMarkdownOptions {}
export const Md: FC<Props> = ({ children, ...props }) => {
  const { palette } = useTheme();
  const { ref, width } = useWidth();

  return (
    <Box ref={ref} sx={{ width: '100%' }}>
      {width > 0 && (
        <Box sx={{ maxWidth: width }}>
          <ReactMarkdown
            {...props}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <Prism
                    style={getCodeTheme(palette.mode) as any}
                    customStyle={{
                      backgroundColor: palette.background.paper,
                      borderRadius: '0.5rem',
                    }}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </Prism>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {children}
          </ReactMarkdown>
        </Box>
      )}
    </Box>
  );
};
