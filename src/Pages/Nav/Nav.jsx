import Bird from './bird.jpg'
import './Nav.css'
import SignUp from '../signUp/Sign'
import { useNavigate } from 'react-router-dom'
import menu from './menubar1.png'
import cross from './cross-23.png'
import { useEffect, useState } from 'react'
const Nav = () => {
   
    const navigate = useNavigate()
    const [menuu, setmenu] = useState(true)

    const handleMenu = () => {

        setmenu(false)

    }
    const handlecross = () => {

        setmenu(true)

    }

    const SignUpUser = JSON.parse(localStorage.getItem("SignUpUser"));

    

    return (
        <>
            <div className='NavBar'>
                <div>
                    <img src={Bird} alt="image" className='birdImg' />
                </div>
                <div id='links'>
                    <div id='link' className={menuu ? "" : "active"}>
                        <a className='a' href="" target="_blank">Home</a>
                        <a className='a' href="">Product</a>
                        <a className='a' href="">About</a>
                        <a className='a' href="">Contact</a>
                    </div>
                   
                    {
                        !SignUpUser && (
                            <div>
                                <button id='button' onClick={() => navigate('/Signup')} >Sign Up</button>
                            </div>
                        )
                    }

                    <div>
                        {
                            menuu ?
                                <img className='menu pad' src={menu} alt='img' onClick={handleMenu}

                                ></img>
                                :
                                <img className='cross pad' src={cross} onClick={handlecross}></img>

                        }

                    </div>
                </div>

            </div>
        </>
    )

}

export default Nav;