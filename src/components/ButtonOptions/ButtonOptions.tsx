type ButtonOptionsProps = {
  paintedRows: boolean,
  setPaintedRows: React.Dispatch<React.SetStateAction<boolean>>,
  restoreUsers: () => void,
  sortByCountryEnabled: boolean,
  setSortByCountryEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  setFilterByCountry: React.Dispatch<React.SetStateAction<string>>,
};

export default function ButtonOptions(props: ButtonOptionsProps) {
  const {
    paintedRows,
    setPaintedRows,
    restoreUsers,
    sortByCountryEnabled,
    setSortByCountryEnabled,
    setFilterByCountry,
  } = props;
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByCountry(e.target.value);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center', alignContent: 'center',
    }}
    >
      <button type="button" onClick={() => setPaintedRows(!paintedRows)}>Paint Rows</button>
      <button type="button" onClick={() => setSortByCountryEnabled((prevState) => !prevState)}>
        {sortByCountryEnabled ? 'Do not Sort By Country' : 'Sort By Country'}
      </button>
      <button type="button" onClick={() => restoreUsers()}>Resotre Initial State</button>
      <input type="text" placeholder="Filter By Country" onChange={inputHandler} />
    </div>
  );
}
