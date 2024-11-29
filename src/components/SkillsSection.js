const SkillsSection = ({
  skills,
  skillPoints,
  attributes,
  totalSkillPointsSpent,
  adjustedSkillPointsAvailable,
  incrementSkillPoint,
  decrementSkillPoint,
  calculateModifier,
}) => {
  return (
    <section className="skills-section">
      <h2>Manage Skills</h2>
      <ul className="skill-list">
        {skills.map((skill) => {
          const skillName = skill.name;
          const pointsSpent = skillPoints[skillName];
          const attributeModifier = calculateModifier(
            attributes[skill.attributeModifier]
          );
          const totalSkillValue = pointsSpent + attributeModifier;

          const disableIncrement =
            totalSkillPointsSpent >= adjustedSkillPointsAvailable;
          const disableDecrement = pointsSpent <= 0;

          return (
            <li key={skillName} className="skill-item">
              <span className="skill-name">{skillName}</span>
              <span className="skill-points">
                Points: {pointsSpent}{" "}
                <button
                  onClick={() => incrementSkillPoint(skillName)}
                  disabled={disableIncrement}
                >
                  +
                </button>
                <button
                  onClick={() => decrementSkillPoint(skillName)}
                  disabled={disableDecrement}
                >
                  -
                </button>
              </span>
              <span className="skill-modifier">
                Modifier ({skill.attributeModifier}): {attributeModifier}
              </span>
              <span className="skill-total">Total: {totalSkillValue}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SkillsSection;
