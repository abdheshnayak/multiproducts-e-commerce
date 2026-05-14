import { useState } from 'react'
import './mataData.css'
import { useNavigate } from 'react-router-dom'
import CartImg from './Cart1.png'
import Box from '../../FetchDataCard/Box'
const MataData = (props) => {
    const Nevigate = useNavigate()
    const [id,setId]=useState(props.id)

    const [image, setImage] = useState(props.image)
    const [img, setImg] = useState(image[0])

    const handleImage = (index, img) => {
        setImg(img)
    }


    return (
        <>
            <div className='Div'>
                <div className='divDivider'>
                    <div>
                        {props.image?.length >= 0 && (
                            props.image.map((e, i) => {
                               
                                return (
                                    <div
                                        key={i}
                                        onClick={() => handleImage(i, e)}
                                        className='detailImage'>
                                        <img src={e} /></div>)
                            })
                        )}
                    </div>
                    <div className='CartImg'>
                        <div className='Img'>
                            <img src={img} />
                        </div>
                        <div className='CartDiv'>

                            <button
                            onClick={()=>Nevigate("/Cart",{state : {id :id}})}
                            >
                                Add to Cart
                                <img src={CartImg} alt='img' ></img>
                            </button>

                            <button>Buy Now</button>
                        </div>
                    </div>

                </div>
                <hr />
               
            </div>

        </>
    )
}

export default MataData;