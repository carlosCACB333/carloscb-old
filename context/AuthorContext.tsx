import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { Loader, LoaderGrid } from '../components/UI';
import { Author, GetAuthorDocument, Locale } from '../graphql/generated/graphql';
import { env } from '../utils/env';
import { mdToHtml } from '../utils/mdToHtml';
import { Typography } from '@mui/material';

interface AuthorContextProps {
  author: Author;
}

export const AuthorContext = createContext<AuthorContextProps>({} as AuthorContextProps);

export const AuthorProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useRouter();

  const { data, loading } = useQuery(GetAuthorDocument, {
    variables: { email: env.author, locales: [locale as Locale] },
    fetchPolicy: 'cache-and-network',
  });
  const [bio, setBio] = useState('');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!data?.author?.bio) {
      setFinished(true);
      return;
    }
    mdToHtml(data.author.bio)
      .then((html) => {
        setBio(html);
      })
      .catch(console.log)
      .finally(() => setFinished(true));
  }, [loading]);

  if (!finished) return <LoaderGrid />;
  if (!data?.author) return <Typography>Author not found</Typography>;

  const author = data.author as Author;

  return <AuthorContext.Provider value={{ author: { ...author, bio } }}>{children}</AuthorContext.Provider>;
};
