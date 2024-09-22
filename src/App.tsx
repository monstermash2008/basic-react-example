import { useEffect, useState } from "react";

type Synonym = {
  word: string;
  score: number;
  tags: string[];
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [synonymsData, setSynonymsData] = useState<Synonym[]>([]);

  const findRelatedWords = async (searchTerm: string) => {
    const result = await fetch(
      `https://api.datamuse.com/words?ml=${searchTerm}`
    );
    const data = (await result.json()) as Synonym[];
    setSynonymsData(data);
  };

  useEffect(() => {
    if (searchTerm) {
      findRelatedWords(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col w-full max-w-screen-lg m-0 p-8 text-center gap-y-2">
      <h1 className="font-extrabold text-2xl mb-4">Top 10 Synomyms</h1>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className="bg-slate-700 rounded-3xl px-4 py-2"
        placeholder="Search for related words..."
      />

      <ol>
        {synonymsData.slice(0, 10).map((synonym) => (
          <li key={synonym.word} className="flex justify-between p-2">
            <span className="font-bold">{synonym.word}</span>
            <span>{synonym.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
