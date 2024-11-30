"use client";
import React, { useState } from "react";

interface Keyword {
  id: number;
  value: string;
}

export default function KeywordPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([{ id: 1, value: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addKeyword = () => {
    setKeywords([...keywords, { id: Date.now(), value: "" }]);
    setError(null);
  };

  const removeKeyword = (id: number) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((keyword) => keyword.id !== id));
      setError(null);
    }
  };

  const handleInputChange = (id: number, value: string) => {
    setKeywords(
      keywords.map((keyword) =>
        keyword.id === id ? { ...keyword, value: value.trim() } : keyword,
      ),
    );
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Validation
      const emptyKeywords = keywords.some((keyword) => !keyword.value);
      if (emptyKeywords) {
        throw new Error("Please fill in all keywords");
      }

      const values = keywords.map((keyword) => keyword.value);
      console.log("Keywords:", values);
      // Add your API call here
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Keyword Configuration</h1>
      <div className="flex flex-col space-y-4">
        {keywords.map((keyword) => (
          <div key={keyword.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={addKeyword}
              className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => removeKeyword(keyword.id)}
              className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-50"
              disabled={keywords.length === 1 || isSubmitting}
            >
              -
            </button>
            <input
              type="text"
              value={keyword.value}
              onChange={(e) => handleInputChange(keyword.id, e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="Enter keyword"
              disabled={isSubmitting}
            />
          </div>
        ))}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
