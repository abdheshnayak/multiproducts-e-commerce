import { useLocation, useParams } from "react-router-dom";
import Box from '../../FetchDataCard/Box'
import GetDetails from '../../FetchDataCard/current'
import Address from './Address'
import { useEffect, useState } from "react";
import Order from "./Order";
import { placeOrder } from "./PlaceOrder";
import Success from "./Success";
import Spin from '../Details/spinner'
import './Buy.css'
import { useNavigate } from "react-router-dom";
const Buy = () => {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false)
    const [alreadyOrdered, setAlreadyOrdered] = useState(false);
    const { id } = useParams()
    const location = useLocation()
    const { qnt } = location.state || {}
    console.log(id);
    // const [selectedProducts, setProps] = useState([])
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            setLoad(true);

            try {
                const data = await GetDetails();
                setProduct(data.data.products);

                const orders =
                    JSON.parse(localStorage.getItem("orders")) || [];

                const foundOrder = orders.find(
                    (order) => order.productId === id
                );

                setAlreadyOrdered(!!foundOrder);
            } catch (err) {
                console.log(err);
            } finally {
                setLoad(false);
            }
        };

        fetch();
    }, [id]);

    const selectedProduct = product.find(
        (p) => p.id === Number(id)
    );


    const Date = (ship, id) => {
        const num = ship.match(/\d+/g) || []
        const numMap = num.map(Number)
        const date = new window.Date()
        date.setDate(
            date.getDate() + Math.max(...numMap)
        )
        return date.toDateString()
    }

    // console.log(selectedProduct);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = () => {
        const result = placeOrder({
            id,
            product: selectedProduct,
            qnt
        });

        // Get existing orders
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        // Add new order
        orders.push({
            productId: id,
            product: selectedProduct,
            qnt,
            orderDate: new window.Date().toISOString()
        });

        localStorage.setItem("orders", JSON.stringify(orders));

        setAlreadyOrdered(true);
        setOrderPlaced(true);
    };

    useEffect(() => {
        if (orderPlaced) {
            // const timer = setTimeout(() => {
                navigate(`/buy/${id}`, {
                    replace: true,
                    state: { qnt }
                });
            // }, 1000);

            // return () => clearTimeout(timer);
        }
    }, [orderPlaced, navigate, id, qnt]);

     useEffect(() => {
        if (orderPlaced) {
            const timer = setTimeout(() => {
                setOrderPlaced(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [orderPlaced]);

    if (!selectedProduct) {
        return <Spin />;
    }
   

    return (
        <>
            {orderPlaced && <Success />}
            <div className="Buy">
                <div >
                    <div className="boxDiv">
                        <div className="Buyimage">
                            <img src={selectedProduct.images?.[0]} alt="img" className="stockImg" />
                        </div>
                        <div className="BuyBox">


                            <Box
                                title={selectedProduct.title}
                                price={selectedProduct.price}
                                discount={selectedProduct.discount}
                                rating={selectedProduct.rating}
                                reviews={selectedProduct.reviews}
                            // stock={selectedProduct.stock}
                            />
                        </div>
                        <div className="Delivered">
                            <p>Deliverd on  {Date(selectedProduct.shippingInformation)}</p>
                        </div>
                    </div>
                    {/* <hr> </hr> */}

                    <div className="boxDiv Order">
                        <Order
                            price={selectedProduct.price}
                            qnt={qnt}

                        />
                    </div>
                </div>

                <div className="boxDiv Order">
                    <Address />


                </div>
                {
                    !alreadyOrdered && !orderPlaced && (
                        <button
                            onClick={handlePlaceOrder}
                            className="Orderbutton"
                        >
                            Place Order
                        </button>
                    )
                }

            </div>
        </>
    )
}


export default Buy;