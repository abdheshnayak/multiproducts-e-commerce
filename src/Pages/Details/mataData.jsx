import { useState } from 'react'
import './mataData.css'
import { useNavigate } from 'react-router-dom'
import CartImg from './Cart1.png'
import Box from '../../FetchDataCard/Box'
import Buy from '../Cart/Buy'
const MataData = (props) => {
    const Nevigate = useNavigate()
    const [id,setId]=useState(props.id)

    const[qnt,setQnt]=useState(props.qnt)

    const [image, setImage] = useState(props.image)
    const [img, setImg] = useState(image[0])

    const handleImage = (index, img) => {
        setImg(img)
    }

     const nav = (id,qnt) => {
        Nevigate(`/Buy/${id}`,
            {
                state : {qnt}
            }
        )
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
                        <div className='CartDiv Cart'>

                            <button
                            onClick={()=>Nevigate("/Cart",{state : {id :id}})}
                            >
                                Add to Cart
                                <img src={CartImg} alt='img' ></img>
                            </button>

                            <button onClick={()=>nav(id,qnt)} >Buy Now</button>
                        </div>
                    </div>

                </div>
                <hr />
               
            </div>

        </>
    )
}

export default MataData;