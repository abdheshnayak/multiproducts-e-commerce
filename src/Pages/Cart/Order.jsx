import './Buy.css'
const Order = (props) => {
    return (
        <>
            <div className="order-summary">
                <h2 className='Orderh'>Order Summary</h2>
                <div className='Orderdiv'>
                    <p className='OrderP'>Price : ₹{Math.round(props.price * 80)}</p>

                    <p className='OrderP'>Quantity : {props.qnt}</p>

                    <p className='OrderP'>Shipping : ₹40</p>
                </div>
                <h2 className='Orderh'>Total : ₹{Math.round((props.price * 80) * props.qnt + 40)}</h2>
            </div>
        </>
    )
}
export default Order;