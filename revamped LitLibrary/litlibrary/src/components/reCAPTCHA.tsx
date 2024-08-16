"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaComponentProps {
  onChange: (token: string | null) => void;
}

const RecaptchaComponent: React.FC<RecaptchaComponentProps> = ({ onChange }) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    onChange(token);
  };
  console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

  return (
    <div>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        onChange={handleRecaptchaChange}
      />
    </div>
  );
};

export default RecaptchaComponent;
