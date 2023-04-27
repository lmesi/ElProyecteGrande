const Dropdown = ({ label, options, value, setValue }) => {
  return (
    <div className="drop-container">
      {label && (
        <label
          htmlFor="select"
          className="searchBar-flex-item select-container"
        >
          {label}
        </label>
      )}
      <select
        id="select"
        className="form-select"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
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
