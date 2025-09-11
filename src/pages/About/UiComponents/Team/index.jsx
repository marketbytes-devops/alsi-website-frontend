import React, { useEffect, useState } from "react";
import teamBg from "../../../../assets/images/About/about-team.webp";
import apiClient from "../../../../api";
import Title from "../../../../components/Title";

const Team = () => {
  const [title, setTitle] = useState("Our Team");
  const [teamEntries, setTeamEntries] = useState([]);
  const [isLoadingTitle, setIsLoadingTitle] = useState(true);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await apiClient.get("/about/our-team/");
        const data = response.data;

        if (data && data.title) {
          setTitle(data.title);
        } else {
          setTitle("Our Team");
        }
      } catch (err) {
        // Silently fail, no error handling
      } finally {
        setIsLoadingTitle(false);
      }
    };

    const fetchTeamMembers = async () => {
      try {
        const response = await apiClient.get("/about/our-team-entries/");
        const data = response.data;

        if (data && data.length > 0) {
          setTeamEntries(data);
        }
      } catch (err) {
        // Silently fail, no error handling
      } finally {
        setIsLoadingTeam(false);
      }
    };

    fetchTitle();
    fetchTeamMembers();
  }, []);

  if (!teamEntries.length && !isLoadingTeam) {
    return <div></div>;
  }

  return (
    <div
      className="container mx-auto px-4 sm:px-4 md:px-12 lg:px-12 py-8"
      style={{
        background: `url(${teamBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center pb-4">
        {isLoadingTitle ? (
          <div></div>
        ) : (
          <Title title={title} color="white" />
        )}
      </div>

      {isLoadingTeam ? (
        <div></div>
      ) : (
        <div className="flex flex-wrap -mx-4">
          {teamEntries.map((entry) => (
            <div key={entry.id} className="w-full sm:w-1/2 md:w-1/3 px-3 mb-6">
              <div className="bg-white text-[#212529] hover:text-white shadow-lg p-4 text-center transition-all duration-300 hover:bg-gradient-to-b hover:from-[#2b4588] hover:to-[#009adb]">
                {/* {entry.image && (
                  <img
                    src={entry.image}
                    alt={entry.name}
                    className="w-full h-auto object-cover mb-4"
                  />
                )} */}
                <h2
                  className="text-lg font-bold mb-2"
                  dangerouslySetInnerHTML={{ __html: entry.name }}
                />
                <p dangerouslySetInnerHTML={{ __html: entry.position }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;