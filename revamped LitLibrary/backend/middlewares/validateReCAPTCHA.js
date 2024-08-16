import axios from "axios";
export const validateRecaptcha = async (req, res, next) => {
  const token = req.body.reCaptchaToken;
  console.log(token);
  if (!token) {
    return res.status(400).json({ message: "reCAPTCHA token is missing." });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    console.log(secretKey)
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );

    console.log(response.data);
    const isHuman = response.data.success;

    if (!isHuman) {
      return res.status(400).json({ message: "reCAPTCHA validation failed." });
    }

    next(); 
  } catch (error) {
    return res.status(500).json({ message: "reCAPTCHA validation error." });
  }
};


