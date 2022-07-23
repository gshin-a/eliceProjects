import Users from "../../../models/user";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class authService {
  static sendEmail = async ({ email }) => {
    const authenticationNum = Math.floor(Math.random() * 1000000) + 100000;
    if (authenticationNum > 1000000) {
      authenticationNum = authenticationNum - 100000;
    }
    const HTMLcontent = `
<div style="font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 540px; height: 600px; border-top: 4px solid #FFC300; margin: 100px auto; padding: 30px 0; box-sizing: border-box;">
  <h1 style='margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;'>
    <span style='color: #5B5B5B; font-size: 15px; margin: 0 0 10px 3px;'>
      Cluvie
    </span>
    <br />
    <span style='color: #FFC300;'>메일인증</span> 안내입니다.
  </h1>
  <p style='font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;'>
    안녕하세요.
    <br />
    클러비를 이용해 주셔서 감사드립니다.
    <br />
    아래 <b style='color: #FFC300;'>'인증 번호'</b> 를 입력하여 회원가입을
    완료해 주세요.
    <br />
    감사합니다.
  </p>

  <p style='font-size: 16px; margin: 40px 5px 20px; line-height: 28px;'>
    인증 번호: <br />
    <span style='font-size: 24px;'>${authenticationNum}</span>
  </p>

  <div style='border-top: 1px solid #DDD; padding: 5px;'></div>
</div>`;
    const mailSender = process.env.MAIL_SENDER;
    const password = process.env.MAIL_PASSWORD;
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: mailSender,
        pass: password,
      },
    });

    const mailOptions = {
      from: "Cluvie <cluvie@cluvie.com>",
      to: email,
      subject: "[cluvie] 회원가입 인증메일 입니다.",
      html: HTMLcontent,
    };
    const info = await transport.sendMail(mailOptions);
    return authenticationNum;
  };
}

export { authService };
