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
  Button,
  Card,
  CardContent,
} from "@mui/material";
import NextLink from "next/link";
import { getTheme } from "../../theme";
import { FormCard } from "./FormCard";
import Grid from "@mui/material/Unstable_Grid2";
import { Blockquote } from "../common";

type MDXC = ComponentProps<typeof mdx.MDXProvider>["components"];

export const MDXComponents: MDXC = {
  h1: (props: any) => (
    <Typography variant="h1" component="h1" {...props} sx={{ mt: 2 }} />
  ),
  h2: (props: any) => (
    <Typography variant="h2" component="h2" {...props} sx={{ mt: 2 }} />
  ),
  h3: (props: any) => (
    <Typography variant="h4" component="h3" {...props} sx={{ mt: 2 }} />
  ),
  h4: (props: any) => (
    <Typography variant="h6" component="h4" {...props} sx={{ mt: 2 }} />
  ),
  h5: (props: any) => (
    <Typography variant="subtitle1" component="h5" {...props} sx={{ mt: 2 }} />
  ),
  h6: (props: any) => (
    <Typography variant="subtitle2" component="h6" {...props} sx={{ mt: 2 }} />
  ),
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
      <Table {...props} size="small" />
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
  img: (props: any) => (
    <img {...props} style={{ width: "100%", height: "auto" }} />
  ),
  blockquote: (props: any) => <Blockquote {...props} />,
  // componentes para usar en el MDX
  Button,
  Card,
  CardContent,
  FormCard,
  Grid,
};
