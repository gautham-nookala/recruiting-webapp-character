import { useState } from "react";
import "./App.css";
import CharacterSheet from "./components/CharacterSheet";
import useCharacterApi from "./hooks/useCharacterApi";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";

const defaultCharacter = {
  attributes: ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 10;
    return acc;
  }, {}),
  skillPoints: SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name] = 0;
    return acc;
  }, {}),
};

function App() {
  const { saveCharacters, saving, error } = useCharacterApi();

  const [characters, setCharacters] = useState([defaultCharacter]);

  const addCharacter = () => {
    setCharacters((prev) => [...prev, defaultCharacter]);
  };

  const removeCharacter = (index) => {
    setCharacters((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCharacterAttributes = (index, updatedAttributes) => {
    setCharacters((prev) =>
      prev.map((character, i) =>
        i === index
          ? { ...character, attributes: updatedAttributes }
          : character
      )
    );
  };

  const updateCharacterSkillPoints = (index, updatedSkillPoints) => {
    setCharacters((prev) =>
      prev.map((character, i) =>
        i === index
          ? { ...character, skillPoints: updatedSkillPoints }
          : character
      )
    );
  };

  const handleSave = () => {
    console.log("Saving Characters:", characters); // Debug log
    saveCharacters(characters);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
        <div className="header-buttons">
          <button onClick={addCharacter}>Add Character</button>
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save All Characters"}
          </button>
        </div>
      </header>
      <div className="character-list">
        {characters.map((character, index) => (
          <CharacterSheet
            key={index}
            character={character}
            index={index}
            updateCharacterAttributes={updateCharacterAttributes}
            updateCharacterSkillPoints={updateCharacterSkillPoints}
            removeCharacter={removeCharacter}
          />
        ))}
      </div>
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}

export default App;
