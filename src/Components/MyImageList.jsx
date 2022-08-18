import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";

export default function MyImageList({ itemData }) {
  return (
    <ImageListItem key={itemData.image} sx={{ height: "inherit" }}>
      <img
        src={`${itemData.image}`}
        srcSet={`${itemData.image}`}
        alt={itemData.name}
        height="100%"
        style={{ objectFit: "fill" }}
      />
      <ImageListItemBar
        title={itemData.name}
        subtitle={Number(itemData.discount) + 20 + "% OFF"}
        sx={{ height: "100%", textAlign: "left", alignItems: "end" }}
        actionIcon={
          <IconButton
            sx={{
              color: itemData.category === "veg" ? "green" : "red",
              borderRadius: "inherit",
              border: "3px solid",
              padding: "0",
              mr: "10px",
              mb: "10px",
            }}
            aria-label={`info about ${itemData.name}`}
          >
            <FiberManualRecordSharpIcon color="red" />
          </IconButton>
        }
      />
    </ImageListItem>
  );
}
