import React, { useState } from 'react';
import ReCaptcha from '../../ReCaptcha';
import apiClient from '../../../api';

const GetQuoteForm = () => {
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!recaptchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }

    try {
      const response = await apiClient.post('contact/contact-form/', formData);
      console.log('Form submitted successfully:', response.data);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setRecaptchaVerified(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="px-8 py-10 rounded-xl shadow-md" style={{ background: "linear-gradient(0deg, #193377, #009adb)" }}>
      <h2 className="text-white text-2xl font-bold mb-4">Get A Quote</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center justify-center gap-6'>
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#e4e4e4] font-medium text-xs mb-2">Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Enter first and last name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-600 text-white bg-transparent placeholder-gray-300 placeholder:text-xs placeholder:font-medium"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-[#e4e4e4] font-medium text-xs mb-2">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter 10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-600 text-white bg-transparent placeholder-gray-300 placeholder:text-xs placeholder:font-medium"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-[#e4e4e4] font-medium text-xs mb-2">Email*</label>
          <input
            type="email"
            name="email"
            placeholder="Eg. youremail@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-600 text-white bg-transparent placeholder-gray-300 placeholder:text-xs placeholder:font-medium"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-[#e4e4e4] font-medium text-xs mb-2">Message*</label>
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-600 text-white bg-transparent placeholder-gray-300 placeholder:text-xs placeholder:font-medium"
          />
        </div>

        <ReCaptcha onChange={setRecaptchaVerified} />

        <button
          type="submit"
          className="px-6 py-2 bg-transparent border-white border text-white text-md font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#193377] hover:border-transparent hover:font-medium rounded-lg"
        >
          Get A Quote
        </button>
      </form>
    </div>
  );
};

export default GetQuoteForm;
