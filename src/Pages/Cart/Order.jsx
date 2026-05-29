const Order = (props) => {
    return (
        <>
            <div className="order-summary">
                <h2>Order Summary</h2>

                <p>Price : ₹{Math.round(props.price*80)}</p>

                <p>Quantity : {props.qnt}</p>

                <p>Shipping : ₹40</p>

                <h3>Total : ₹{Math.round((props.price*80) * props.qnt + 40)}</h3>
            </div>
        </>
    )
}
export default Order;