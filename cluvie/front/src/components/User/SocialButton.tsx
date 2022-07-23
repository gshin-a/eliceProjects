import React from "react";

import google from "@/asset/images/google.png";
import kakaotalk from "@/asset/images/kakao-talk.png";

import { UserButton } from "@/styles/user";
import { SocialDistanceOutlined } from "@mui/icons-material";

// ? 더 구체적으로 String Literal으로 표현해야 함
type SocialType = {
  social: "google" | "kakaotalk",
  action: "로그인" | "회원가입",
};

const socials = { google: "구글", kakaotalk: "카카오톡으" };

function SocialButton({ social, action }: SocialType): React.ReactElement {
  return (
    <UserButton type='button' social={social}>
      <img
        src={social === "google" ? google : kakaotalk}
        alt={`${social} icon`}
        width='25px'
        height='25px'
      />
      <span>
        {socials[social]}로 {action}
      </span>
    </UserButton>
  );
}

export default SocialButton;
