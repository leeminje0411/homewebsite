'use client'

import Link from 'next/link';
import {useRef, useState} from 'react';
import React from 'react';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const textRef= useRef();
    const passwordRef = useRef();
    const formRef = useRef();

    const loginHandler = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
    }
    const loginPopUp = async (e) =>{
        e.preventDefault();
        if(textRef.current.value === "admin" && passwordRef.current.value === "1234"){
            
            setIsLoggedIn(!isLoggedIn);
            formRef.current.style.opacity = 0;
            await new Promise(resolve=>{
                setTimeout(() => { setIsClicked(!isClicked); resolve(); }, 200);
                
            })
            }
        else{
            alert("Login Failed");
            }
            setIsClicked(!isClicked);
            }

    return (
        <div>
            {isLoggedIn ? <li><button href='/Login' onClick={e => loginHandler(e)} >Logout</button ></li> : 
                <li><button onClick={e => loginHandler(e)}>Login</button></li>}

            { isClicked ? <>

            <form className="formRef"onSubmit={e=>loginPopUp(e)} ref={formRef}>
            <input type='text' ref={textRef}></input>
            <input type='password' ref={passwordRef}></input>
            <input type='submit' value='Login'></input> 
            </form>
            </>: null
        }
        </div>
    );


}

export default Login;