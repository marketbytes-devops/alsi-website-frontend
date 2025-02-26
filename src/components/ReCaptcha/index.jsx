import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = forwardRef(({ onChange }, ref) => {
  const handleVerify = (token) => {
    const verified = !!token;
    onChange(verified, token);
  };

  return (
    <div className="mb-4">
      <ReCAPTCHA
        ref={ref}
        sitekey="6LeWEuIqAAAAAMA3-LcZ-CaSMXVNX3Bu_TRKW3mn"
        onChange={handleVerify}
      />
    </div>
  );
});

export default ReCaptcha;