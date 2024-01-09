import { PageSlides, SlideParallaxType } from "react-page-slides";
import { Slide } from "./slide";

interface SliderProps {
  slides: React.ReactNode[];
}
export const Slider = ({ slides }: SliderProps) => (
  <PageSlides
    transitionSpeed={500}
    slides={slides.map((slideContent, i) => ({
      content: <Slide isFirst={i === 0}>{slideContent}</Slide>,
      style: {},
    }))}
    parallax={{
      offset: 0.6,
      type: SlideParallaxType.reveal,
    }}
  />
);
