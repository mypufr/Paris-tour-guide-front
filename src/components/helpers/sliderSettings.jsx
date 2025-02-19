export const settings1 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slideseToScroll: 2,
  arrows: true,
  rows: 2,
};




export const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slideseToScroll: 2,
  arrows: true,
  rows: 1,
  // pagination: {
  //   clickable: true,
  // },
  // navigation: true,
};


export const settings3 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slideseToScroll: 2,
  arrows: true,
  rows: 1,
};

export const settings4 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slideseToScroll: 2,
  arrows: true,
  rows: 2,
};


export const settings5 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slideseToScroll: 2,
  arrows: true,
  rows: 1,
  // afterChange: (index) => setCurrentSlide(index + 1),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
      },
    },

    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
      },
    },

    {
      breakpoint: 375,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
      },
    },

    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
      },
    },
  ],
};