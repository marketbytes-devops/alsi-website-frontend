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
        sitekey="6Lf_TOQqAAAAAD3PGDryVnbbvXp8MJBL2XtZqKIQ"
        onChange={handleVerify}
      />
    </div>
  );
});

export default ReCaptcha;