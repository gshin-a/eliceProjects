import React, { useState, useEffect } from "react";

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import img1 from "@/asset/images/abouttime.jpg";
import img2 from "@/asset/images/interstellar.png";
import img3 from "@/asset/images/time.jpg";

import { 
  MainBannerBox, 
  MainTextBox, 
  MainBannerImageBox,
  SlideImageHideBox,
  SlideImageBox,
  StyledSpanBox,
  MainStyledSpan,
  ArrowBox } from "./MainBannerStyle";

const images = [img1, img2, img3];
const DIRECTION = {
  next: "NEXT",
  prev: "PREV"
};

function MainBanner() {
  const [bannerSlide, setBannerSlide] = useState({
    imgs: images,
    current: 1,
    needTransition: true,
    direction: ""
  });

  const makeSlideNext = () => {
    const { current, imgs } = bannerSlide;
    const newImgs = [...imgs, ...imgs.slice(0, 1)].slice(-3);
    setBannerSlide((prev) => ({
      ...prev,
      imgs: newImgs,
      needTransition: false,
      current: current - 1
    }));
  }

  const makeSlidePrev = () => {
    const { current, imgs } = bannerSlide;
    const newImgs = [...imgs.slice(-1), ...imgs].slice(0, 3);
    setBannerSlide((prev) => ({
      ...prev,
      imgs: newImgs,
      needTransition: false,
      current: current + 1
    }));
  }

  const handleNext = () => {
    const { current, imgs } = bannerSlide;
    const newCurrent = current + 1;
    if (newCurrent > imgs.length - 1) return;
    setBannerSlide((prev) => ({
      ...prev,
      needTransition: true,
      current: newCurrent,
      direction: DIRECTION.next
    }));
    // console.log(bannerSlide);
  }

  const handlePrev = () => {
    const { current } = bannerSlide;
    const newCurrent = current - 1;
    if (newCurrent < 0) return;
    setBannerSlide((prev) => ({
      ...prev,
      needTransition: true,
      current: newCurrent,
      direction: DIRECTION.prev
    }));
  }

  const handleSliderEnd = () => {
    const { direction } = bannerSlide;
    switch (direction) {
      case DIRECTION.next:
        makeSlideNext();
        break;
      case DIRECTION.prev:
        makeSlidePrev();
        break;
      default:
        break;
    }
  }

  const slideStyle = () => {
    const { needTransition, current } = bannerSlide;
    if (needTransition) {
      return {
        transform: `translateX(-${(current) * 4}00px)`,
        transition: "all 0.5s ease-in-out"
      };
    }
    return {
      transform: `translateX(-${(current) * 4}00px)`,
    }
  }
  
  useEffect(() => {
    const slideTimer = setTimeout(() => {
      handleNext();
    }, 3000);
  }, [bannerSlide]);
  
  return (
    <MainBannerBox>
      <MainTextBox>
        <h2>혼자 즐기는 영화가 지겹다면</h2>
        <h2>
          <span>클러비</span>로 모여 보세요!
        </h2>
        <StyledSpanBox>
          <MainStyledSpan>#지금뜨는</MainStyledSpan>
          <MainStyledSpan>#마감임박</MainStyledSpan>
          <MainStyledSpan>#주말진행</MainStyledSpan>
        </StyledSpanBox>
      </MainTextBox>
      <MainBannerImageBox>
          <SlideImageHideBox className="hide-prev"/>
          <SlideImageHideBox className="hide-back" />
            <SlideImageBox style={slideStyle()} onTransitionEnd={handleSliderEnd}>
              {
                bannerSlide.imgs.map((img, idx) => 
                <img key={idx} src={img} alt="banner-img" 
                />)
              }
          </SlideImageBox>
          <ArrowBox className="arrow-back" onClick={handlePrev}>
            <ArrowBackIosRoundedIcon className="arrow-icon" />
          </ArrowBox>
          <ArrowBox className="arrow-forward" onClick={handleNext}>
            <ArrowForwardIosRoundedIcon className="arrow-icon" />
          </ArrowBox>
      </MainBannerImageBox>
    </MainBannerBox>
  );
}

export default MainBanner;