import React, { FC } from "react";
import { Card, CardContent, Container } from "@mui/material";
interface Props extends React.ComponentProps<typeof Card> {}

export const FormCard: FC<Props> = ({ children, ...props }) => {
  return (
    <Card className="scroll" {...props}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
