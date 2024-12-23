import React, { useEffect, useState } from "react";
import apiClient from "../../../../api";
import Title from "../../../../components/Title";

const MissionVision = () => {
  const [title, setTitle] = useState("Mission Vision Purpose");
  const [entries, setEntries] = useState([]);
  const [isLoadingTitle, setIsLoadingTitle] = useState(true);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorEntries, setErrorEntries] = useState(null);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await apiClient.get("/about/mission/");
        const data = response.data;

        if (data && data.length > 0 && data[0].title) {
          setTitle(data[0].title); 
        } else {
          setErrorTitle("Title not available");
        }
      } catch (err) {
        setErrorTitle("Failed to load title. Please try again.");
      } finally {
        setIsLoadingTitle(false);
      }
    };

    const fetchEntries = async () => {
      try {
        const response = await apiClient.get("/about/mission-entries/");
        const data = response.data;

        if (data && data.length > 0) {
          setEntries(data);
        } else {
          setErrorEntries("No mission, vision, or purpose entries available");
        }
      } catch (err) {
        setErrorEntries("Failed to load entries. Please try again.");
      } finally {
        setIsLoadingEntries(false);
      }
    };

    fetchTitle();
    fetchEntries();
  }, []);

  return (
    <>
      {isLoadingTitle || isLoadingEntries ? (
        <div className="text-center text-white">Loading...</div>
      ) : errorTitle ? (
        <div className="text-center text-red-500">{errorTitle}</div>
      ) : errorEntries ? (
        <div className="text-center text-red-500">{errorEntries}</div>
      ) : (
        <>
        <div className="pb-4">
        <Title title={title} />
        </div>
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
                {entry.image && (
                  <img
                    src={entry.image}
                    alt={`${entry.title} image`}
                    className="mt-4 h-16 w-16 object-cover"
                  />
                )}
                <h2
                  className="text-xl font-bold mt-4"
                  dangerouslySetInnerHTML={{ __html: entry.title }}
                />
                <p
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: entry.description }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MissionVision;
