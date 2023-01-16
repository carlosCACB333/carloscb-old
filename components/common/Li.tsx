import { ListItem, ListItemText } from "@mui/material";
import { Link } from "./Link";
import { PropsWithChildren } from "react";

interface CategoryItemProps extends PropsWithChildren {
  active: boolean;
  name: string;
  url: string;
  scroll?: boolean;
}
export const Li = ({
  active,
  name,
  url,
  children,
  scroll = false,
}: CategoryItemProps) => {
  return (
    <ListItem
      data-aos="fade-up"
      dense
      sx={{
        display: "list-item",
      }}
    >
      <ListItemText
        primary={
          <Link
            variant="button"
            href={url}
            scroll={scroll}
            sx={{ color: active ? "primary.main" : "text.primary" }}
          >
            {name}
          </Link>
        }
        sx={{
          position: "relative",
          marginLeft: 3,
          ":before": {
            content: "''",
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: active ? "primary.main" : "text.primary",
            position: "absolute",
            top: ".4rem",
            left: -20,
          },
        }}
      />
      {children}
    </ListItem>
  );
};
