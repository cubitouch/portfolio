import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, SxProps, Theme, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import Swiper, { Swiper as SwiperClass } from "swiper/bundle";
import "swiper/css";
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

interface SwiperWrapper {
  items: React.ReactNode[];
  slideSx?: SxProps<Theme> | undefined;
}
export const SwiperWrapper = ({ items, slideSx }: SwiperWrapper) => {
  const theme = useTheme();
  // Reference to the Swiper instance
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    const swiperContainer = document.querySelector(".swiper") as HTMLElement;

    if (swiperContainer) {
      swiperRef.current = new Swiper(swiperContainer, {
        loop: false,
        slidesPerView: 1,
        initialSlide: items.length - 1,
        navigation: {
          enabled: true,
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
        spaceBetween: theme.spacing(2),
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1500: {
            slidesPerView: 4,
          },
        },
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  return (
    <Box
      className="swiper"
      sx={{
        flex: 1,
        width: `calc(100vw - ${theme.spacing(4 * 2)})`,
        [theme.breakpoints.down("sm")]: {
          width: `calc(100vw - ${theme.spacing(3 * 2)})`,
        },
      }}
    >
      <Box display="flex" className="swiper-wrapper">
        {/* Slides will go here */}
        {items.map((item, i) => (
          <Box key={i} className="swiper-slide" sx={slideSx}>
            {item}
          </Box>
        ))}
      </Box>

      {/* If you have navigation buttons */}
      <IconButton
        color="secondary"
        className="swiper-button-prev"
        sx={{ bottom: 0 }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        color="secondary"
        className="swiper-button-next"
        sx={{ bottom: 0 }}
      >
        <ChevronRightIcon />
      </IconButton>

      {/* If you have pagination */}
      {/* <div className="swiper-pagination"></div> */}
    </Box>
  );
};
