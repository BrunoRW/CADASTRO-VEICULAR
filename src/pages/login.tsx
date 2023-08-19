import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { isAuth } from "../auth";

export default function Login() {

    // LOG CREDENTIALS 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [msgClass, setMsgClass] = useState("");
    const [buttonSend, setButtonSend] = useState("LOGIN");

    // "brunowotzki@dotelematics.com"
    // M@r12345

    const credentials: object = {
        "email": email,
        "password": password
    }

  // GET JWT TOKEN - AUTH 
    const getToken = () => {
        setButtonSend('loading');
        fetch("https://api-dev.dotelematics.com/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(credentials)
        })
        .then((response) => response.json())
        .then((data) => {
            let token: string = data.accessToken;
        
            if (token) {
                localStorage.setItem("token", token)
                setMsg("Success")
                setMsgClass("green")
                window.location.reload()
            } else {
            localStorage.removeItem("token")
            setMsg("Invalid user")
            setMsgClass("red")
        }

        setButtonSend("LOGIN")
        })
        .catch(err => {
        console.log(`Error: ${err}`)
        })
    }

    return (
    <>
        <div className="w-full min-h-screen p-2.5 pt-20 flex flex-col gap-10 items-center">
            <h1 className="flex gap-2 text-center text-2xl">
            <span className="">
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.8401 5.97478C19.7994 2.675 24.8733 2.39896 28.1731 5.35822V5.35822L11.333 24.1361C8.37374 27.4359 3.29978 27.7119 9.79553e-07 24.7526V24.7526L16.8401 5.97478Z" fill="black"/>
                <path d="M24.522 12.8639C27.4812 9.56415 32.5552 9.2881 35.855 12.2474V12.2474L19.0149 31.0252C16.0556 34.325 10.9816 34.601 7.68186 31.6418V31.6418L24.522 12.8639Z" fill="#FF9900"/>
                </svg>
            </span>
            <span className="text-orange-400">My</span>
            Space
            </h1>

            <h3 className="text-xl text-gray-500">Sign in</h3>
            <form className="w-full max-w-sm flex flex-col gap-5" onSubmit={(e)=>e.preventDefault()}>
            <p className={`text-${msgClass}-600 text-center`}>{msg}</p>
            <input className="p-3 border-slate-200 border-solid border rounded drop-shadow-md drop-shadow-gray-200 focus:border-slate-400" type="text" onChange={(element)=>setEmail(element.target.value)} placeholder="Email"/>
            <input className="p-3 border-slate-200 border-solid border rounded drop-shadow-md drop-shadow-gray-200 focus:border-slate-400" type="password" onChange={(element)=>setPassword(element.target.value)} placeholder="Password"/>

            <button className="p-3 text-white bg-zinc-900 rounded hover:bg-zinc-800" onClick={()=>getToken()}>{buttonSend}</button>
            
            <p className="text-gray-500 ">Don't have and account yet? <span className="text-orange-400">Sign up now</span></p>
            </form>
        </div>
        </>
    )
}
