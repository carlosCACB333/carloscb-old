import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { LoaderGrid } from '../components/UI';
import { Author, GetAuthorDocument, Locale } from '../graphql/generated/graphql';
import { env } from '../utils/env';
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

  if (loading) return <LoaderGrid />;
  if (!data?.author) return <Typography>Author not found</Typography>;
  const author = data.author as Author;

  return <AuthorContext.Provider value={{ author }}>{children}</AuthorContext.Provider>;
};
