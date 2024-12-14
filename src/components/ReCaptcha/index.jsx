import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ onChange }) => {
  const [verified, setVerified] = useState(false);

  const handleVerify = (token) => {
    setVerified(!!token);
    onChange(!!token);
  };

  return (
    <div className="mb-4">
      <ReCAPTCHA
        sitekey={'6Lfqnx8pAAAAANMmnL8PNHoCjMgscRLWJGes1d9Q'}
        onChange={handleVerify}
      />
    </div>
  );
};

export default ReCaptcha;
