import { FC, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import { getCodeTheme } from '../../theme';
import { Box, useTheme } from '@mui/material';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

interface Props extends ReactMarkdownOptions {}
export const Md: FC<Props> = ({ children, ...props }) => {
  const { palette } = useTheme();
  const divRef = useRef<HTMLDivElement>();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const getWidth = () => {
      if (divRef.current) {
        setWidth(divRef.current.offsetWidth);
      }
    };
    getWidth();
    window.addEventListener('resize', getWidth);
    return () => window.removeEventListener('resize', getWidth);
  }, []);

  return (
    <Box ref={divRef} sx={{ width: '100%' }}>
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
