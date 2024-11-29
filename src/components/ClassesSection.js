const ClassesSection = ({
  classes,
  expandedClass,
  toggleClassExpansion,
  doesMeetRequirements,
}) => {
  return (
    <section className="classes-section">
      <h2>Classes</h2>
      <div className="class-list">
        {Object.entries(classes).map(([className, classAttributes]) => {
          const meetsRequirements = doesMeetRequirements(classAttributes);
          const isExpanded = expandedClass === className;

          return (
            <div
              key={className}
              className={`class-item ${
                meetsRequirements ? "meets-requirements" : ""
              }`}
              onClick={() => toggleClassExpansion(className)}
            >
              <h3 className="class-title">
                {className} {isExpanded ? "▼" : "▶"}
              </h3>
              {isExpanded && (
                <ul className="class-attributes">
                  {Object.entries(classAttributes).map(([attribute, value]) => (
                    <li key={attribute}>
                      {attribute}: {value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ClassesSection;
