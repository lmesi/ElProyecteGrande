const Dropdown = ({ label, options, value, setValue }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={(event) => setValue(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
