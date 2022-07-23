import React, { useEffect, useState } from "react";

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Club } from "@/utils/interface";

import MainClubCard from "@/components/Main/MainClubCard/MainClubCard";

import { 
  ClubCardsSlideBox, 
  ClubCardBox, 
  CardArrowBox,
  CardSlideImageHideBox } from "./MainClubCardsSlideStyle";

interface Props {
  resClubList: Club[];
}

function MainClubCardsSlide({ resClubList }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newCurrentIndex = currentIndex + 1;
    if (newCurrentIndex > resClubList.length - 3) return;
    setCurrentIndex(newCurrentIndex);
  }

  const handlePrev = () => {
    const newCurrentIndex = currentIndex - 1;
    if (newCurrentIndex < 0) return;
    setCurrentIndex(newCurrentIndex);
  }

  const slideStyle = () => {
    return {
      transform: `translateX(-${(currentIndex) * 435}px)`,
    };
  }

  // console.log(resClubList);
  // useEffect(() => {
  //   console.log(currentIndex);
  // }, [currentIndex])

  return (
    <ClubCardsSlideBox>
      <CardSlideImageHideBox className="hide-prev"/>
      <CardSlideImageHideBox className="hide-back"/>
      <ClubCardBox style={slideStyle()}>
        {
          resClubList.slice(0, 10).map((weekendClub) => 
          <MainClubCard key={weekendClub.id} club={weekendClub} />)
        }
      </ClubCardBox>
      <CardArrowBox className="arrow-back" onClick={handlePrev}>
        <ArrowBackIosRoundedIcon className="arrow-icon" />
      </CardArrowBox>
      <CardArrowBox className="arrow-forward" onClick={handleNext}>
        <ArrowForwardIosRoundedIcon className="arrow-icon" />
      </CardArrowBox>
    </ClubCardsSlideBox>
  )
}

export default MainClubCardsSlide;