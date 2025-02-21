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
        sitekey={'6Lcljt4qAAAAAL1FigiOeKdBww3HD3bK_tyLfSqv'}
        onChange={handleVerify}
      />
    </div>
  );
};

export default ReCaptcha;
