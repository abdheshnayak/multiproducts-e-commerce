import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AllReview = () => {
    const { id } = useParams()
    const nevigate=useNavigate()
    const [review, setReview] = useState([])
    const [title, setTitle] = useState(null)
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => { setReview(data.reviews), setTitle(data.title) })
    }, [])
    
 const handleCut=()=>{
    nevigate(-1)
 }

    return (
        <>
        <div >
            <div className="flex space">
                <p>{title}</p>
                <h2 onClick={handleCut}>&#215;</h2>
            </div>
            <hr ></hr>
            {
                review.map((e, i) => {

                    return (

                        <div key={i}  className="divR">
                            {
                                <div className="divReview">
                                    <p className="name ">{e.reviewerName}</p>
                                    <div className="flex RatDat">
                                        <div className="R">
                                            <p className="rating r">{e.rating}  &#9733;</p>
                                        </div>
                                        <p className="date">{e.date}</p>
                                    </div>
                                    <p className="comment">{e.comment}</p>
                                    <hr></hr>
                                </div>
                            }
                        </div>
                    )

                })
            }
            </div>
        </>
    )
}

export default AllReview;