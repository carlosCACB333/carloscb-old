import { ArrowBackIos } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { MDX, Toc } from "../../interfaces";
import { client } from "../../utils/apolloClient";
import { serializeStrMdx } from "../../utils/mdx";
import { ContentMenu } from "../../components/common/ContentMenu";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { BlogCard2, BlogRight } from "../../components/Blog";
import { SkillGroup } from "../../components/category/SkillGroup";
import { SectionLayout } from "../../components/layouts";
import { LayoutContext } from "../../context";
import { Meta, HygraphImg, ProfileAside } from "../../components/common";
import {
  Category,
  GetBlogsDataDocument,
  GetPostsSlugDocument,
  Post,
  Stage,
} from "../../graphql";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { MDXComponents } from "../../components/MD";

interface Props {
  posts: Post[];
  post: Post;
  categories: Category[];
  similarPosts: Post[];
  source: MDX;
  toc: Toc[];
}
const BlogDetailPage: NextPage<Props> = ({
  posts,
  categories,
  post,
  similarPosts,
  source,
  toc,
}) => {
  const { palette, breakpoints } = useTheme();
  const { back } = useRouter();
  const isLgUp = useMediaQuery(breakpoints.up("lg"));

  const { setLayouts } = useContext(LayoutContext);

  useEffect(() => {
    setLayouts(
      <ProfileAside />,
      <>
        <ContentMenu toc={toc} />
        <BlogRight
          categories={categories}
          posts={posts}
          isDetail
          tags={post.tags}
        />
      </>
    );
  }, [categories, post.tags, posts, setLayouts, toc]);

  return (
    <>
      <Meta title={post.title} description={post.summary}>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={post.banner?.url || "/logo.svg"} />
      </Meta>

      <Box
        sx={{
          aspectRatio: isLgUp ? "16/6" : "5/4",
          position: "relative",
        }}
      >
        <HygraphImg
          src={post.banner?.url!}
          alt={post.title}
          fit="crop"
          aspRatio={isLgUp ? 16 / 6 : 5 / 4}
          priority
        />
        <Box
          sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0) 0%, ${palette.background.default} 90%)`,
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
            zIndex: 10,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              height: "100%",
            }}
          >
            <SkillGroup skills={post.tags} />
            <Typography variant="h1">{post.title}</Typography>
            <Typography variant="subtitle1">
              {new Date(post.updatedAt).toLocaleDateString("es-PE", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <div>
              <br />
              <Button
                onClick={back}
                startIcon={<ArrowBackIos />}
                variant="text"
                aria-label="Volver al blog"
              >
                volver
              </Button>
            </div>
          </Container>
        </Box>
      </Box>
      <SectionLayout maxWidth="md">
        <Box>
          <Typography
            gutterBottom
            sx={{ fontWeight: 400 }}
            className="first-letter"
          >
            {post.summary}
          </Typography>
          <br />
          <MDXRemote {...source} components={MDXComponents} />
          <br />
          <br />

          <Card>
            <CardContent
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src={post.createdBy?.picture!}
                alt={post.createdBy?.name}
                sx={{ height: 100, width: 100 }}
              />
              <Typography variant="h5" component="h2" gutterBottom>
                {post.createdBy?.name}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <br />
        <br />
        <Divider />
        <br />
        <br />

        <Typography variant="h2" gutterBottom>
          Artículos relacionados ({similarPosts.length})
        </Typography>

        <Grid container spacing={1}>
          {similarPosts.map((post) => (
            <Grid xs={12} sm={6} md={3} lg={4} key={post.id}>
              <BlogCard2 post={post} />
            </Grid>
          ))}
        </Grid>
      </SectionLayout>
    </>
  );
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps = async ({
  locale,
  params,
  preview,
}) => {
  const i18n = await serverSideTranslations(locale || "es", ["common"]);
  const { data } = await client.query({
    query: GetBlogsDataDocument,
    variables: {
      stage: preview ? Stage.Draft : Stage.Published,
    },
  });
  const post = data.posts.find((post) => post.slug === params?.slug) as Post;
  if (!post) {
    return {
      notFound: true,
    };
  }
  const { source, toc } = await serializeStrMdx(post.content);

  const tags = post.tags.map((tag) => tag.name);
  const similarPosts = data.posts.filter((p) => {
    const postTags = p.tags.map((tag) => tag.name);
    return postTags.some((tag) => tags.includes(tag)) && p.id !== post.id;
  }) as Post[];

  return {
    props: {
      ...i18n,
      posts: data.posts,
      categories: data.categories,
      similarPosts,
      post,
      source,
      toc,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GetPostsSlugDocument });
  const paths = data.posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: "blocking" };
};
