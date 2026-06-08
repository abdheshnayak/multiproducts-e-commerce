import { useLocation, useParams } from "react-router-dom";
import Box from '../../FetchDataCard/Box'
import GetDetails from '../../FetchDataCard/current'
import Address from './Address'
import { useEffect, useState } from "react";
import Order from "./Order";
import { placeOrder } from "./PlaceOrder";
import Success from "./Success";

const Buy = () => {
    const { id } = useParams()
    const location = useLocation()
    const { qnt } = location.state || {}
    console.log(id);
    // const [selectedProducts, setProps] = useState([])
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await GetDetails();
                const found = data.data.products;
                setProduct(found);

            } catch (err) {
                console.log(err);
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
        console.log("ORDER RESULT:", result);
        if (!result.success) {
            alert(result.message);
            return;
        }

        setOrderPlaced(true);
    };

    if (!selectedProduct) {
        return <h2>Loading...</h2>;
    }
    if (orderPlaced) {

        return <Success />;
    }
    return (
        <>
            <div >
                <div>
                    <p>Deliverd on  {Date(selectedProduct.shippingInformation)}</p>
                </div>
                <div>
                    <img src={selectedProduct.images?.[0]} alt="img" className="stockImg" />
                </div>
                <p>{qnt}</p>
                <Box
                    title={selectedProduct.title}
                    price={selectedProduct.price}
                    discount={selectedProduct.discount}
                    rating={selectedProduct.rating}
                    reviews={selectedProduct.reviews}
                // stock={selectedProduct.stock}
                />

                <Order
                    price={selectedProduct.price}
                    qnt={qnt}
                />
            </div>

            <Address />

            <button
                onClick={handlePlaceOrder}
            >
                Place Order
            </button>


        </>
    )
}


export default Buy;