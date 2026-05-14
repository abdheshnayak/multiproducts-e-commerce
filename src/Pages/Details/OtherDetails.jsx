import Box from '../../FetchDataCard/Box'
const OtherDetails = (props) => {
   const { id,desc, title, price, discount, rating, reviews } = props
   

   return (
      <>
         {
            (id) ?
               (
                  <div className='boxDiv'>
                  <Box
                     title={title}
                     price={price}
                     discount={discount}
                     rating={rating}
                     reviews={reviews}
                     // desc={desc}
                  />
                  </div>
               ) : (<p>error</p>) 
            }
       
      </>
   )
}

export default OtherDetails;