
"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeedbackAnalysis() {
  const [feedbackSummary, setFeedbackSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeFeedback = async () => {
    setLoading(true);
    setFeedbackSummary("");

    try {
      const response = await fetch("/api/summarysale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to analyze feedback");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let resultText = "";

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          // Decode the streamed data
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          // Process each line
          for (const line of lines) {
            if (line.startsWith("0:")) {
              // Extract the feedback text from lines starting with "0:"
              const text = JSON.parse(line.slice(2).trim());
              resultText += text;
              setFeedbackSummary(resultText);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedbackSummary("Failed to fetch feedback analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Feedback Analysis</h1>
          <Link href="/">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </Link>
        </div>
        
        <div className="mb-8">
          <button 
            onClick={analyzeFeedback} 
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              "Analyze Feedback"
            )}
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Feedback Summary:</h3>
          <div className="bg-gray-50 rounded-lg p-4 min-h-32 border border-gray-200">
            {feedbackSummary ? (
              <p className="text-gray-700 whitespace-pre-line">{feedbackSummary}</p>
            ) : (
              <p className="text-gray-500 italic">Click the button to generate a summary.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}