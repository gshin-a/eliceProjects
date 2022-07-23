import React from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

const isEmailValid = (email: string) => {
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};
const isPasswordValid = (password: string) => password.length >= 6;
const isPasswordConfirmed = (password: string, confirmPassword: string) =>
  password === confirmPassword;
const isNicknameValid = (nickname: string) => nickname.length >= 2;

const showValidIcon = (validation: boolean) => {
  return validation ? (
    <CheckCircleOutlineIcon className='icon icon-ok' />
  ) : (
    <DoNotDisturbIcon className='icon icon-no' />
  );
};

const isAuthEmailCodeCheckValid = (code: string) => code.length === 6;

export {
  isEmailValid,
  isPasswordValid,
  isPasswordConfirmed,
  isNicknameValid,
  showValidIcon,
  isAuthEmailCodeCheckValid,
};
