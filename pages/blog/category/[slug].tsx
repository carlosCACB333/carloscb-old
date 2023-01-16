import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect } from "react";
import { BlogHome, BlogList, BlogRight } from "../../../components/Blog";
import { Meta, ProfileAside } from "../../../components/common";
import { LayoutContext } from "../../../context";
import {
  Category,
  GetBlogsByCategoryDocument,
  GetCategoriesSlugDocument,
  Post,
  Skill,
  Stage,
} from "../../../graphql";
import { client } from "../../../utils/apolloClient";

interface Props {
  posts: Post[];
  filteredPosts: Post[];
  categories: Category[];
  tags: Skill[];
}
const PostByCategory: NextPage<Props> = ({
  posts,
  categories,
  tags,
  filteredPosts,
}) => {
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
        title="Blog | categorías"
        description={`Los blog post de desarrollo de software más interesantes agrupados por las distintas categorías`}
      />
      <BlogHome categories={categories} posts={posts} />

      <BlogList
        posts={posts}
        categories={categories}
        tags={tags}
        filteredPosts={filteredPosts}
      />
    </>
  );
};

export default PostByCategory;

export const getStaticProps: GetStaticProps = async ({
  locale,
  params,
  preview,
}) => {
  const i18n = await serverSideTranslations(locale || "es", ["common"]);
  const { data } = await client.query({
    query: GetBlogsByCategoryDocument,
    variables: {
      category: params?.slug as string,
      stage: preview ? Stage.Draft : Stage.Published,
    },
  });

  return {
    props: {
      ...i18n,
      posts: data.posts,
      filteredPosts: data.filteredPosts,
      categories: data.categories,
      tags: data.skills,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GetCategoriesSlugDocument });
  const paths = data.categories.map((category) => ({
    params: { slug: category.slug },
  }));
  return { paths, fallback: "blocking" };
};
