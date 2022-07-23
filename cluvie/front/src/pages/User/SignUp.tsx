import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { ContainerBox, InnerBox } from "@/styles/containers";
import { FormButton, StyledLink } from "@/styles/user";
import SocialButton from "@/components/User/SocialButton";

const StyledSpan = styled.span`
  margin-top: 15px;
`;

function SignUp() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signUpByEmail");
  };

  return (
    <ContainerBox>
      <InnerBox>
        <h1>회원가입</h1>
        <SocialButton social='google' action='회원가입' />
        <SocialButton social='kakaotalk' action='회원가입' />
        <FormButton
          type='button'
          onClick={handleSignUpClick}
          isFormValid
          social=''
        >
          이메일로 회원가입
        </FormButton>
        <StyledSpan>이미 클러비라면?</StyledSpan>
        <StyledLink to='/signIn'>로그인하기</StyledLink>
      </InnerBox>
    </ContainerBox>
  );
}

export default SignUp;
