import { Card, CardContent, List, Typography } from "@mui/material";
import React, { FC } from "react";
import { useHighlight } from "../../hooks";
import { Toc } from "../../interfaces";
import { Li } from "./Li";

interface Props {
  toc: Toc[];
}
export const ContentMenu: FC<Props> = ({ toc }) => {
  const active = useHighlight("#main-content", ["h1", "h2", "h3"]);

  return (
    <Card>
      <CardContent
        sx={{
          padding: [1, 2, 4],
        }}
      >
        <Typography variant="h6" textAlign="center">
          Contenido
        </Typography>

        <List>
          {toc.map(({ children, title, url }) => (
            <Li key={url} active={url === "#" + active} name={title} url={url}>
              <List
                sx={{
                  pl: 2,
                }}
              >
                {children.map((child) => (
                  <Li
                    key={url + child.url}
                    active={child.url === "#" + active}
                    name={child.title}
                    url={child.url}
                    scroll
                    variant="secondary"
                  />
                ))}
              </List>
            </Li>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
