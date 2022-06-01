import Symbol from "./Symbol";

const SymbolList = (props) => {
  if (!props.data) {
    return null;
  }

  if (props.data.length == 0) {
    return <div>No Results.</div>;
  }

  return (
    <>
      {props.data.map((i) => (
        <Symbol key={i["1. symbol"]} data={i} setSymbols={props.setSymbols}/>
      ))}
    </>
  );
};
export default SymbolList;