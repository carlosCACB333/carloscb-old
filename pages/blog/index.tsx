import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect } from "react";
import { BlogHome, BlogList, BlogRight } from "../../components/Blog";
import { Meta, ProfileAside } from "../../components/common";
import { LayoutContext } from "../../context";
import {
  Category,
  GetBlogsDataDocument,
  Post,
  Skill,
  Stage,
} from "../../graphql";
import { client } from "../../utils/apolloClient";

interface Props {
  posts: Post[];
  categories: Category[];
  tags: Skill[];
}
const BlogPageMain: NextPage<Props> = ({ posts, categories, tags }) => {
  const { setLayouts } = useContext(LayoutContext);

  useEffect(() => {
    setLayouts(
      <ProfileAside />,
      <BlogRight
        categories={categories}
        tags={tags}
        posts={posts}
        isDetail={false}
      />
    );
  }, [categories, posts, setLayouts, tags]);

  return (
    <>
      <Meta
        title="Blog"
        description="Los blog post de desarrollo de software más interesantes"
      />
      <BlogHome categories={categories} posts={posts} />
      <BlogList
        posts={posts}
        categories={categories}
        tags={tags}
        filteredPosts={posts}
      />
    </>
  );
};

export default BlogPageMain;

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const i18n = await serverSideTranslations(locale || "es", ["common"]);
  const { data } = await client.query({
    query: GetBlogsDataDocument,
    variables: {
      stage: preview ? Stage.Draft : Stage.Published,
    },
  });

  return {
    props: {
      ...i18n,
      posts: data.posts,
      categories: data.categories,
      tags: data.skills,
    },
    revalidate: 3600,
  };
};
