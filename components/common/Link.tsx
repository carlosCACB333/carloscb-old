import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import React, { FC } from 'react';

type Props = React.ComponentProps<typeof MuiLink> & React.ComponentProps<typeof NextLink>;

export const Link: FC<Props> = (props) => <MuiLink component={NextLink} {...props} />;
