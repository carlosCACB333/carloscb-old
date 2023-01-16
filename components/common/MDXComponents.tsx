import React, { ComponentProps } from "react";
import * as mdx from "@mdx-js/react";
import {
  Typography,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Divider,
} from "@mui/material";
import NextLink from "next/link";
import { getTheme } from "../../theme";

type MDXC = ComponentProps<typeof mdx.MDXProvider>["components"];

export const MDXComponents: MDXC = {
  h1: (props: any) => <Typography variant="h1" component="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" component="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" component="h3" {...props} />,
  h4: (props: any) => <Typography variant="h4" component="h4" {...props} />,
  h5: (props: any) => <Typography variant="h5" component="h5" {...props} />,
  h6: (props: any) => <Typography variant="h6" component="h6" {...props} />,
  p: (props: any) => <Typography variant="body1" component="p" {...props} />,
  a: (props: any) =>
    props.href.startsWith("http") ? (
      <Link href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </Link>
    ) : (
      <NextLink href={props.href} passHref>
        <Link>{props.children}</Link>
      </NextLink>
    ),

  pre: (props: any) => (
    <pre
      style={{
        backgroundColor: getTheme("dark").palette.background.paper,
        borderRadius: "0.5rem",
      }}
      {...props}
      className={props.className + " scroll"}
    />
  ),

  table: (props: any) => (
    <TableContainer className="scroll">
      <Table {...props} />
    </TableContainer>
  ),

  thead: (props: any) => <TableHead {...props} />,

  tbody: (props: any) => {
    return <tbody {...props} />;
  },

  tr: (props: any) => {
    return <TableRow {...props} />;
  },

  td: (props: any) => <TableCell {...props} />,

  th: (props: any) => {
    return <TableCell {...props} />;
  },
  hr: (props: any) => <Divider {...props} />,
};
