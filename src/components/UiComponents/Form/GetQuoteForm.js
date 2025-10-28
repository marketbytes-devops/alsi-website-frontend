import React, { useState } from 'react';
import ReCaptcha from '../../ReCaptcha';
import apiClient from '../../../api';

const GetQuoteForm = () => {
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!recaptchaVerified) {
      setErrorMessage('Please verify that you are not a robot.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await apiClient.post('contact/contact-form/', formData);
      console.log('Form submitted successfully:', response.data);

      setFormData({ name: '', phone: '', email: '', message: '' });
      setRecaptchaVerified(false);
      setFormSubmitted(true);

      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(
        error.response?.data?.message ||
          'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-8 py-10 rounded-xl shadow-md" style={{ background: 'linear-gradient(0deg, #193377, #009adb)' }}>
      {formSubmitted ? (
        <div className="text-white text-center">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Thank you for your enquiry!</h3>
          <p className="text-lg">We will get back to you soon.</p>
        </div>
      ) : (
        <div className="text-white mb-6">
          <h2 className="text-white text-2xl font-bold mb-4">Get A Quote</h2>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="mb-4 text-red-300 text-sm text-center">{errorMessage}</div>
            )}
            <div className="flex items-center justify-center gap-6">
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-[#e4e4e4] font-medium text-xs mb-2">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter first and last name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-600 text-white bg-transparent placeholder-gray-300 placeholder:text-xs placeholder:font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {/* Phone Field */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-[#e4e4e4] font-medium text-xs mb-2">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-600 text-white bg-transparent placeholder-gray-300 placeholder:text-xs placeholder:font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#e4e4e4] font-medium text-xs mb-2">
                Email*
              </label>
              <input
                type="email"
                name="email"
                placeholder="Eg. youremail@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-600 text-white bg-transparent placeholder-gray-300 placeholder:text-xs placeholder:font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {/* Message Field */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-[#e4e4e4] font-medium text-xs mb-2">
                Message*
              </label>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-600 text-white bg-transparent placeholder-gray-300 placeholder:text-xs placeholder:font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {/* reCAPTCHA */}
            <ReCaptcha onChange={setRecaptchaVerified} />
            {/* Submit Button */}
            <button
              type="submit"
              className={`px-6 py-2 bg-transparent border-white border text-white text-md font-normal transition-colors duration-300 ease-in-out rounded-lg flex items-center justify-center ${
                isSubmitting
                  ? 'cursor-not-allowed opacity-50 bg-gray-600 border-gray-600'
                  : 'hover:bg-white hover:text-[#193377] hover:border-transparent hover:font-medium'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting
                </>
              ) : (
                'Get A Quote'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GetQuoteForm;