import soharImg from "../assets/images/Gallery/gallery-iftar-sohar.webp";
import muscatImg from "../assets/images/Gallery/gallery-iftar-muscat.webp";

const galleryData = {
  galleryItems: [
    {
      id: 1,
      title: "Iftar Sohar",
      year: 2024,
      bannerImg: soharImg,
      path: "/gallery/iftar_sohar",
      entries: {
        images: [
          { id: 1, url: soharImg },
          { id: 2, url: soharImg },
          { id: 3, url: soharImg },
          { id: 4, url: soharImg },
        ],
        videos: [
          {
            id: 1,
            link: "https://www.youtube.com/watch?v=oShoLMW5InU&feature=youtu.be/",
            thumbnail: muscatImg,
          },
          {
            id: 2,
            link: "https://www.youtube.com/watch?v=iITzYLr_e6s/",
            thumbnail: muscatImg,
          },
        ],
      },
    },
    {
      id: 2,
      title: "Iftar Muscat",
      year: 2024,
      bannerImg: muscatImg,
      path: "/gallery/iftar_muscat",
      entries: {
        images: [
          { id: 1, url: muscatImg },
          { id: 2, url: muscatImg },
          { id: 3, url: muscatImg },
          { id: 4, url: muscatImg },
        ],
        videos: [
          {
            id: 1,
            link: "https://www.youtube.com/watch?v=oShoLMW5InU&feature=youtu.be/",
            thumbnail: muscatImg,
          },
          {
            id: 2,
            link: "https://www.youtube.com/watch?v=iITzYLr_e6s/",
            thumbnail: muscatImg,
          },
        ],
      },
    },
  ],
};

export default galleryData;
