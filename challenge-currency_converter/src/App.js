// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";
export default function App() {
  const [inpAmount, setInpAmout] = useState(1);
  const [fromCur, setFromCur] = useState("INR");
  const [toCur, setToCur] = useState("USD");

  const [output, setOutput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getConvertedCur() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${inpAmount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();

        // console.log(data.rates);

        setIsLoading(false);
        setOutput(data.rates[toCur]);
      }
      if (fromCur !== toCur) {
        getConvertedCur();
      } else {
        setOutput(inpAmount);
      }

      // setOutput(output);
    },
    [inpAmount, fromCur, toCur]
  );

  return (
    <div>
      <input
        type="text"
        value={inpAmount}
        onChange={(e) => setInpAmout(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {output} {toCur}
        </p>
      )}
    </div>
  );
}
