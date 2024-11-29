import { useState } from "react";
import { SKILL_LIST, calculateModifier } from "../consts";

const SkillCheck = ({ attributes, skillPoints }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDC] = useState(10);
  const [rollResult, setRollResult] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleRoll = () => {
    const randomRoll = Math.floor(Math.random() * 20) + 1; // Generate a random number between 1 and 20
    const skillModifier = calculateModifier(
      attributes[
        SKILL_LIST.find((s) => s.name === selectedSkill).attributeModifier
      ]
    );
    const skillTotal = skillPoints[selectedSkill] + skillModifier;
    const total = randomRoll + skillTotal;

    setRollResult(randomRoll);
    setIsSuccess(total >= dc);
  };

  return (
    <div className="skill-check">
      <h3>Skill Check</h3>
      <label>
        Skill:
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          {SKILL_LIST.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        DC:
        <input
          type="number"
          value={dc}
          onChange={(e) => setDC(Number(e.target.value))}
          min="1"
        />
      </label>
      <button onClick={handleRoll}>Roll</button>
      {rollResult !== null && (
        <div className="skill-check-result">
          <p>Roll: {rollResult}</p>
          <p>{isSuccess ? "Success!" : "Failure"}</p>
        </div>
      )}
    </div>
  );
};

export default SkillCheck;
