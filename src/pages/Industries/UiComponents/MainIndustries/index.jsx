import React, { useEffect, useState } from 'react';
import apiClient from '../../../../api';
import SecondLayout from '../../../../components/CardLR/SecondLayout';
import FirstLayout from '../../../../components/CardLR/FirstLayout';

const MainIndustries = () => {
  const [industriesData, setIndustriesData] = useState([]);

  useEffect(() => {
    const fetchIndustriesData = async () => {
      try {
        const response = await apiClient.get('industry/industry-main/');
        const formattedData = response.data.flatMap((industry) =>
          industry.entries.map((entry, index) => ({
            id: industry.id,
            link: `/industries/${industry.id}`,
            imageUrl: entry.image || '',
            title: entry.title || '',
            description: entry.description || '',
            reverse: index % 2 === 1, 
          }))
        );
        setIndustriesData(formattedData);
      } catch (error) {
        console.error('Failed to fetch industry data:', error);
      }
    };

    fetchIndustriesData();
  }, []);

  return (
    <div>
      {industriesData.map((industry, index) => {
        return industry.reverse ? (
          <SecondLayout
            key={index}
            imageUrl={industry.imageUrl}
            title={industry.title}
            description={industry.description}
          />
        ) : (
          <FirstLayout
            key={index}
            imageUrl={industry.imageUrl}
            title={industry.title}
            description={industry.description}
          />
        );
      })}
    </div>
  );
};

export default MainIndustries;
