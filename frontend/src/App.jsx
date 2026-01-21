import React, { useState, useEffect } from "react"; // Add useEffect
import axios from "./utils/axios";

// this is the third commit
// this is the fourth commit

const App = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]); // Explicitly array
  const [loading, setLoading] = useState(false);

  // Log on update—catches async setState
  useEffect(() => {
    if (questions.length > 0) {
      console.log("Fresh questions loaded:", questions);
    }
  }, [questions]);
  const generateQuiz = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/generate-quiz", { topic });
      console.log("Raw API response:", res.data);

      let quizQuestions = res.data.Questions; // Grab capital Q
      console.log("Raw Questions:", quizQuestions); // Debug: Array? Object?

      // If object (e.g., {"0": {...}}), convert to array
      if (
        quizQuestions &&
        typeof quizQuestions === "object" &&
        !Array.isArray(quizQuestions)
      ) {
        quizQuestions = Object.values(quizQuestions);
        console.log("Converted to array:", quizQuestions);
      }

      setQuestions(quizQuestions || []); // Safe fallback
    } catch (error) {
      console.error("Quiz fetch error:", error.response?.data || error);
      alert("Oops—quiz gen failed! Backend might need a prompt tweak.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        AI Quiz Builder
      </h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <input
          type="text"
          placeholder="Enter topic (e.g., Python basics)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={generateQuiz}
          disabled={loading || !topic.trim()} // Bonus: Disable if no topic
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Create Quiz!"}
        </button>
      </div>
      {questions?.length > 0 && ( // Fixed: Direct length check
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Quiz Questions:</h2>
          {questions.map((q, i) => {
            console.log(q[1].question);

            <div key={i} className="mb-4 p-4 border rounded">
              <p className="font-medium">{q.question}</p>
              <ul className="mt-2 list-disc list-inside">
                {q.options?.map(
                  (
                    opt,
                    j // Optional chain for safety
                  ) => (
                    <li key={j}>{opt}</li>
                  )
                )}
              </ul>
              <p className="mt-2 text-sm text-green-600">
                <strong>Answer:</strong> {q.answer} | <em>{q.explanation}</em>
              </p>
            </div>;
          })}
        </div>
      )}
      {questions.length === 0 &&
        !loading &&
        topic && ( // Debug helper: Empty state
          <p
            className={`text-white text-center mt-4 ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading
              ? "AI brewing questions..."
              : !topic
              ? "Enter a topic!"
              : "No questions yet—hit generate!"}
          </p>
        )}
    </div>
  );
};

export default App;
