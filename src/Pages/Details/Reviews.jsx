import { useNavigate } from "react-router-dom";

const Reviews = (props) => {
 const nevigate=useNavigate()

    const { reviews ,id} = props
    // console.log(reviews);

const count=reviews.length
// console.log(count);
const handleClick =()=>{
    nevigate(`/AllReview/${id}`)

}
    return (
        <>

            {
                reviews.map((e, i) => {
                   
                    return (

                        <div key={i}  >
                            {
                                i < 2 &&
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
             {count >2 && <button className="revBtn" onClick={handleClick}>View All Review &#8594;</button>}
        </>
    )
}

export default Reviews;