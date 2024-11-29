import { useState } from "react";
import AttributesSection from "./AttributesSection";
import ClassesSection from "./ClassesSection";
import SkillsSection from "./SkillsSection";
import SkillCheck from "./SkillCheck";
import {
  ATTRIBUTE_LIST,
  CLASS_LIST,
  SKILL_LIST,
  calculateModifier,
} from "../consts";

const MAX_ATTRIBUTE_TOTAL = 70;
const MAX_ATTRIBUTE_TOTAL_ALERT =
  "You have reached the maximum total attribute value of 70. Decrease another attribute to increase this one.";

const CharacterSheet = ({
  character,
  index,
  updateCharacterAttributes,
  updateCharacterSkillPoints,
  removeCharacter,
}) => {
  const [expandedClass, setExpandedClass] = useState(null);
  const { attributes, skillPoints } = character;

  const totalAttributes = ATTRIBUTE_LIST.reduce(
    (sum, attribute) => sum + attributes[attribute],
    0
  );

  const intelligenceModifier = calculateModifier(attributes["Intelligence"]);

  const skillPointsAvailable = Math.max(10 + 4 * intelligenceModifier, 0);
  const totalSkillPointsSpent = Object.values(skillPoints).reduce(
    (sum, val) => sum + val,
    0
  );

  const toggleClassExpansion = (className) => {
    setExpandedClass((prev) => (prev === className ? null : className));
  };

  const incrementAttribute = (attribute) => {
    if (totalAttributes < MAX_ATTRIBUTE_TOTAL) {
      updateCharacterAttributes(index, {
        ...attributes,
        [attribute]: attributes[attribute] + 1,
      });
    } else {
      window.alert(MAX_ATTRIBUTE_TOTAL_ALERT);
    }
  };

  const decrementAttribute = (attribute) => {
    updateCharacterAttributes(index, {
      ...attributes,
      [attribute]: attributes[attribute] - 1,
    });
  };

  const incrementSkillPoint = (skillName) => {
    if (totalSkillPointsSpent < skillPointsAvailable) {
      updateCharacterSkillPoints(index, {
        ...skillPoints,
        [skillName]: skillPoints[skillName] + 1,
      });
    }
  };

  const decrementSkillPoint = (skillName) => {
    if (skillPoints[skillName] > 0) {
      updateCharacterSkillPoints(index, {
        ...skillPoints,
        [skillName]: skillPoints[skillName] - 1,
      });
    }
  };

  return (
    <div className="character-sheet">
      <button
        className="remove-character"
        onClick={() => removeCharacter(index)}
      >
        Remove Character
      </button>
      <SkillCheck attributes={attributes} skillPoints={skillPoints} />
      <AttributesSection
        attributes={attributes}
        incrementAttribute={incrementAttribute}
        decrementAttribute={decrementAttribute}
        calculateModifier={calculateModifier}
      />
      <ClassesSection
        classes={CLASS_LIST}
        expandedClass={expandedClass}
        toggleClassExpansion={toggleClassExpansion}
        doesMeetRequirements={(classAttributes) =>
          ATTRIBUTE_LIST.every(
            (attribute) => attributes[attribute] >= classAttributes[attribute]
          )
        }
      />
      <SkillsSection
        skills={SKILL_LIST}
        skillPoints={skillPoints}
        attributes={attributes}
        totalSkillPointsSpent={totalSkillPointsSpent}
        adjustedSkillPointsAvailable={skillPointsAvailable}
        incrementSkillPoint={incrementSkillPoint}
        decrementSkillPoint={decrementSkillPoint}
        calculateModifier={calculateModifier}
      />
    </div>
  );
};

export default CharacterSheet;
