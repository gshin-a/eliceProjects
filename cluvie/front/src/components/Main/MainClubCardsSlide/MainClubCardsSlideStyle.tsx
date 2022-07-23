import styled from "@emotion/styled/macro";

import { MainBannerImageBox, ArrowBox, SlideImageHideBox } from "@/components/Main/MainBanner/MainBannerStyle";

const ClubCardsSlideBox = styled(MainBannerImageBox)`
  width: 1250px;
  height: 500px;
  margin-bottom: 150px;
  .arrow-back {
    left: -60px;
  }
  .arrow-forward {
    right: -60px;
  }
  .hide-back {
    right: -33%;
    width: 400px;
    height: 550px;
  }
  .hide-prev {
    right: 101%;
    width: 400px;
    height: 550px;
  }
`;

const ClubCardBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(10, 1fr);
  box-sizing: border-box;
  transition: all 0.5s ease-in-out;
`;

const CardArrowBox = styled(ArrowBox)`
  background-color: #FFE047;
`;

const CardSlideImageHideBox = styled(SlideImageHideBox)`
  background-color: white;
  height: 510px;
`;

export { ClubCardsSlideBox, ClubCardBox, CardArrowBox, CardSlideImageHideBox };