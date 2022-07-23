import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { isSignInUser, authCode } from "@/utils/recoil";
import {
  isEmailValid,
  isPasswordValid,
  isPasswordConfirmed,
  isNicknameValid,
  showValidIcon,
} from "@/utils/validation";
import * as Api from "@/utils/api";
import { onChangeFunction } from "@/utils/eventHandler";

import AuthEmail from "@/components/User/AuthEmail/AuthEmail";

import { ContainerBox, StyledInput } from "@/styles/containers";
import { FormButton, UserInputDiv } from "@/styles/user";
import { StyledLabel } from "@/styles/text";
import {
  SignUpFormInnerBox,
  SignUpInputBox,
  RadioInputDiv,
  StyledRadioLabel,
  StyledRadioInput,
  StyledDateInput,
  AuthEmailButton,
  AuthEmailCompletedButton,
} from "./SignUpFormStyle";

function SignUpForm() {
  const navigate = useNavigate();

  const setIsSignIn = useSetRecoilState(isSignInUser);
  const setEmailAuthCode = useSetRecoilState(authCode);
  // prettier-ignore
  const [isThisEmailAuthorized, setIsThisEmailAuthorized] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    sex: "",
  });

  const isFormValid =
    isEmailValid(form.email) &&
    isThisEmailAuthorized &&
    isPasswordValid(form.password) &&
    isPasswordConfirmed(form.password, form.confirmPassword) &&
    isNicknameValid(form.nickname) &&
    form.birthday &&
    form.sex;

  const onChange = onChangeFunction(setForm);

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // * 유저 데이터 create(post) > 로그인(post) > 메인 페이지로 이동
    const { email, password, nickname, birthday, sex } = form;
    Api.post("/users", {
      email,
      password,
      nickname,
      birthday,
      sex,
    })
      .then((res) => {
        console.log("회원가입 성공!");
        console.log(res);

        Api.post("/users/signIn", {
          email,
          password,
        })
          .then((resSignIn) => {
            const { token } = resSignIn.data;
            window.localStorage.setItem("token", token);
            setIsSignIn(() => true);

            navigate("/");
            console.log("로그인 성공!");
          })
          .catch((errSignIn) => {
            console.error(errSignIn);
          });
      })
      .catch((err) => {
        console.log("회원가입 실패!!");
        console.error(err);
      });
  };

  const handleAuthEmailClick = async () => {
    try {
      const res = await Api.post("/mail", { email: form.email });
      console.log(res.data.SendEmail);
      setEmailAuthCode(res.data.SendEmail);
      alert("인증번호가 발송되었습니다!");
    } catch (err) {
      console.log(err);
      alert("인증번호 발송 실패했습니다!");
    }
  };

  return (
    <ContainerBox>
      <SignUpFormInnerBox onSubmit={handleSumbit} autoComplete='off'>
        <h1>회원가입</h1>
        <SignUpInputBox>
          <StyledLabel htmlFor='email'>이메일</StyledLabel>
          <UserInputDiv>
            <StyledInput
              type='text'
              name='email'
              value={form.email}
              onChange={onChange}
            />
            {form.email ? showValidIcon(isEmailValid(form.email)) : ""}
          </UserInputDiv>
          {isThisEmailAuthorized ? (
            <AuthEmailCompletedButton type='button'>
              이메일 인증 완료
            </AuthEmailCompletedButton>
          ) : (
            <div>
              <AuthEmailButton
                type='button'
                disabled={!isEmailValid(form.email)}
                onClick={handleAuthEmailClick}
              >
                이메일 인증하기
              </AuthEmailButton>
              <AuthEmail setIsThisEmailAuthorized={setIsThisEmailAuthorized} />
            </div>
          )}
          <StyledLabel htmlFor='password'>비밀번호</StyledLabel>
          <UserInputDiv>
            <StyledInput
              type='password'
              name='password'
              value={form.password}
              onChange={onChange}
            />
            {form.password ? showValidIcon(isPasswordValid(form.password)) : ""}
          </UserInputDiv>

          <StyledLabel htmlFor='confirmPassword'>비밀번호 확인</StyledLabel>
          <UserInputDiv>
            <StyledInput
              type='password'
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={onChange}
            />
            {form.confirmPassword
              ? showValidIcon(
                  isPasswordConfirmed(form.password, form.confirmPassword)
                )
              : ""}
          </UserInputDiv>

          <StyledLabel htmlFor='nickname'>닉네임</StyledLabel>
          <UserInputDiv>
            <StyledInput
              type='text'
              name='nickname'
              value={form.nickname}
              onChange={onChange}
            />
            {form.nickname ? showValidIcon(isNicknameValid(form.nickname)) : ""}
          </UserInputDiv>

          <StyledLabel>성별</StyledLabel>
          <RadioInputDiv id='sex'>
            <StyledRadioInput
              id='women'
              type='radio'
              name='sex'
              value='여성'
              checked={form.sex === "여성"}
              onChange={onChange}
            />
            <StyledRadioLabel htmlFor='women'>여성</StyledRadioLabel>
            <StyledRadioInput
              id='men'
              type='radio'
              name='sex'
              value='남성'
              checked={form.sex === "남성"}
              onChange={onChange}
            />
            <StyledRadioLabel htmlFor='men'>남성</StyledRadioLabel>
            <StyledRadioInput
              id='none'
              type='radio'
              name='sex'
              value='여성도 남성도 아니에요'
              checked={form.sex === "여성도 남성도 아니에요"}
              onChange={onChange}
            />
            <StyledRadioLabel htmlFor='none'>
              여성도 남성도 아니에요
            </StyledRadioLabel>
          </RadioInputDiv>
          <StyledLabel>생년월일</StyledLabel>

          <UserInputDiv>
            <StyledDateInput
              type='date'
              name='birthday'
              value={form.birthday}
              onChange={onChange}
            />
          </UserInputDiv>
          <FormButton
            type='submit'
            disabled={!isFormValid}
            isFormValid={!!isFormValid}
          >
            회원가입
          </FormButton>
        </SignUpInputBox>
      </SignUpFormInnerBox>
    </ContainerBox>
  );
}

export default SignUpForm;
