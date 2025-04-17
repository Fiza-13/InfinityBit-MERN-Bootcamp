function Tile({className, value, onClick, playerTurn }){
    let hoverClass = null;
    if (value == null && playerTurn != null){
        hoverClass= `${playerTurn.toLowerCase()}-hover`;
    }
    return (
    <div onClick ={onClick} className={`tile ${className} ${hoverClass} ${ value === "X" ? "x-marked" : ""} ${ value === "O" ? "o-marked" : ""}`}>
    {value === "X" && <span className="x-mark">{value}</span>}
    {value === "O" && <span className="o-mark">{value}</span>}
    </div>
    );
}

export default Tile;

