import React, { useEffect, useState } from 'react';
import teamBg from "../../../../assets/images/About/about-team.webp";
import apiClient from "../../../../api";
import Title from '../../../../components/Title';

const Team = () => {
  const [title, setTitle] = useState("Our Team");
  const [teamEntries, setTeamEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await apiClient.get("/about/our-team/");
        const data = response.data;

        if (data && data.length > 0 && data[0].entries) {
          setTitle(data[0].title); 
          setTeamEntries(data[0].entries); 
        } else {
          setTitle("No Team Members Available");
        }
      } catch (err) {
        setError("Failed to load team members. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div 
      className="container mx-auto px-4 sm:px-4 md:px-12 lg:px-12 py-8" 
      style={{
        background: `url(${teamBg})`, 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "center", 
        backgroundSize: "cover"
      }}
    >
      <div className="text-center pb-4">
        <Title title={title} color='white' />
      </div>

      {isLoading ? (
        <div className="text-center text-white">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : teamEntries.length === 0 ? (
        <div className="text-center text-white">No team members available</div>
      ) : (
        <div className="flex flex-wrap -mx-4">
          {teamEntries.map((entry, index) => (
            <div key={entry.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6">
              <div 
                className="bg-white text-black hover:text-white shadow-lg p-4 text-center transition-all duration-300 hover:bg-gradient-to-b hover:from-[#2b4588] hover:to-[#009adb]"
              >
                {/* {entry.image && (
                  <img 
                    src={entry.image} 
                    alt={entry.name} 
                    className="w-full h-auto object-cover mb-4" 
                  />
                )} */}
                <h2 className="text-lg font-bold mb-2">{entry.name}</h2>
                <p>{entry.position}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;
