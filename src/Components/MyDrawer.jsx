import { Box, Button, Drawer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CartState } from "../App";

export default function MyDrawer({ drawerOpen, setDrawerOpen }) {
  const { cart, setCart } = CartState();
  const [subTotal, setSubTotal] = useState(0);

  function handleQtyChange(id, qty) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty: qty } : item))
      );
    }
  }

  useEffect(() => {
    let total = cart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    setSubTotal(total);
  }, [cart]);

  return (
    <div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        sx={{ width: "325px" }}
      >
        <Box width={325} mt="20px" textAlign="center">
          <Typography
            variant="h5"
            color="violet"
            fontWeight="800"
            fontStyle="italic"
            letterSpacing="0.1em"
          >
            Cart
          </Typography>
          <Box
            width="90%"
            display="flex"
            justifyContent="space-between"
            margin="auto"
            mb="20px"
            color="coral"
          >
            <Typography width="5%">SN</Typography>
            <Typography width="45%">ITEM</Typography>
            <Typography width="25%">QTY</Typography>
            <Typography width="20%">PRICE</Typography>
          </Box>
          {cart.map((item, i) => (
            <Box
              key={item.id + 1}
              width="90%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="5px"
              borderRadius="4px"
              color="crimson"
              margin="auto"
              marginTop="8px !important"
              padding="0 4px"
              sx={{ backgroundColor: "rgba(0,255,0,0.2)" }}
            >
              <Typography width="5%">{i + 1}</Typography>
              <Typography
                width="45%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                textAlign="left"
              >
                {item.name}
              </Typography>
              <Typography width="25%">
                <Button
                  sx={{
                    padding: 0,
                    minWidth: "0px",
                    mr: "5px",
                    fontSize: "20px",
                  }}
                  onClick={() => {
                    handleQtyChange(item.id, item.qty - 1);
                  }}
                >
                  -
                </Button>
                {item?.qty}
                <Button
                  sx={{
                    padding: 0,
                    minWidth: "0px",
                    ml: "5px",
                    fontSize: "20px",
                  }}
                  onClick={() => {
                    handleQtyChange(item.id, item.qty + 1);
                  }}
                >
                  +
                </Button>
              </Typography>
              <Typography width="20%">{item.price}</Typography>
            </Box>
          ))}
          <hr style={{ width: "90%", marginTop: "20px" }} />
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              margin: "auto",
              fontStyle: "italic",
              color: "blue",
            }}
          >
            <Typography>Subtotal:</Typography>
            <Typography>₹{subTotal}</Typography>
          </span>
        </Box>
      </Drawer>
    </div>
  );
}
