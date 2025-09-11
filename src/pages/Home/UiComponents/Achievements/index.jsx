import React, { useEffect, useState } from "react";
import CardBg from "../../../../assets/images/Home/Achievements-bg.webp";
import apiClient from "../../../../api";
import Title from "../../../../components/Title";

const Achievements = () => {
  const [title, setTitle] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState({ title: true, entries: true });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await apiClient.get("home/achievement/");
        const achievementsData = response.data;

        if (achievementsData.length > 0) {
          setTitle(achievementsData[0].title);
        } else {
          setTitle("No Achievements Available");
        }
      } catch (err) {
        // Silently fail, no error handling
      } finally {
        setIsLoading(prev => ({ ...prev, title: false }));
      }
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    const fetchAchievementEntries = async () => {
      try {
        const response = await apiClient.get("home/achievement-entries/");
        setAchievements(response.data || []);
      } catch (err) {
        // Silently fail, no error handling
      } finally {
        setIsLoading(prev => ({ ...prev, entries: false }));
      }
    };

    fetchAchievementEntries();
  }, []);

  const removeHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };

  if (!achievements.length && !isLoading.entries) {
    return <div></div>;
  }

  return (
    <>
      <div className="text-center pb-2 sm:pb-2 md:pb-2 lg:pb-4">
        <Title title={title} />
      </div>

      {isLoading.entries ? (
        <div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6">
          {achievements.map((achievement) => (
            <div key={achievement.id}>
              <div
                className="hover:scale-[1.02] transform-scale duration-300"
                style={{
                  background: `url(${CardBg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  padding: "20px",
                  aspectRatio: "1/0.5",
                  width: "100%",
                  height: "auto",
                }}
              >
                {achievement.image ? (
                  <img
                    src={achievement.image}
                    alt={removeHtmlTags(achievement.description || "Achievement image")}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-500">No image available</div>
                )}
              </div>
              <div className="text-center mt-4">
                {achievement.description ? (
                  <div
                    className="text-xl text-[#212529] font-extrabold"
                    dangerouslySetInnerHTML={{ __html: achievement.description }}
                  />
                ) : (
                  <p className="text-gray-500">No description available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Achievements;