import React, { useEffect, useState } from "react";
import CardBg from "../../../../assets/images/Home/Achievements-bg.webp";
import apiClient from "../../../../api";
import Title from "../../../../components/Title";

const Achievements = () => {
  const [title, setTitle] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await apiClient.get("home/achievements/");
        const achievementsData = response.data;

        if (achievementsData.length > 0) {
          setTitle(achievementsData[0].title);
          setAchievements(achievementsData);
        } else {
          setTitle("<p>No Achievements Available</p>");
        }
      } catch (err) {
        setError("Failed to load achievements. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <>
      <div className="text-center pb-2 sm:pb-2 md:pb-2 lg:pb-4">
        <Title title={title} />
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : achievements.length === 0 ? (
        <div className="text-center">No achievements available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6">
          {achievements.map((achievement) =>
            achievement.entries && achievement.entries.length > 0 ? (
              achievement.entries.map((entry, entryIndex) => (
                <div
                  key={`${achievement.id}-${entryIndex}`}
                  className="hover:scale-[1.02] transform-scale duration-300"
                >
                  <div
                    className="flex flex-col justify-between items-center"
                    style={{
                      background: `url(${CardBg})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      padding: "20px",
                    }}
                  >
                    {entry.image ? (
                      <img
                        src={entry.image}
                        alt={entry.description || "Achievement image"}
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-500">No image available</div>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    {entry.description ? (
                      <p
                        className="text-xl font-extrabold"
                        dangerouslySetInnerHTML={{ __html: entry.description }}
                      />
                    ) : (
                      <p className="text-gray-500">No description available</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div key={achievement.id} className="text-center text-gray-500">
                No entries available
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Achievements;
