export default function Balance({ income, amount }) {
  return (
    <div>
      <h3 className="font-semibold">{income}</h3>
      <span>&#8369; {amount}</span>
    </div>
  );
}
