import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Avatar />
      <Description />
      <Skills />
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
    </div>
  );
}

function Avatar() {
  return (
    <div>
      <img className="avatar" src="pic.jpg" alt="shahid" />
    </div>
  );
}

function Description() {
  return (
    <div className="data">
      <h1> Abdul Shahid Mohammed </h1>
      <p>
        A student and a front end developer. I like to code and when not coding,
        I like to work on my running goals. I am currently training for Half
        marathon which is on October 22, 2023 at Niagara Falls.
      </p>
    </div>
  );
}

function Skills() {
  let skillSet = ["HTML 💪", "CSS 💪", "JavaScript 🦾", "React 👶"];
  let colors = ["green", "skyblue", "yellow", "red"];

  let skillColors = skillSet.map((skill, i) => [skill, colors[i]]);
  console.log(skillColors[0][0]);

  // let skillhtml = skillSet.map((skill) => {
  //   return <Skill skill={skill} color="Yellow" />;
  // });

  let skillColorhtml = skillColors.map((x) => {
    return <Skill skill={x[0]} color={x[1]} />;
  });

  return <div className="skills">{skillColorhtml}</div>;
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <p>{props.skill}</p>
    </div>
  );
}
