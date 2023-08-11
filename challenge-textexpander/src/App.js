import "./App.css";
import { useState } from "react";

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  children,
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "blue",
  expanded = false,
  className = "default-box",
}) {
  const [textOpen, setTextOpen] = useState(expanded);

  function truncate(str, no_words) {
    return str.split(" ").splice(0, no_words).join(" ");
  }
  let displayText = truncate(children, collapsedNumWords);

  return (
    <div className={className ? className : ""}>
      {textOpen ? (
        <div>
          <p>
            {children}
            <span
              style={{ cursor: "pointer", color: buttonColor }}
              onClick={() => setTextOpen(!textOpen)}
            >
              {collapseButtonText}
            </span>
          </p>
        </div>
      ) : (
        <p>
          {displayText}
          <span
            style={{ cursor: "pointer", color: buttonColor }}
            onClick={() => setTextOpen(!textOpen)}
          >
            ...{expandButtonText}
          </span>
        </p>
      )}
    </div>
  );
}
