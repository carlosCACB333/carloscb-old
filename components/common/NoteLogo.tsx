import { Box } from "@mui/material";
import React from "react";
import { Link } from "./Link";

export const NoteLogo = () => {
  return (
    <>
      <Link
        href="/note"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        aria-label="home"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "primary.dark",
            color: "text.primary",
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          codeNotes
        </Box>
      </Link>
      <br />
      <br />
    </>
  );
};
