import React, { useState } from "react";
import ReCaptcha from "../../ReCaptcha";
import apiClient from "../../../api";

const CareerForm = () => {
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [fileName, setFileName] = useState("No File Chosen");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("message", formData.message);
    formPayload.append("file", formData.file);

    try {
      const response = await apiClient.post('careers/careers/', formPayload);
      console.log('Form submitted successfully:', response.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData((prevData) => ({ ...prevData, file }));
    } else {
      setFileName("No File Chosen");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      file: null,
    });
    setFileName("No File Chosen");
    setRecaptchaVerified(false); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="w-full md:w-1/2 p-4">
          <h1 className="mb-4">Be a part of ALSI</h1>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="bg-card" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="name">
                Name*
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter first and last name"
                className="mt-1 w-full block input"
                required
                value={formData.name}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, name: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="email">
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="Eg. youremail@email.com"
                className="mt-1 w-full block input"
                required
                value={formData.email}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="phone">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter 10-digit mobile number"
                className="mt-1 w-full block input"
                required
                value={formData.phone}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, phone: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-extrabold text-foreground" htmlFor="message">
                Message*
              </label>
              <textarea
                id="message"
                placeholder="Your Message"
                className="mt-1 w-full block input"
                required
                value={formData.message}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, message: e.target.value }))}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="cursor-pointer flex items-center text-black pr-4 rounded bg-gray-100 border border-gray-300 w-full">
                <span className="bg-gray-500 text-white py-2 px-4 rounded-sm">Choose File</span>
                <span className="ml-4 truncate">{fileName}</span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="flex items-center justify-left mb-4">
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

export default CareerForm;
