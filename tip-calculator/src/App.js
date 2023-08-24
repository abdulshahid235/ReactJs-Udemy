import "./App.css";
import { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [userTip, setUserTip] = useState("10");
  const [friendTip, setFriendTip] = useState("10");
  // const [isChanged, setIsChanged] = useState(false);

  const avgTip = (Number(userTip) + Number(friendTip)) / 2;

  console.log(`Average tip is ${avgTip}`);
  // console.log(isChanged);

  function handleClickReset() {
    setBill(0);
    setUserTip("10");
    setFriendTip("10");
  }

  // const review = ["bad", "good", "amazing"];
  return (
    <div className="App">
      <Bill
        bill={bill}
        setBill={setBill}
        // isChanged={isChanged}
        // setIsChanged={setIsChanged}
      />
      <ServiceReview
        text="How did you like the service?"
        tip={userTip}
        setTip={setUserTip}
        // isChanged={isChanged}
        // setIsChanged={setIsChanged}
      />
      <ServiceReview
        text="How did your friend like the service?"
        tip={friendTip}
        setTip={setFriendTip}
        // isChanged={isChanged}
        // setIsChanged={setIsChanged}
      />
      {bill > 0 && (
        <>
          <Total bill={Number(bill)} avgTip={avgTip} />
          <Reset onClickReset={handleClickReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, setBill, setIsChanged }) {
  return (
    <div>
      <h3>How much was the bill?</h3>
      <input
        type="text"
        placeholder="Bill Amount"
        value={bill}
        onChange={(e) => {
          setBill(e.target.value);
          // setIsChanged(true);
        }}
      ></input>
    </div>
  );
}

function ServiceReview({ text, tip, setTip, setIsChanged }) {
  function handleClick(val) {
    console.log(val);
    setTip(val);
    // setIsChanged(true);
  }
  return (
    <div>
      <h3>{text}</h3>
      <select value={tip} onChange={(e) => handleClick(e.target.value)}>
        <option value="0">It was bad 0%</option>
        <option value="10">It was good 10%</option>
        <option value="20">It was amazing 20%</option>
      </select>
    </div>
  );
}

function Total({ bill, avgTip }) {
  const tip = bill * (avgTip / 100);
  const total = bill + tip;
  return (
    <div>
      <h1>
        You pay ${total} (${bill} bill + ${tip} tip)
      </h1>
    </div>
  );
}

function Reset({ onClickReset }) {
  return (
    <div>
      <button
        onClick={() => {
          onClickReset();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
