import { Router } from "express";
import { authService } from "./service";

const authRouter = Router();

authRouter.post("/mail", async (req, res) => {
  try {
    const email = req.body.email;
    const SendEmail = await authService.sendEmail({ email });
    res.status(200).json({ success: true, SendEmail });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default authRouter;
