import React, { useEffect, useState } from 'react';
import apiClient from "../../../../api";
import Title from '../../../../components/Title';

const Certification = () => {
  const [title, setTitle] = useState("Membership and Certifications");
  const [certifications, setCertifications] = useState([]);
  const [isLoadingTitle, setIsLoadingTitle] = useState(true);
  const [isLoadingCertifications, setIsLoadingCertifications] = useState(true);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await apiClient.get("about/member/");
        const data = response.data;
        
        if (data && data[0] && data[0].title) {
          setTitle(data[0].title);
        }
      } catch (err) {
        // Silently fail, no error handling
      } finally {
        setIsLoadingTitle(false);
      }
    };

    const fetchCertifications = async () => {
      try {
        const response = await apiClient.get("about/member-entries/");
        const data = response.data;

        if (data && data.length > 0) {
          setCertifications(data);
        }
      } catch (err) {
        // Silently fail, no error handling
      } finally {
        setIsLoadingCertifications(false);
      }
    };

    fetchTitle();
    fetchCertifications();
  }, []);

  if (isLoadingTitle || isLoadingCertifications) {
    return <div></div>;
  }

  if (!certifications.length) {
    return <div></div>;
  }

  return (
    <>
      <Title title={title} />
      <div className="mt-0 sm:mt-0 md:mt-8 lg:mt-8 xl:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {certifications.map((certification) => (
          <div
            key={certification.id}
            className='card shadow-lg shadow-gray-500 hover:shadow-gray-600 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center p-8'
          >
            <img
              src={certification.image}
              className='w-auto h-14'
              alt="Certification"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Certification;