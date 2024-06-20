"useclient";
import { useCallback, useState, useEffect } from "react";
import "./App.css";

function App() {
  let [length, setLength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGen();
  }, [length, numAllowed, charAllowed, passwordGen]);

  return (
    <>
      <div>
        <h1 className="mb-7">PASSWORD GENERATOR</h1>
        <div className="flex justify-between w-50% h-[10vh] rounded-lg gap-2">
          <input
            type="text"
            placeholder="PASSWORD"
            value={password}
            className="p-5 outline-none w-full rounded-2xl text-2xl text-gray-400"
            readOnly
          />
          <button className="bg-gray-600 text-2xl rounded-2xl text-blue-900 font-bold">
            Copy
          </button>
        </div>
        <div className="bg-white flex gap-3 text-red-900">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length : {length}</label>
          <input
            id="numInput"
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numInput">Numbers</label>
          <input
            id="charInput"
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
