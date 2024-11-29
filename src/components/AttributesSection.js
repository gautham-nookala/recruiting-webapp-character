const AttributesSection = ({
  attributes,
  incrementAttribute,
  decrementAttribute,
  calculateModifier,
}) => {
  return (
    <section className="App-section">
      <h2>Manage Attributes</h2>
      <ul className="attribute-list">
        {Object.entries(attributes).map(([attribute, value]) => (
          <li key={attribute} className="attribute-item">
            <span className="attribute-name">{attribute}</span>
            <span className="attribute-value">Value: {value}</span>
            <div className="attribute-controls">
              <button onClick={() => incrementAttribute(attribute)}>+</button>
              <button onClick={() => decrementAttribute(attribute)}>-</button>
            </div>
            <span className="attribute-modifier">
              Modifier: {calculateModifier(value)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AttributesSection;
