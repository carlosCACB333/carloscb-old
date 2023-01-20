import { ListItem, ListItemText } from "@mui/material";
import { Link } from "./Link";
import { PropsWithChildren } from "react";

interface CategoryItemProps extends PropsWithChildren {
  active: boolean;
  name: string;
  url: string;
  scroll?: boolean;
  variant?: "primary" | "secondary";
}
export const Li = ({
  active,
  name,
  url,
  children,
  scroll = false,
  variant = "primary",
}: CategoryItemProps) => {
  return (
    <ListItem
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
            backgroundColor: active
              ? "primary.main"
              : variant === "primary"
              ? "text.primary"
              : "text.disabled",
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
