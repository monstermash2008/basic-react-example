import { useEffect, useState } from "react";

type Synonym = {
  word: string;
  score: number;
  tags: string[];
};

function Home() {
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
    <div className="flex flex-col flex-1 w-full text-center gap-y-2 p-4">
      <h1 className="font-extrabold text-2xl mb-4">Top 10 Synonyms</h1>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className="border-gray-600 border rounded-3xl px-4 py-2"
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

export default Home;
