export default function Form({ options, value, onChange, btnFunction }) {
  return (
    <>
      <select
        className="border rounded-sm px-4"
        value={value}
        onChange={onChange}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          onClick={btnFunction}
          className="border px-16 py-1.5 rounded-md bg-amber-300 hove: cursor-pointer"
        >
          Add
        </button>
      </div>
    </>
  );
}
