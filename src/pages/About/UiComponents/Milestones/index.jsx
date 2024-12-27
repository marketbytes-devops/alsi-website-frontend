import React from "react";
import Marquee from "react-fast-marquee";
import vectorFirst from "../../../../assets/images/About/Vector-1.webp";
import vectorSecond from "../../../../assets/images/About/Vector-2.webp";
import alsiLogo from "../../../../assets/images/Home/logo.webp";
import timelineParnetWhite from "../../../../assets/images/About/timeline-white-partner.webp";
import timelineParnetBlue from "../../../../assets/images/About/timeline-blue-partner.webp";
import pin from "../../../../assets/images/About/pin.webp";

const Milestones = () => {
  const milestoneArray = [
    {
      year: "2008",
      title: "Foundation of Excellence",
      achievements: [
        "Established the Sohar Head Office",
        "Started with a team of 6 dedicated professionals",
      ],
    },
    {
      year: "2010",
      title: "Expanding Reach",
      achievements: [
        "Inaugurated the Muscat Branch Office",
        "Growing team, now with 9 members",
      ],
    },
    {
      year: "2011",
      title: "Border Ventures",
      achievements: [
        "Introduced Wajajah Export, Wajajah Import, and Buraimi Branch Offices",
        "Team expanded to 20 individuals",
      ],
    },
    {
      year: "2013",
      title: "Strides Towards Growth",
      achievements: ["Advanced to a 25-member strong team"],
    },
    {
      year: "2017",
      title: "Zones of Innovation",
      achievements: [
        "Launched Muscat Airport Branch Office",
        "Team now consists of 70 skilled members",
      ],
    },
    {
      year: "2020",
      title: "Dual Dynamics",
      achievements: [
        "Expanded into Muscat Sales and Dubai Branch Offices",
        "Team growth to 78 dedicated experts",
      ],
    },
    {
      year: "2021",
      title: "Expanding Horizons",
      achievements: [
        "Established Duqm and Hatta Branch Offices",
        "Team reached 85 committed individuals",
        "Awarded Best Customs Clearance Company of 2021 by Oman Customs",
      ],
    },
    {
      year: "2022",
      title: "Defying Challenges",
      achievements: [
        "Introduced Rub Al Khali and Qatar Branch Offices",
        "Team extended to 104 members",
        "Awarded Best Customs Clearance Company of 2022 Award by Oman Customs",
        "Honored with Smart Workplace 2022 Award by Dubai Customs",
      ],
    },
    {
      year: "2023",
      title: "Regional Resilience",
      achievements: [
        "Established Saudi Branch Office",
        "Team expanded to 135 skilled professionals",
      ],
    },
    {
      year: "",
      title: "",
      image: alsiLogo,
      achievements: [],
    },
  ];

  return (
    <div className="overflow-hidden">
      <div className="container text-[#212529] mx-auto text-center h-full">
        <h1 className="text-4xl font-extrabold">Celebrating 15 Years!</h1>
        <p className="text-3xl font-light mt-2">Journey Through Milestones</p>
      </div>
      <div className="relative w-full mx-auto">
        <Marquee
          gradient={false}
          pauseOnHover={true}
          speed={80}
          className="pt-[450px] pb-[330px]"
        >
          {milestoneArray.map((milestone, index) => {
            const isLast = index === milestoneArray.length - 1;
            const isEven = index % 2 === 0;

            return (
              <React.Fragment key={index}>
                <div
                  className="p-4 flex flex-col justify-center items-center text-center h-[195px] w-[195px] bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: isLast
                      ? "none"
                      : `url(${isEven ? vectorFirst : vectorSecond})`,
                    position: "relative",
                    top: isEven ? "-51px" : "62px",
                    zIndex: 9999,
                  }}
                >
                  <img
                    src={pin}
                    style={{
                      display: isLast ? "none" : null,
                      height: "150px",
                      position: "absolute",
                      top: index % 2 === 0 ? "151%" : "-52%",
                      left: "50%",
                      transform:
                        index % 2 !== 0
                          ? "translate(-50%, -50%)"
                          : "translate(-50% ,-50%) rotate(180deg)",
                    }}
                  />
                  <div
                    className="py-4 space-y-4 flex flex-col justify-center items-center text-center h-[200px] w-[200px] bg-no-repeat bg-contain"
                    style={{
                      backgroundImage: isLast
                        ? "none"
                        : `url(${
                            isEven ? timelineParnetWhite : timelineParnetBlue
                          })`,
                      position: "absolute",
                      top: isEven ? "75px" : "-37.1px",
                      left: isEven ? "-39.5px" : "34px",
                      width: isEven ? "280px" : "190px",
                      height: isEven ? "70.6%" : "2%",
                      zIndex: 1
                    }}
                  ></div>
                  <div
                    className={`flex items-center justify-center absolute ${
                      isEven ? "top-[380px]" : "bottom-[380px]"
                    }`}
                  >
                    <ul className="flex flex-col items-start justify-center text-left list-disc space-y-2 text-md">
                      {milestone.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative bottom-3">
                    {isLast ? (
                      <img
                        src={milestone.image}
                        className="w-48 h-48 object-contain relative bottom-[110px] right-[6.5px]"
                        alt="ALSI Logo"
                      />
                    ) : (
                      <>
                        <h2
                          className={`text-2xl font-bold ${
                            isEven ? "text-[#212529]" : "text-white"
                          }`}
                        >
                          {milestone.year}
                        </h2>
                        <h3
                          className={`text-sm font-medium ${
                            isEven ? "text-[#212529]" : "text-white"
                          }`}
                        >
                          {milestone.title}
                        </h3>
                      </>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
};

export default Milestones;
