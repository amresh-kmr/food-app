import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import data from "./../utils/data";
import MyImageList from "./MyImageList";

export default function Carousel() {
  const [disp, setDisp] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    interval();
    return () => {
      handleClearTimer();
    };
    // eslint-disable-next-line
  }, []);
  function interval() {
    timerRef.current = setInterval(() => {
      move(1);
    }, 2000);
  }
  function move(arg) {
    if (arg === 0) {
      setDisp((prev) => (prev === 0 ? 4 : prev - 1));
    } else if (arg === 1) {
      setDisp((prev) => (prev === 4 ? 0 : prev + 1));
    }
  }
  function handleClearTimer() {
    clearInterval(timerRef.current);
  }
  function handleSetTimer() {
    interval();
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        height: "325px",
        mt: "20px",
        width: "100vw",
        mb: "50px",
      }}
    >
      <IconButton
        onClick={() => move(0)}
        onMouseEnter={handleClearTimer}
        onMouseLeave={handleSetTimer}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      {data.map((item, index) => (
        <Box
          key={index}
          width="100vh"
          display={index === disp ? "flex" : "none"}
          justifyContent="center"
          alignItems="center"
          color="white"
        >
          <MyImageList itemData={item} />
        </Box>
      ))}
      <IconButton
        onClick={() => move(1)}
        onMouseEnter={handleClearTimer}
        onMouseLeave={handleSetTimer}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
}
