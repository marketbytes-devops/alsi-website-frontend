import React, { useState } from "react";
import ReCaptcha from "../../ReCaptcha";
import apiClient from "../../../api";

const ContactUsForm = () => {
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission

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
    setIsSubmitting(true); // Disable the button
    try {
      const response = await apiClient.post("contact/contact-form/", formData);
      console.log("Form submitted successfully:", response.data);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setRecaptchaVerified(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="w-full md:w-1/2 p-4">
          <h1 className="mb-4">Let's Connect And Talk</h1>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="bg-card" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                className="block text-md font-extrabold text-foreground"
                htmlFor="name"
              >
                Name*
              </label>
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

            {/* Email Field */}
            <div className="mb-4">
              <label
                className="block text-md font-extrabold text-foreground"
                htmlFor="email"
              >
                Email*
              </label>
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

            {/* Phone Field */}
            <div className="mb-4">
              <label
                className="block text-md font-extrabold text-foreground"
                htmlFor="phone"
              >
                Phone Number*
              </label>
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

            {/* Message Field */}
            <div className="mb-4">
              <label
                className="block text-md font-extrabold text-foreground"
                htmlFor="message"
              >
                Message*
              </label>
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

            {/* reCAPTCHA */}
            <div className="flex items-center justify-left">
              <ReCaptcha onChange={setRecaptchaVerified} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-[#182d70] text-white text-md font-bold py-3 rounded-md transition duration-300 ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#0d6efd]"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="mx-8">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-extrabold text-center mb-4">
                Thank you for your enquiry!
              </h2>
              <p className="text-center text-sm font-semibold mb-6">
                We will get back to you soon.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleCloseModal}
                  className="bg-[#182d70] text-white px-6 py-2 rounded-md hover:bg-[#0d6efd] transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsForm;
