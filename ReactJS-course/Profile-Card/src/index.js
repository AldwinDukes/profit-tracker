import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const skills = [
  {
    skill: "React",
    level: "beginner",
    color: "#60DAFB",
  },

  {
    skill: "Html",
    level: "advanced",
    color: "#eb6734",
  },

  {
    skill: "Css",
    level: "advanced",
    color: "#a4eb34",
  },

  {
    skill: "Javascript",
    level: "intermediate",
    color: "#ebe834",
  },

  {
    skill: "Tailwind",
    level: "beginner",
    color: "#34ebde",
  },
];

function MainContainer() {
  return (
    <div className="mainContainer">
      <div>
        <AvatarImg name="profile-img.jpg" />
      </div>

      <div className="wrap">
        <ProfileName name="Aldwin Duque" />

        <Bio bio="I’m a web developer who enjoys turning ideas into clean, functional, and user-friendly web experiences. I work mainly with JavaScript and modern front-end tools, focusing on writing readable code and building responsive interfaces. I’m always learning new technologies and improving my skills through real projects and continuous practice." />

        <Skill skills={skills} />
      </div>
    </div>
  );
}

function AvatarImg(props) {
  return <img className="img-profile" src={props.name} alt="profile-img"></img>;
}

function ProfileName(props) {
  return <h1 className="profile-name">{props.name}</h1>;
}

function Bio(props) {
  return <p className="profile-bio">{props.bio}</p>;
}

function Skill({ skills }) {
  //console.log(skills);
  const emojiLevel = {
    beginner: "👶",
    intermidiate: "👍",
    advanced: "💪",
  };

  return (
    <>
      <ul className="skill-list">
        {skills.map((skill) => (
          <li className="list" style={{ backgroundColor: skill.color }}>
            {skill.skill}
            <span>{emojiLevel[skill.level]}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

//######## Fix Emoji for every LEVEL ###########

// function Skills(props) {
//   const style = { backgroundColor: SkillRandomColor() };

//   return (
//     <li className="list" style={style}>
//       {props.skill} <span>{EmojiRandomGenerator()}</span>
//     </li>
//   );
// }

// function SkillRandomColor() {
//   let randomColor = Math.floor(Math.random() * 0xffffff).toString(16);

//   randomColor = randomColor.padStart(6, "0");

//   let hexCode = "#" + randomColor.toUpperCase();

//   return hexCode;
// }

// function EmojiRandomGenerator() {
//   const emojis = ["💻", "🤖", "🚀", "💡"];

//   const randomIndex = Math.floor(Math.random() * emojis.length);

//   return emojis[randomIndex];
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
