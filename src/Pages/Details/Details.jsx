import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import MataData from './mataData'
import OtherDetails from "./OtherDetails";
import ProdDet from './Prodetails'
import Rating from './Rating'
import Reviews from './Reviews'
import Spinner from "./spinner"
const Details = (props) => {

    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [load, setLoad] = useState(false)
    const fetchData = async () => {
        try {
            setLoad(true)
            const response = await fetch(`https://dummyjson.com/products/${id}`)
            const data = await response.json()
            setProduct(data)
        }
        catch (error) {
            console.log("error");

        } finally {
            setLoad(false)
        }

    }

    useEffect(() => {
        fetchData()


    }, [])

   
    return (
        <>
            {
                load && <Spinner />``
            }
            <div className="allDetails">
                <div className="divfill">
                    {product ? (
                        <MataData
                            id={product.id}
                            title={product.title}
                            desc={product.description}
                            image={product.images}
                            qnt={product.qnt}
                        />

                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="fillDiv">
                    {
                        product ? (
                            <>
                                <OtherDetails
                                    id={product.id}
                                    // desc={product.description}
                                    title={product.title}
                                    discount={product.discountPercentage}
                                    price={product.price}
                                    rating={product.rating}
                                    reviews={product.reviews}
                                />
                                {/* <p>{product.id}</p> */}
                            </>
                            // {}
                        ) : (
                            <p></p>
                        )
                    }
                    {
                        product ? (
                            (<ProdDet
                                desc={product.description}
                                dim={product.dimensions}
                            />)
                        ) :
                            (<p></p>)
                    }
                    {
                        product ? (
                            < Rating
                                id={product.id}
                                rating={product.rating}
                                reviewsl={product.reviews.length}
                                reviews={product.reviews}
                            />
                        ) : (
                            <p></p>
                        )
                    }

                </div>
            </div>
        </>

    )
}

export default Details;