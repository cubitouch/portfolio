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
  slideSx?: SxProps<Theme>;
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
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
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
          {items.map((item, i) => (
            <Box
              key={i}
              className="swiper-slide"
              sx={{ display: "flex", alignItems: "center", ...slideSx }}
            >
              <Box flex="1">{item}</Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <IconButton
          size="large"
          color="secondary"
          className="swiper-button-prev"
          sx={{
            bottom: 0,
            opacity: 1,
            transition: "opacity 0.2s",
            "&.swiper-button-disabled": {
              opacity: 0,
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Box
          className="swiper-pagination"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .swiper-pagination-bullet": {
              background: theme.palette.common.white,
              height: theme.spacing(1),
              width: theme.spacing(1),
              display: "block",
              margin: theme.spacing(0, 1),
              opacity: 0.8,
              borderRadius: theme.spacing(0.5),
              transition: "all 0.2s",
              "&.swiper-pagination-bullet-active": {
                height: theme.spacing(2),
                width: theme.spacing(2),
                opacity: 1,
                borderRadius: theme.spacing(1),
              },
            },
          }}
        ></Box>
        <IconButton
          size="large"
          color="secondary"
          className="swiper-button-next"
          sx={{
            bottom: 0,
            opacity: 1,
            transition: "opacity 0.2s",
            "&.swiper-button-disabled": {
              opacity: 0,
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </>
  );
};
