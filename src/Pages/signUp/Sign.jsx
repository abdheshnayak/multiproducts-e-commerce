import { useState } from 'react';
import './Sign.css'
import Nav from '../Nav/Nav'
import Axios from '../../FetchDataCard/axios.jsx'
import { useNavigate } from 'react-router-dom';
import logo from './beautiful-bright-pop-landscapes.jpg'

function SignUp() {

    const nevigate = useNavigate();

    const [errorPass, setErrorPass] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)

    function send(e) {

        let valid = true; //add
        // alert('ok')
       
        e.preventDefault()

        if (!regPass.test(details.password)) {
            setErrorPass(true)
            valid = false
        } else {
            setErrorPass(false)
        }

        if (!regEmail.test(details.email)) {
            setErrorEmail(true)
            valid = false
        } else {
            setErrorEmail(false)
        }

        localStorage.setItem("SignUpUser",JSON.stringify(details));

        if (valid) {
            if (details.user === 'customer') {
                nevigate('/landing')   // ✅ lowercase
            }
            else if (details.user === 'ServiceProvider') {
                nevigate('/Provider')
            } else {
                nevigate('/Admin')
            }

        }
       

    }


    const regEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    const regPass = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/



    const [details, setDetails] = useState({
        email: '',
        password: '',
        user: 'customer'  //default
    })
 


    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetails(prev => ({ ...prev, [name]: value }))
       
        
    }

    return (<>
        <div className='Box'>
            <div className='divBox'>

                <div className="innerBox">
                    <div className='inner'>
                        <h1 className='h1'>Sign up through simple step </h1>
                        <form onSubmit={send} className='form'>
                            <div className='formDiv'>
                                <label htmlFor='email' className='label'>Email</label><br></br>
                                <input id='email' type='email' placeholder='enter email ' name='email'
                                    value={details.email}
                                    onChange={handleChange}
                                    className='input'
                                />
                            </div>
                            <div className='formDiv'>
                                <label htmlFor='pass' className='label'>Password</label><br></br>
                                <input id='pass' type='password' placeholder='enter password' name='password'
                                    value={details.password}
                                    onChange={handleChange}
                                    className='input'
                                />

                            </div>
                            <div>
                                <label
                                    htmlFor='menu'
                                    className='label2'
                                >User</label>
                                <br></br>
                                <select
                                    id='menu'
                                    value={details.user}
                                    onChange={handleChange}
                                    name='user'>

                                    <option value='customer'>Customer</option>
                                    <option value='ServiceProvider'>Service Provider</option>
                                    <option value='Admin'>Admin</option>
                                </select>
                            </div>

                            <div className='formOverlay'>
                                {errorPass && <p>Wrong password</p>}
                                {errorEmail && <p>Wrong email</p>}
                            </div>
                            <button
                                disabled={!details.email || !details.password}
                                className='button' >sign up</button>

                        </form>
                    </div>
                </div>

                <div className="divImg">
                    <img src={logo}></img>
                    <div id='paraDiv'>
                        <p className='para'>Fly to the <b className='purple'>unknowns</b></p>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}
export default SignUp;
