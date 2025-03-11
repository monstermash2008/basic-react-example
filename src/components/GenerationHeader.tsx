import { generationInfo } from "../data/generationInfo";
import { useRef, useState, useEffect } from "react";

type GenerationHeaderProps = {
  genNumber: number;
  setSearchParams: (params: { gen: string }) => void;
  pokemonCount: number;
};

function GenerationHeader({
  genNumber,
  setSearchParams,
  pokemonCount,
}: GenerationHeaderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Scroll to the active generation when it changes
  useEffect(() => {
    if (scrollContainerRef.current && genNumber) {
      const index = genNumber - 1;
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const buttonWidth =
        scrollContainerRef.current.children[0]?.clientWidth || 0;
      const scrollPosition =
        index * buttonWidth - containerWidth / 2 + buttonWidth / 2;

      scrollContainerRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  }, [genNumber]);

  // Hide scroll indicator after user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sticky w-full top-0 bg-[var(--background)] z-10 pb-4 shadow-sm">
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          Pokémon By Generation
        </h1>

        {/* Mobile Carousel (visible on small screens only) */}
        <div className="md:hidden relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 pt-3 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={() => setShowScrollIndicator(false)}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `,
              }}
            />

            {generationInfo.map((gen) => (
              <div
                key={gen.number}
                className="flex-shrink-0 w-28 mr-2 snap-center pt-2 pb-1"
              >
                <button
                  onClick={() =>
                    setSearchParams({ gen: gen.number.toString() })
                  }
                  className={`w-full h-full ${
                    genNumber === gen.number
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--background)]"
                      : "bg-[var(--sidebar)] text-[var(--text)] border border-[var(--sidebar-hover)]"
                  } p-3 rounded-lg transition-all duration-200`}
                >
                  <div className="text-center">
                    <div className="font-bold mb-1">Gen {gen.number}</div>
                    <div
                      className={
                        genNumber === gen.number
                          ? "text-blue-100 text-xs"
                          : "text-[var(--text)] opacity-60 text-xs"
                      }
                    >
                      {gen.region}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Scroll indicator animation */}
          {showScrollIndicator && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[var(--background)] via-[var(--background)] to-transparent w-12 h-full flex items-center justify-center">
              <div className="w-6 h-6 animate-bounce opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Dots indicator for mobile carousel */}
          <div className="flex justify-center mt-3">
            {generationInfo.map((gen) => (
              <button
                key={`dot-${gen.number}`}
                onClick={() => {
                  setSearchParams({ gen: gen.number.toString() });
                }}
                className={`mx-1 h-2 rounded-full transition-all duration-200 ${
                  genNumber === gen.number
                    ? "bg-blue-500 w-6"
                    : "bg-[var(--sidebar-hover)] w-2"
                }`}
                aria-label={`Go to Generation ${gen.number}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid (hidden on small screens) */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {generationInfo.map((gen) => (
            <button
              key={gen.number}
              onClick={() => setSearchParams({ gen: gen.number.toString() })}
              className={`relative group p-3 rounded-lg transition-all duration-200 ${
                genNumber === gen.number
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--background)]"
                  : "bg-[var(--sidebar)] hover:bg-[var(--sidebar-hover)] text-[var(--text)] border border-[var(--sidebar-hover)]"
              }`}
            >
              <div className="text-center">
                <div className="font-bold mb-1">Gen {gen.number}</div>
                <div
                  className={`text-xs ${
                    genNumber === gen.number
                      ? "text-blue-100"
                      : "text-[var(--text)] opacity-60"
                  }`}
                >
                  {gen.region}
                </div>
              </div>
              {/* Info tooltip on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 hidden group-hover:block z-20">
                <div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
                  <div className="font-semibold">{gen.region} Region</div>
                  <div>{gen.years}</div>
                  <div>{gen.count} Pokémon</div>
                </div>
                {/* Tooltip arrow */}
                <div className="border-solid border-t-gray-800 border-t-8 border-x-transparent border-x-8 border-b-0 h-0 w-0 mx-auto"></div>
              </div>
            </button>
          ))}
        </div>

        {/* Pokemon count indicator */}
        <div className="text-sm text-[var(--text)] opacity-60 text-center md:text-left">
          Showing {pokemonCount} Pokémon from the{" "}
          {generationInfo[genNumber - 1]?.region || ""} region
        </div>
      </div>
    </div>
  );
}

export default GenerationHeader;
