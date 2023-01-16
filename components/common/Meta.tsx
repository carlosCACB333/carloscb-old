import Head from "next/head";
import { FC, PropsWithChildren, useContext } from "react";
import { AuthorContext } from "../../context";
import { Author } from "../../graphql/generated/graphql";
import { env } from "../../config/env";

interface MetaProps extends PropsWithChildren {
  title?: string;
  description?: string;
  author?: Author;
  keywords?: string;
}

export const Meta: FC<MetaProps> = ({
  author: aut,
  description,
  title: t,
  children,
  keywords: k,
}) => {
  const { author: a } = useContext(AuthorContext);
  const author = aut || a;

  const fullName = author && `${author.firstName} ${author.lastName}`;
  const title = t || fullName || "Carlos Castillo Blas";
  const desc =
    description || author?.bio || fullName || "Mi portafolio personal y mi cv";
  const keywords =
    k ||
    author?.keywords?.join(",") ||
    "portafolio, cv, ingeniero, sistemas, software, programdor, desarrollador, fullstack";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="author" content={fullName || "Carlos Castillo Blas"} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta
        property="og:image"
        content={author?.photos[0].url || "/logo.svg"}
      />
      <meta property="og:site_name" content="carloscb" />
      <meta property="og:url" content={env.baseUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es" />
      <meta property="og:locale:alternate" content="en" />
      {children}
    </Head>
  );
};
