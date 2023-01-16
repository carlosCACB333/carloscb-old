import React, { FC } from "react";
import { Typography } from "@mui/material";

interface Props extends React.ComponentProps<typeof Typography> {}

export const Blockquote: FC<Props> = (props) => {
  return (
    <Typography
      sx={{
        borderLeft: "4px solid",
        borderColor: "primary.main",
        pl: 2,
        mb: 2,
      }}
      {...props}
    />
  );
};
