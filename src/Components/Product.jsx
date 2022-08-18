import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Tooltip } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { CartState } from "../App";
import data from "../utils/data";

export default function Product({
  id,
  image,
  name,
  price,
  deliveryTime,
  discount,
  category,
  rating,
}) {
  const { cart, setCart } = CartState();
  const [inCart, setInCart] = React.useState(false);
  function removeFromCart() {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }
  function addToCart() {
    setCart((prev) => [
      ...prev,
      { ...data.filter((item) => item.id === id)[0], qty: 1 },
    ]);
  }
  React.useEffect(() => {
    setInCart((prev) => cart.some((item) => item.id === id));
  }, [cart]);

  return (
    <Card sx={{ maxWidth: 345, width: "32%", position: "relative" }}>
      <CardMedia component="img" height="140" image={image} alt="" />
      <Tooltip
        title={inCart ? "Remove from Cart" : "Add to Cart"}
        placement="left"
        arrow
      >
        <IconButton
          sx={{
            color: inCart ? "red" : "gray",
            position: "absolute",
            top: "6%",
            fontSize: "0.8rem",
            padding: "0 4px",
            left: "85%",
          }}
          onClick={() => {
            inCart ? removeFromCart() : addToCart();
          }}
        >
          {inCart ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />}
        </IconButton>
      </Tooltip>
      <Typography
        sx={{
          backgroundColor: "rgb(37, 111, 239)",
          color: "white",
          position: "absolute",
          bottom: "40%",
          fontSize: "0.8rem",
          padding: "0 4px",
        }}
      >
        {discount}% OFF
      </Typography>
      <Typography
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "rgb(54,54,54)",
          position: "absolute",
          bottom: "40%",
          fontSize: "0.8rem",
          padding: "0 4px",
          left: "80%",
          borderRadius: "4px",
        }}
      >
        {deliveryTime} min
      </Typography>
      <CardContent
        sx={{
          display: "inline-flex",
          padding: 0,
          pt: "12px",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <Typography>{name}</Typography>
        <Typography
          variant="body2"
          sx={{
            backgroundColor: rating >= 2.5 ? "green" : "red",
            color: "white",
            padding: "0 5px",
            borderRadius: "10px",
          }}
        >
          {rating} &nbsp;
          <StarIcon fontSize="1rem" sx={{ paddingTop: "2px" }} />
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "inline-flex",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <Typography color="darkgray">{category}</Typography>
        <Typography color="dimgrey">₹{price} for One</Typography>
      </CardActions>
    </Card>
  );
}
