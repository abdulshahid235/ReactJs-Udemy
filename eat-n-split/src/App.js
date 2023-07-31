import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [addFriend, setAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [bill, setBill] = useState("");
  const [myExp, setMyExp] = useState("");
  const [paidBy, setPaidBy] = useState("You");

  // console.log(friends);

  function displayAddFriendForm() {
    if (selectedFriend !== null) {
      setSelectedFriend(null);
    }
    setAddFriend(!addFriend);
  }

  function handleClickSelect(friend) {
    // console.log(friend.name);
    // console.log(selectedFriend);

    if (addFriend === true) {
      setAddFriend(false);
    }

    if (selectedFriend === null) {
      setSelectedFriend(friend);
    } else if (friend.name === selectedFriend.name) {
      setSelectedFriend(null);
    } else if (friend.name !== selectedFriend.name) {
      setSelectedFriend(friend);
    }

    // friend.name === selectedFriend
    //   ? setSelectedFriend(null)
    //   : setSelectedFriend(friend);
    // console.log(selectedFriend);
  }

  function onHandleSubmitSplit(e) {
    e.preventDefault();
    // console.log(`In handle submit split`);
    // console.log(paidBy);
    if (paidBy === "You" && bill - myExp > 0) {
      selectedFriend.balance = selectedFriend.balance + (bill - myExp);
    }

    if (paidBy === "friend" && myExp > 0) {
      // console.log(`its here`);
      // console.log(selectedFriend.name);
      selectedFriend.balance = selectedFriend.balance - myExp;
    }
    setBill(0);
    setMyExp(0);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSetSelectedFriend={handleClickSelect}
          selectedFriend={selectedFriend}
        />

        {addFriend && (
          <>
            <FormAddFriend
              friends={friends}
              onSetFriends={setFriends}
              displayAddFriendForm={displayAddFriendForm}
            />
            <Button onClickHandle={displayAddFriendForm}>Close</Button>
          </>
        )}

        {!addFriend && (
          <Button onClickHandle={displayAddFriendForm}>Add Friend</Button>
        )}
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          bill={bill}
          setBill={setBill}
          myExp={myExp}
          setMyExp={setMyExp}
          paidBy={paidBy}
          setPaidBy={setPaidBy}
          onHandleSubmitSplit={onHandleSubmitSplit}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSetSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          onSetSelectedFriend={onSetSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSetSelectedFriend, selectedFriend }) {
  return (
    <li className={selectedFriend === friend ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p className="green">You and {friend.name} are even</p>
      )}

      <Button onClickHandle={() => onSetSelectedFriend(friend)}>
        {selectedFriend === null
          ? "Select"
          : selectedFriend.name === friend.name
          ? "Close"
          : "Select"}
      </Button>
    </li>
  );
}

function Button({ onClickHandle, children }) {
  return (
    <button className="button" onClick={onClickHandle}>
      {children}
    </button>
  );
}

function FormAddFriend({ friends, onSetFriends, displayAddFriendForm }) {
  const [friendName, setFriendName] = useState(null);
  const [imageURL, setImageURL] = useState("https://i.pravatar.cc/48?u=");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: friendName,
      image: `${imageURL}+${id}`,
      balance: 0,
    };

    console.log(newFriend);

    onSetFriends([...friends, newFriend]);

    setFriendName("");
    setImageURL("https://i.pravatar.cc/48?u=");

    displayAddFriendForm();
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      ></input>

      <label type="text">🖼️ Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({
  selectedFriend,
  bill,
  setBill,
  myExp,
  setMyExp,
  paidBy,
  setPaidBy,
  onHandleSubmitSplit,
}) {
  let friendExp = bill - myExp;

  return (
    <form className="form-split-bill" onSubmit={(e) => onHandleSubmitSplit(e)}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🕴️ Your expense</label>
      <input
        type="text"
        value={myExp}
        onChange={(e) =>
          setMyExp(
            Number(e.target.value) > bill ? myExp : Number(e.target.value)
          )
        }
      ></input>

      <label>🧑‍🤝‍🧑{selectedFriend.name}'s expenses</label>
      <input type="text" disabled value={friendExp}></input>

      <label>🤑 Who is paying the bill?</label>
      <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
        <option value="You">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
export default App;
