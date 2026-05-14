import { useLocation } from "react-router-dom";
import "./Cart.css"
import { useEffect, useState } from "react";
import GetDetails from '../../FetchDataCard/current'
import Spin from '../Details/spinner'
import BoxDiv from "../Details/OtherDetails"
import Box from '../../FetchDataCard/Box'
// import OtherDetails from "../Details/OtherDetails";
const Cart = () => {
    const [product, setProduct] = useState([])
    const fetchApi = async () => {
        try {
            let data = await GetDetails()
            setProduct(data.data.products)
            console.log(data.data.products);

        } catch {
            console.log("error error");

        }
    }

    useEffect(() => {
        fetchApi()
    }, [])


    const location = useLocation();
    const { id } = location.state || {}
    const [arr, setArr] = useState(() => {
        return JSON.parse(localStorage.getItem("CartId")) || [];
    });

    useEffect(() => {
        if (id) {
            setArr(prev => {
                if (prev.includes(id)) return prev;
                const updatedCart = [...prev, id];

                localStorage.setItem(
                    "CartId", JSON.stringify(updatedCart)
                )

                return updatedCart
            })
        }
    }, [id]);
    console.log(product.minimumOrderQuantity);

    const [count  ,setCount]=useState(0)
    useEffect(() => {
    const item = product.find(p => p.id === id);

    if (item) {
        setCount(item.minimumOrderQuantity || 1);
    }
}, [product, id]);

     const plus = (min) => {
        console.log("min ",min);
        
        setCount(prev => prev + min)
    }

    const minus = () => {

    }
    return (
        <>
            {
                product.filter((e) => arr.includes(e.id))
                    .map((p, i) => {
                        console.log("p :  ", p.minimumOrderQuantity);
                        return (
                            <div key={i}>
                                <div>
                                    {/* <img src={p.images[0]} alt="img"/> */}
                                </div>
                                <div>
                                    <p onClick={() => { plus(p.minimumOrderQuantity) }}>&#x2b;</p>
                                    <p>{count}</p>
                                    <p onClick={minus}>&#x2212;</p>
                                </div>
                                <Box
                                    title={p.title}
                                    price={p.price}
                                    discount={p.discount}
                                    rating={p.rating}
                                    reviews={p.reviews}
                                />

                                {/* minimumOrderQuantity */}
                                {/* minimumOrderQuantity  returnPolicy 
shippingInformation warrantyInformation image
*/}

                                {/* photo qantity title size rating reviews price discount delivery */}
                            </div>
                        )

                    })
            }
        </>
    )
}


export default Cart;