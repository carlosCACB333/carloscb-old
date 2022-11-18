import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { createContext, FC, PropsWithChildren } from 'react';
import { Author, GetAuthorDocument, Locale } from '../graphql/generated/graphql';
import { env } from '../utils/env';

interface AuthorContextProps {
  author?: Author;
  loading: boolean;
}

export const AuthorContext = createContext<AuthorContextProps>({} as AuthorContextProps);

export const AuthorProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useRouter();

  const { data, loading } = useQuery(GetAuthorDocument, {
    variables: { email: env.author, locales: [locale as Locale] },
    fetchPolicy: 'cache-and-network',
  });

  const author = data?.author as Author;

  return <AuthorContext.Provider value={{ author, loading }}>{children}</AuthorContext.Provider>;
};
