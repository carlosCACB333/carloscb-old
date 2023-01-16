import { Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FC, useEffect, useState } from "react";
import {
  setPosts,
  setPostsInit,
  useAppDispatch,
  useAppSelector,
} from "../../app";
import { Category, Post, Skill } from "../../graphql/generated/graphql";
import { BlogCard2 } from "./BlogCard2";

interface Props {
  posts: Post[];
  filteredPosts: Post[];
  categories: Category[];
  tags: Skill[];
}

const PAGE_SIZE = 6;

export const BlogList: FC<Props> = ({
  posts,
  categories,
  tags,
  filteredPosts,
}) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { posts: showPosts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(setPosts(filteredPosts));
    dispatch(setPostsInit(filteredPosts));
  }, [dispatch, posts, filteredPosts]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Grid container spacing={2}>
        {showPosts
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map((post) => (
            <Grid xs={12} md={6} lg={4} key={post.id}>
              <BlogCard2 post={post} />
            </Grid>
          ))}
      </Grid>

      <Pagination
        sx={{
          marginTop: 8,
        }}
        count={Math.ceil(showPosts.length / PAGE_SIZE)}
        page={page}
        onChange={handleChange}
      />
      <br />
      <br />
    </>
  );
};
