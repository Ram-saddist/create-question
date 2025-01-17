import React from "react";

function CompilerHome() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100  min-h-screen flex flex-col items-center justify-center">
      <header className="text-center mt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          "Code is like humor. When you have to explain it, it’s bad."
        </h1>
        <p className="text-xl mt-4 text-gray-600 italic">
          - Then We are your Dad <b> "Codegnan"</b>
        </p>
      </header>

      <section className="mt-12 px-6 text-center max-w-3xl">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Welcome to the most intuitive online compiler. Empower yourself to write, debug, and execute code in real-time.
          Our platform supports multiple programming languages, offers real-time feedback, and is designed for learners and professionals alike.
        </p>
        <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed">
          Ready to turn your ideas into reality? Start coding now and experience the joy of creation.
        </p>
      </section>
      <div className="mt-10">
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-full shadow-lg transform hover:scale-105 hover:bg-blue-600 transition duration-300"
          onClick={() =>
            (window.location.href = "https://code-quest-platform.lovable.app/login")
          }
        >
          Start Coding
        </button>
      </div>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-11/12 md:w-2/4">
        {/* Card 1: Total Questions Solved */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Questions Solved</h3>
          <p className="text-4xl font-bold text-blue-500 mt-4">256</p>
        </div>

        {/* Card 2: Leaderboard Ranking */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Leaderboard Ranking</h3>
          <p className="text-4xl font-bold text-green-500 mt-4">#15</p>
        </div>

        {/* Card 3: Score */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Score</h3>
          <p className="text-4xl font-bold text-yellow-500 mt-4">8250</p>
        </div>
      </section>

     

      <footer className="mt-20 text-center">
        <p className="text-gray-600 text-sm">
          Built with 💻 and ❤️ by Codegnan. © 2025 All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default CompilerHome;
