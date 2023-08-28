import Explore_default from '../exploreTabContainer/explore_default'

export default function Explore(props) {
    return (

        <Explore_default data={props.default_data} uid={props.uid} auth={props.auth} dislikes = {props.dislikes}></Explore_default> 

    )

}