export default function Form({ btnFunction }) {
  return (
    <>
      <button
        type="submit"
        onClick={btnFunction}
        className="border px-16 py-1.5 rounded-md bg-amber-300 hove: cursor-pointer"
      >
        Add
      </button>
    </>
  );
}
