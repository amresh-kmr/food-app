import Product from "./Product";
import data from "../utils/data";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Products() {
  return (
    <Box
      sx={{
        width: "80vw",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "auto",
        mt: "20px",
        gap: "10px",
      }}
    >
      {data.map((item, i) => {
        return <Product key={i} {...item} />;
      })}
    </Box>
  );
}
