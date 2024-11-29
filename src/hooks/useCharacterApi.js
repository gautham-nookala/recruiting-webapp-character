import { useState } from "react";

const API_BASE_URL =
  "https://recruiting.verylongdomaintotestwith.ca/api/gautham-nookala/character";

const useCharacterApi = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Save character data to the API
  const saveCharacters = async (characters) => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characters),
      });
      if (!response.ok) {
        throw new Error(`Failed to save: ${response.statusText}`);
      }
    } catch (err) {
      console.error("Save Error:", err.message); // Debug log
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    error,
    saveCharacters,
  };
};

export default useCharacterApi;
