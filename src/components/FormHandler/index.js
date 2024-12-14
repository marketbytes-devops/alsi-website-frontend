import React, { useState } from 'react';

const FormHandler = ({ renderFormFields }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!recaptchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }
    console.log('Form submitted:', { name, email, phoneNumber, message });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderFormFields({
        name,
        setName,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        message,
        setMessage,
        recaptchaVerified,
        setRecaptchaVerified,
      })}
    </form>
  );
};

export default FormHandler;