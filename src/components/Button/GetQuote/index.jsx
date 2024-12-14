import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import GetQuoteForm from '../../UiComponents/Form/GetQuoteForm';

const GetQuote = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed -right-10 top-[41%] sm:top-[41%] md:top-[50%] lg:top-[50%] transform -translate-y-1/2 -rotate-90 z-40">
        <button
          className="button transition duration-300"
          onClick={openModal}
        >
          Get a Quote
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>

          <div className="relative rounded-xl shadow-lg w-full max-w-md mx-auto z-50 bg-transparent">
            <button
              className="absolute top-4 right-4 text-gray-100 hover:text-gray-200 transition duration-300 border-[3px] border-gray-100 hover:border-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} size="md" />
            </button>
            <GetQuoteForm />
          </div>
        </div>
      )}
    </>
  );
};

export default GetQuote;
