export default function TabHeader(props) {


    return (
        <ul className={"tabheader"}>
            <li className={props.current == 1 ? "active" : "inactive"} onClick={() => { props.setCurrent(1) }}>
                <div>Explore</div>
            </li>
            <li className={props.current == 2 ? "active" : "inactive"} onClick={() => { props.setCurrent(2) }}>
                <div>My Bookshelves</div>
            </li>
            <li className={props.current == 3 ? "active" : "inactive"} onClick={() => { props.setCurrent(3) }}>
                <div>My Account</div>
            </li>
        </ul>
    )



}