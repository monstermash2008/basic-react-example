import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col w-full max-w-screen-lg m-0 p-8 text-center gap-y-2">
      <p>Count: {count}</p>
      <button className="bg-slate-700 rounded-3xl" onClick={() => setCount((count) => count + 1)}>Click me</button>
    </div>
  );
}

export default App;
