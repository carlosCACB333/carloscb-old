import Grid from "@mui/material/Unstable_Grid2";
import React, { FC } from "react";
import { Category, Post } from "../../graphql";
import { CategoryCard } from "../category";
import { SectionLayout } from "../layouts";
import { BlogCard } from "./BlogCard";

interface Props {
  posts: Post[];
  categories: Category[];
}

export const BlogHome: FC<Props> = ({ posts, categories }) => {
  const categoriesSorted = [...categories].sort(
    (a, b) => b.posts.length - a.posts.length
  );
  const postsSorted = [...posts]
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);

  return (
    <>
      <SectionLayout maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <BlogCard post={postsSorted.shift()!} isLg />
          </Grid>
          <Grid container xs={12} md={6}>
            {postsSorted.map((post) => (
              <Grid xs={12} md={6} key={post.id}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </SectionLayout>

      <SectionLayout maxWidth="lg" title="Categorías más publicadas">
        <br />
        <Grid container spacing={2}>
          {categoriesSorted.slice(0, 4).map((category) => (
            <Grid xs={12} sm={6} md={3} key={category.id}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </SectionLayout>
    </>
  );
};
