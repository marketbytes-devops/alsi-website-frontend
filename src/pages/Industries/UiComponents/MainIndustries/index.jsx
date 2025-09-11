import React, { useEffect, useState } from 'react';
import apiClient from '../../../../api';
import SecondLayout from '../../../../components/CardLR/SecondLayout';
import FirstLayout from '../../../../components/CardLR/FirstLayout';

const MainIndustries = () => {
  const [industriesData, setIndustriesData] = useState([]);

  useEffect(() => {
    const fetchIndustriesData = async () => {
      try {
        const response = await apiClient.get('industry/industry-entries/');
        setIndustriesData(response.data); 
      } catch (error) {
        
      }
    };

    fetchIndustriesData();
  }, []);

  return (
    <div>
      {industriesData.map((industry, index) => {
        const LayoutComponent = index % 2 === 1 ? SecondLayout : FirstLayout;
        
        return (
          <LayoutComponent
            key={industry.id}  
            imageUrl={industry.image || ''}
            title={industry.title.replace(/<\/?p>/g, '')} 
            description={industry.description.replace(/<\/?p>/g, '')} 
          />
        );
      })}
    </div>
  );
};

export default MainIndustries;
