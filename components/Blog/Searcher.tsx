import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { resetPosts, setPosts, useAppDispatch } from '../../app';
import { SearchPostsDocument, Stage } from '../../graphql';
import { useDebounce } from '../../hooks';
import { client } from '../../utils/apolloClient';

export const Searcher = () => {
  const [input, setInput] = useState('');
  const keyword = useDebounce(input);
  const dispatch = useAppDispatch();
  const { isPreview } = useRouter();
  useEffect(() => {
    if (keyword) {
      client
        .query({
          query: SearchPostsDocument,
          variables: { search: keyword, stage: isPreview ? Stage.Draft : Stage.Published },
        })
        .then(({ data }) => {
          dispatch(setPosts(data.posts as any));
        });
    } else {
      dispatch(resetPosts());
    }
  }, [keyword, dispatch, isPreview]);
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{ width: '100%' }}
      variant="outlined"
      placeholder="Buscar post"
      onChange={(e) => setInput(e.target.value)}
      data-aos="zoom-in"
    />
  );
};
