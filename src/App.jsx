import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1 className="mb-7">PASSWORD GENERATOR</h1>
        <div className="flex justify-between w-50% h-[10vh] rounded-lg gap-2">
          <input
            type="text"
            className="outline-none w-full rounded-2xl text-2xl text-gray-400"
            readOnly
          />
          <button className="bg-gray-600 text-2xl rounded-2xl text-blue-900 font-bold">
            Copy
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
