const Box = (props) => {
    const { title, price, discount, rating, reviews, stock } = props
   
    const safePrice = Number(price) || 0;
    const safeDiscount = Number(discount) || 0;

    const inrPrice = safePrice * 80;

    const finalPrice = Math.round(
        inrPrice - (inrPrice * safeDiscount) / 100
    );


    return (
        <>
            <div className="paraCon">
                <h1 className="para1">{title}</h1>
                {/* {desc && <p className="h">{d``esc}</p>} */}
            </div>
            <div className="priCon">
                <p className="price">&#8377;{finalPrice}</p>
                <p className="tag1 tag">&#8377;{Math.round(inrPrice)}</p>
                <p className="tag2 tag">{safeDiscount}% off</p>
                {
                    stock === "In Stock" ? <p></p> : <p className="tag col">{stock}</p>
                }
            </div>


            <div className="RevRat">
                <div className="rating">
                    <p className="rating">{rating}  &#9733;</p>
                </div>

                <p className="review">{reviews.length} Reviews</p>

            </div>
        </>
    )
}

export default Box;