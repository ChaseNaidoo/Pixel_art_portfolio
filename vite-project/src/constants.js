export const scaleFactor = 4;
const Co = {};

export const objectives = [
  { description: "Explore the map", completed: true },
  { description: "Find my resume", completed: false },
  { description: "Checkout my PC", completed: false },
  { description: "Checkout my cerficate", completed: false },
  { description: "Take a look at my degree", completed: false}
];

export const rewardTextContent = "Congratulations! All objectives completed! Thank you for visiting my portfolio!";

export const dialogueData = {
  pc: `This is my PC where I do most of my programming. My tech stack includes HTML, CSS, JavaScript, Python and React. Feel free to explore my <a href="https://github.com/ChaseNaidoo" target="_blank">Github</a> for a more in-depth look into my projects and experience.`,
  "alx_certificate": `This is my Certificate in Full-Stack Software Engineering from ALX Africa. I graduated with a specialization in Front-End Development.`,
  "biotech_degree": 'This is my degree, a National Diploma in Biotechnology from Tshwane University of Technology.',
  tv: `This is my TV. I occassionally enjoy a movie so bad that it is good. I also watch a few tech youtubers such as :
  <a href="https://www.youtube.com/@juxtopposed" target="_blank">Juxtopposed</a>, <a href="https://www.youtube.com/@Fireship" target="_blank">Fireship</a>,
  <a href="https://www.youtube.com/@GMTK" target="_blank">Game Maker's Toolkit</a> and <a href="https://youtube.com/@jslegenddev" target="_blank">JSLegendDev</a> who inspired this project.`,
  resume: `This is my desk and on it is my resume. <a href="https://github.com/ChaseNaidoo/Portfolio-Website/raw/main/img/Resume%20of%20Cameron%20Chase%20Naidoo.pdf" target="_blank">Check it out?</a>
  Contact me at chasenaidoo9@gmail.com if you have any interesting job opportunities or just want to chat.`,
  projects: `I have worked on various projects that showcased my expertise, ranging from aesthetically pleasing <a href="https://portfolio-website-mauve-nu.vercel.app" target="_blank">websites</a> to AI-powered applications that aim to solve real-world problems. One of the more notable projects that I led was <a href="https://github.com/ChaseNaidoo/PocketDerma" target="_blank">PocketDerma</a>, which utilized artificial intelligence to detect skin disease from an image uploaded by the user.`,
  library: `I believe the most valuable skill anyone could have is the ability to learn how to learn. Adapatability, curiousity and creativity are my greatest strengths and that has allowed me to continously learn and be better than the person who I was yesterday.`,
  exit: `If you want to exit the portfolio, just close the tab.`,
};