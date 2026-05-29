// import 
import { useNavigate } from "react-router-dom";
import Box from "./Box"
const Card = (props) => {
    const nevigate = useNavigate();
    
    
    return (
        <>

            <div className="container" key={props.id} onClick={() => nevigate(`/Details/${props.id}`)}>
                <div className="imgCon">
                    <img src={props.img[0]} className="image"></img>
                </div>

                <Box 
                    title={props.title}
                    price={props.price}
                    discount={props.discount}
                    rating={props.rating}
                    reviews={props.reviews}
                    stock={props.stock}
                />
            </div>

        </>
    )
}
export default Card;    