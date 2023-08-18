function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage >= 85) {
    emoji = "🥇";
  }
  if (percentage < 85 && percentage >= 70) {
    emoji = "🥈";
  }
  if (percentage < 70 && percentage >= 60) {
    emoji = "🥉";
  }

  return (
    <>
      <p className="result">
        You scored {points} out of {maxPossiblePoints} ({percentage}) {emoji}
      </p>
      <p className="highscore">Highscore is {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
