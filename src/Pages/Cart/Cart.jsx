import { useLocation, useNavigate } from "react-router-dom";
import "./Cart.css"
import { useEffect, useState } from "react";
import GetDetails from '../../FetchDataCard/current'
import Spin from '../Details/spinner'
import BoxDiv from "../Details/OtherDetails"
import Box from '../../FetchDataCard/Box'
import Buy from './Buy'

// import OtherDetails from "../Details/OtherDetails";
const Cart = () => {

    const nevigate = useNavigate()

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

    const [stockArr, setStockArr] = useState({})

    const plus = (qntId, qnt) => {
        setStockArr(prev => ({
            ...prev,
            [qntId]: (prev[qntId] || qnt) + qnt
        }))
    }

    const minus = (qntId, qnt) => {
        setStockArr(prev => ({
            ...prev,
            [qntId]: Math.max((prev[qntId] || qnt) - qnt, qnt)
        }))
    }


    const Date = (ship, id) => {
        const num = ship.match(/\d+/g) || []
        const numMap = num.map(Number)
        const date = new window.Date()
        date.setDate(
            date.getDate() + Math.max(...numMap)
        )
        return date.toDateString()
    }

    

    const Delete = (id) => {
        setArr(prev => {
            const update = prev.filter(item => item !== id)
            localStorage.setItem("CartId", JSON.stringify(update))
            return update;
        })

    }

    const nev = (id,qnt) => {
        nevigate(`/Buy/${id}`,
            {
                state : {qnt}
            }
        )
    }
    return (
        <>
            {
                product.filter((e) => arr.includes(e.id))
                    .map((p, i) => {
                        console.log("p :  ", p.minimumOrderQuantity);
                        const qnt = stockArr[p.id] || p.minimumOrderQuantity
                        // console.log(p[id]?.images?.[0]);

                        return (
                            <div key={i} className="stock boxDiv boxP ">
                                <div className="flex stockFlex">
                                    <div> 
                                        <div>
                                            <img src={p.images?.[0]} alt="img" className="stockImg" />
                                        </div>
                                        <div className="qntDiv flex">
                                            {/* <div className="flex qnt"> */}
                                            <button onClick={() => plus(p.id, p.minimumOrderQuantity)} className="qntBtn">&#x2b;</button>
                                            <p className="qnt">Qnt {qnt}</p>
                                            <button onClick={() => minus(p.id, p.minimumOrderQuantity)} className="qntBtn">&#x2212;</button>
                                       {/* </div> */}
                                        </div>
                                    </div>
                                    <div className="stockDiv" >
                                        <Box
                                            title={p.title}
                                            price={p.price}
                                            discount={p.discount}
                                            rating={p.rating}
                                            reviews={p.reviews}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="date">Delivered on {Date(p.shippingInformation)}</p>
                                </div>

                                <div className="CartDiv Cart CartStock">
                                    <button onClick={() => Delete(p.id)}>Delete</button>
                                    <button onClick={()=> nev(p.id,qnt)}>Buy Now</button>

                                </div>
                            </div>
                        )

                    })
            }
        </>
    )
}


export default Cart;