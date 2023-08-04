type ButtonOptionsProps = {
    paintedRows: boolean,
    setPaintedRows: React.Dispatch<React.SetStateAction<boolean>>,
    restoreUsers: () => void,
    sortByCountryEnabled: boolean,
    setSortByCountryEnabled: React.Dispatch<React.SetStateAction<boolean>>,
}

export function ButtonOptions(props: ButtonOptionsProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center', alignContent: 'center' }}>
            <button onClick={() => props.setPaintedRows(!props.paintedRows)}>Paint Rows</button>
            <button onClick={() => props.setSortByCountryEnabled(prevState => !prevState)}>{props.sortByCountryEnabled ? 'Do not Sort By Country' : 'Sort By Country'}</button>
            <button onClick={() => props.restoreUsers()}>Resotre Initial State</button>
            <input type="text" placeholder="Filter By Country" />
        </div>
    )

}