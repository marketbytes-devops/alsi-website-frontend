import React, { useEffect, useState } from 'react';
import apiClient from "../../../../api";
import Title from '../../../../components/Title';

const MissionVision = () => {
  const [title, setTitle] = useState("Mission Vision Purpose");
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionVision = async () => {
      try {
        const response = await apiClient.get("/about/mission-vision/");
        const data = response.data;

        if (data && data.length > 0 && data[0].entries) {
          setTitle(data[0].title);  
          setEntries(data[0].entries);  
        } else {
          setError("No mission, vision, or purpose available");
        }
      } catch (err) {
        setError("Failed to load mission, vision, and purpose. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissionVision();
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
          <div className="flex flex-col md:flex-row md:justify-center md:space-x-6 space-y-6 md:space-y-0">
            {entries.map((entry) => (
              <div
                className="flex flex-col items-center rounded-lg shadow-lg p-5 w-full md:w-1/3 text-center bg-[linear-gradient(180deg,rgba(25,51,119,0.85),rgba(0,154,219,0.85))] hover:bg-[linear-gradient(to right,rgba(25,51,119,0.85),rgba(0,154,219,0.85))] hover:scale-105 transform transition-all duration-300"
                key={entry.id}
                style={{
                  color: "white",
                  minHeight: "auto",
                }}
              >
                <img
                  src={entry.image}
                  alt={`${entry.title} image`}
                  className="mt-4 h-16 w-16 object-cover"
                />
                <h2 className="text-xl font-bold mt-4">{entry.title}</h2>
                <p className="mt-4">{entry.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MissionVision;
