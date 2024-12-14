import React, { useEffect, useState } from 'react';
import apiClient from "../../../../api";
import Title from '../../../../components/Title';

const Certification = () => {
  const [title, setTitle] = useState("Membership and Certifications");
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await apiClient.get("/about/certifications/");
        const data = response.data;

        if (data && data.length > 0 && data[0].entries) {
          setTitle(data[0].title); 
          setCertifications(data[0].entries); 
        } else {
          setError("No certifications available");
        }
      } catch (err) {
        setError("Failed to load certifications. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="text-center text-white">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <Title title={title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className='card shadow-lg shadow-gray-400 hover:shadow-gray-400 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center p-8'
              >
                <img
                  src={certification.image}
                  className='w-auto h-16'
                  alt="Certification"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Certification;
