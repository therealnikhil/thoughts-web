// Widths for responsive design
export const browserWidth = {
  xs: "(max-width: 767px)",
  sm: "(min-width: 768px) and (max-width: 991px)",
  md: "(min-width: 992px) and (max-width: 1199px)",
  lg: "(min-width: 1200px)"
};

export const containerWidth = {
  xs: "auto",
  sm: "750px",
  md: "970px",
  lg: "1170px"
};

// Login status
export var user;

export const updateLoginStatus = function() {
  user = localStorage.getItem("uid");
};

// modules
export const modules = {
  THOUGHTLIST: 0,
  HAPPYTHOUGHTS: 1,
  HABITS: 2
};

// moods
export const moods = {
  0: "Angry",
  1: "Frustrated",
  2: "Stressed",
  3: "Depressed",
  4: "Sad",
  5: "Meh",
  6: "Pleasant",
  7: "Happy",
  8: "Ecstatic"
};

// number of images to shuffle in happy thoughts module
export const bgCount = 13;