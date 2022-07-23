import styled from "@emotion/styled/macro";

import { StyledSpan } from "@/styles/text";

const MainBannerBox = styled.div`
  overflow: hidden;
  background-color: #FFE047;
  width: 1250px;
  border-radius: 15px;
  height: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const MainTextBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  h2 {
    font-size: 46px;
    font-weight: 300;
    line-height: 1.0;
    span {
      font-weight: 600;
      // color: #ffc300;
    }
  }
`;

const MainBannerImageBox = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  border-radius: 30px;
  .arrow-back {
    left: -20px;
  }
  .arrow-forward {
    right: -20px;
  }
  .hide-back {
    right: -100%;
    width: 400px;
  }
  .hide-prev {
    right: 100%;
  }
`;

const SlideImageHideBox = styled.div`
  position: absolute;
  width: 1000px;
  height: 300px;
  background-color: #FFE047;
  z-index: 1;
`;

const SlideImageBox = styled.div`
  display: flex;
  width: 1250px;
  img {
    width: 400px;
    height: 300px;
    border-radius: 30px;
  }
`;

const MainStyledSpan = styled(StyledSpan)`
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #ffc300;
  border-color: #ffc300;
`;

const StyledSpanBox = styled.div`
  margin-top: 20px;
`;

const ArrowBox = styled.div`
  position: absolute;
  top: 45%;
  background-color: white;
  opacity: 0.7;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .arrow-icon {
    cursor: pointer;
    font-size: 24px;
  }
`;

export { 
  MainBannerBox, 
  MainTextBox, 
  MainBannerImageBox, 
  SlideImageHideBox,
  SlideImageBox, 
  MainStyledSpan, 
  StyledSpanBox, 
  ArrowBox };