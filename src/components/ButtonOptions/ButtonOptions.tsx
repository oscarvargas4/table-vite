import { SortBy } from '../UsersList/User.interface.ts';

type ButtonOptionsProps = {
  paintedRows: boolean,
  setPaintedRows: React.Dispatch<React.SetStateAction<boolean>>,
  restoreUsers: () => void,
  sorting: SortBy,
  toggleSortByCountry: () => void,
  setFilterByCountry: React.Dispatch<React.SetStateAction<string>>,
};

export default function ButtonOptions(props: ButtonOptionsProps) {
  const {
    paintedRows,
    setPaintedRows,
    restoreUsers,
    sorting,
    toggleSortByCountry,
    setFilterByCountry,
  } = props;
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByCountry(e.target.value);
  };

  return (
    <>
      <div>
        <h1>Table with candidates</h1>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center', alignContent: 'center',
      }}
      >
        <button type="button" onClick={() => setPaintedRows(!paintedRows)}>{paintedRows ? 'Unpaint Rows' : 'Paint Rows'}</button>
        <button type="button" onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'Do not Sort By Country' : 'Sort By Country'}
        </button>
        <button type="button" onClick={() => restoreUsers()}>Resotre Initial State</button>
        <input type="text" placeholder="Filter By Country" onChange={inputHandler} />
      </div>
    </>
  );
}
