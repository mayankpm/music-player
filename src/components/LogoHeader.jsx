export default function LogoHeader() {
    return (
      <section className="min-h-[8vh] w-full flex flex-col items-center justify-center text-center px-8 pt-8">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif" style={{ fontFamily: "Garamond, serif" }}>
          OPUS
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mt-3 font-serif">
          A premium music experience
        </p>
  
        {/* <div className="mt-8 animate-bounce text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div> */}
      </section>
    )
  }