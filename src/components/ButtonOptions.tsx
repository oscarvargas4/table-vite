type ButtonOptionsProps = {
    paintedRows: boolean;
    setPaintedRows: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ButtonOptions (props: ButtonOptionsProps) {
    console.log(props.paintedRows);
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', justifyContent: 'center', alignContent: 'center' }}>
            <button onClick={() => props.setPaintedRows(!props.paintedRows)}>Paint Rows</button>
            <button>Sort By Country</button>
            <button>Resotre Initial State</button>
            <input type="text" placeholder="Filter By Country" />
        </div>
    )

}