import React, { useState, useRef } from "react";
import ReCaptcha from "../../ReCaptcha";
import apiClient from "../../../api";

const CareerForm = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [fileName, setFileName] = useState("No File Chosen");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    file: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const executeRecaptcha = async () => {
    if (recaptchaRef.current) {
      await recaptchaRef.current.executeAsync?.();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Please complete reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("message", formData.message);
    formPayload.append("file", formData.file);
    formPayload.append("captcha", recaptchaToken);

    try {
      const response = await apiClient.post("careers/careers-form/", formPayload);
      console.log("Form submitted:", response.data);

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "", file: null });
      setFileName("No File Chosen");
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      setErrorMessage("");
      setIsModalOpen(true);
    } catch (error) {
      const errorMsg = error.response?.data?.captcha
        ? "reCAPTCHA failed. Try again."
        : error.response?.data?.file
        ? "File error: " + error.response.data.file
        : "Submission failed. Try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > 1) {
        alert("File must be under 1MB.");
        e.target.value = "";
        setFileName("No File Chosen");
        setFormData((prev) => ({ ...prev, file: null }));
      } else {
        setFileName(file.name);
        setFormData((prev) => ({ ...prev, file }));
      }
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 p-4">
          <h1 className="mb-4">Be a part of ALSI</h1>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="bg-card" onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="name">Name*</label>
              <input
                type="text"
                id="name"
                placeholder="Enter first and last name"
                className="mt-1 w-full block input"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                placeholder="Eg. youremail@email.com"
                className="mt-1 w-full block input"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter 10-digit mobile number"
                className="mt-1 w-full block input"
                required
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="message">Message*</label>
              <textarea
                id="message"
                placeholder="Your Message"
                className="mt-1 w-full block input"
                required
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="file"
                className="cursor-pointer flex items-center text-[#212529] pr-4 rounded bg-gray-100 border border-gray-300 w-full"
              >
                <span className="bg-[#182d70] text-white text-sm font-medium py-2 px-4 rounded-l-sm">Choose File</span>
                <span className="ml-4 truncate">{fileName}</span>
              </label>
              <input type="file" id="file" className="hidden" onChange={handleFileChange} required />
            </div>

            {/* Invisible reCAPTCHA v3 */}
            <ReCaptcha
              ref={recaptchaRef}
              onChange={(verified, token) => {
                if (verified) setRecaptchaToken(token);
              }}
            />

            {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}

            <button
              type="submit"
              className={`w-full bg-[#182d70] text-white font-bold py-3 rounded-md transition ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#0d6efd]"
              }`}
              disabled={isSubmitting}
              onClick={executeRecaptcha}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-8">
            <h2 className="text-2xl font-bold text-center mb-4">Thank you for your enquiry!</h2>
            <p className="text-center text-lg mb-6">We will get back to you soon.</p>
            <div className="flex justify-center">
              <button
                onClick={handleCloseModal}
                className="bg-[#182d70] text-white px-6 py-2 rounded-md hover:bg-[#0d6efd]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerForm;