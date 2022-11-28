import {
  Box,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import { useWidth } from '../../hooks';
import { themePalette } from '../../theme';
import { Link } from './Link';

interface Props extends ReactMarkdownOptions {}
export const Md: FC<Props> = ({ children, ...props }) => {
  const { ref, width } = useWidth();
  return (
    <Box sx={{ width: '100%' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        {...props}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <Card
                sx={{
                  backgroundColor: themePalette('dark').background?.paper,
                }}
              >
                <CardContent>
                  <Box className="scroll" ref={ref}>
                    <Prism
                      style={vscDarkPlus as any}
                      customStyle={{
                        backgroundColor: 'transparent',
                        padding: 0,
                        margin: 0,
                        maxWidth: width,
                        overflow: 'initial',
                      }}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                      codeTagProps={{
                        style: {
                          fontSize: '1rem',
                        },
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </Prism>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },

          p: (props) => <Typography variant="body1" {...props} />,
          h1: (props) => <Typography variant="h1" {...props} />,
          h2: (props) => <Typography variant="h2" {...props} />,
          h3: (props) => <Typography variant="h3" {...props} />,
          h4: (props) => <Typography variant="h4" {...props} />,
          h5: (props) => <Typography variant="h5" {...props} />,
          h6: (props) => <Typography variant="h6" {...props} />,
          a: ({ href = '#', ...props }) => <Link href={href} {...props} color="primary.main" />,
          table: ({ children, style }) => (
            <TableContainer>
              <Table style={style}>{children}</Table>
            </TableContainer>
          ),
          thead: (props) => <TableHead {...props} />,
          tbody: (props) => <TableBody {...props} />,
          tfoot: (props) => <TableFooter {...props} />,
          tr: ({ children, style }) => (
            <TableRow style={style} sx={{ '&:last-child td': { border: 0 } }}>
              {children}
            </TableRow>
          ),
          td: ({ children, style }) => <TableCell style={style}>{children}</TableCell>,
          th: ({ children, style }) => <TableCell style={style}>{children}</TableCell>,
          hr: () => <Divider sx={{ my: 2 }} />,
          blockquote: ({ children }) => (
            <Box
              sx={{
                p: 0,
                position: 'relative',
                ml: '4rem',
                ':before': {
                  content: '"“"',
                  fontSize: '4rem',
                  lineHeight: 0,
                  position: 'absolute',
                  left: '-2rem',
                  top: '1.5rem',
                  color: 'text.secondary',
                  fontFamily: 'Georgia, serif',
                },
              }}
              component="blockquote"
            >
              {children}
            </Box>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
};
