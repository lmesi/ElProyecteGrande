export default function Filter(props) {
    const { whatToFilter, onFilterSelect } = props;
    return (
        <select onChange={onFilterSelect}>
            <option value="" ></option>
            {whatToFilter.map((opt, i) => <option key={i}>{opt}</option>)}
        </select>
    )
}