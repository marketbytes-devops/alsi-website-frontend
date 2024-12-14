import React, { useState } from "react";
import ReCaptcha from "../../ReCaptcha";
import apiClient from "../../../api";

const ContactUsForm = () => {
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }

    try {
      const response = await apiClient.post('contact/contact-us/', formData);
      console.log('Form submitted successfully:', response.data);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setRecaptchaVerified(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="w-full md:w-1/2 p-4">
          <h1 className="mb-4">Let's Connect And Talk</h1>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="bg-card" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="name">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter first and last name"
                className="mt-1 w-full block input"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Eg. youremail@email.com"
                className="mt-1 w-full block input"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter 10-digit mobile number"
                className="mt-1 w-full block input"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="message">Message*</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                className="mt-1 w-full block input"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-left">
              <ReCaptcha onChange={setRecaptchaVerified} />
            </div>
            <button
              type="submit"
              className="w-full bg-[#182d70] text-white text-md font-bold py-3 rounded-md hover:bg-[#0d6efd] transition-hover duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
