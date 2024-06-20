/*
(A)useCallbacks(()=>{},[]):- 
(i)react hook that lets you cache a fx defination b/w re renders! 
(ii)dependencies are written in form of array :- fOr optimization & caching .
(B)useEffect(()=>{},[]):-
(i) react hook which runs the fx automatically!
(ii)dependencies are stored inside array and fx is run whenever the dependencies change!
(C)useRef:-
(i)lets us to reference a value!
(ii)valriable has to be created to use useRef:-
const someRef = useRef(null)
ref={someRef} is passed as an attribute to the tag we want ref of,{for selection}!
*/
"useclient";
import { useCallback, useState, useEffect,useRef } from "react";
import "./App.css";

function App() {
  let [length, setLength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");
  const  passwordRef = useRef(null);

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
  }, [length, numAllowed, charAllowed, setPassword]); //setPassword given here for method optimization.

  const copyPasteToClipboard = () => {
    passwordRef.current?.select();
   // passwordRef.current?.setSelectionRange(0,6); it will select the range!
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGen();
  }, [length, numAllowed, charAllowed, passwordGen]); //given here to run the fx again if dependency changes!

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
            ref={passwordRef}
          />
          <button
            className="bg-gray-600 text-2xl rounded-2xl text-blue-900 font-bold"
            onClick={() => {
              copyPasteToClipboard();
            }}
          >
            Copy
          </button>
        </div>
        <div className="flex gap-3 text-gray-400">
          <input
            type="range"
            min={8}
            max={12}
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
