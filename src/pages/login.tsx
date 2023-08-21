// React 
import { useState } from "react";

// component 
import Logo from "../components/logo";

// react hook form 
import { useForm } from "react-hook-form";

// yup 
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const scheme = object({
    email: string().required("Email required.").min(3, "Minimum 3 characters"),
    password: string().required("Password required."),
})

export default function Login() {
    // itens
    const [msg, setMsg] = useState("");
    const [buttonSend, setButtonSend] = useState("LOGIN");

    // react hook form 
    const { register, handleSubmit: onSubmit, formState: {errors} } = useForm({resolver: yupResolver(scheme)});

    const handleSubmit = (data: any) => {
        // console.log(data)
        setButtonSend('loading');
        fetch("https://api-dev.dotelematics.com/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "email": data.email,
                "password": data.password
            })
        })
        .then((response) => response.json())
        .then((data) => {
            let token: string = data.accessToken;
        
            if (token) {
                localStorage.setItem("token", token)
                setMsg("Success")
                window.location.reload()
            } else {
                localStorage.removeItem("token")
                setMsg("Invalid user")
            }
            setButtonSend("LOGIN")
        })
        .catch(err => {
            console.log(`Error: ${err}`)
        })
    }

    // log cred 
    // "brunowotzki@dotelematics.com"
    // M@r12345


    return (
    <>
        <div className="w-full min-h-screen p-2.5 pt-20 flex flex-col gap-10 items-center">
            <Logo/>
            <h3 className="text-xl text-gray-500">Sign in</h3>
            <form className="w-full max-w-sm flex flex-col gap-3" onSubmit={onSubmit(handleSubmit)}>
                <p className={`text-black-400 text-center`}>{msg}</p>
                <p className={`text-red-400`}>{errors?.email?.message}</p>
                <input {...register('email')} name="email" className="p-3 border-slate-200 border-solid border rounded drop-shadow-md drop-shadow-gray-200 focus:border-slate-400" type="text" placeholder="Email"/>
                <p className={`text-red-400`}>{errors?.password?.message}</p>
                <input {...register('password')} name="password" className="p-3 border-slate-200 border-solid border rounded drop-shadow-md drop-shadow-gray-200 focus:border-slate-400" type="password" placeholder="Password"/>
                <input type="submit" className="p-3 text-white bg-zinc-900 rounded hover:bg-zinc-800" placeholder={buttonSend}/>
                <p className="text-gray-500 ">Don't have and account yet? <span className="text-orange-400">Sign up now</span></p>
            </form>
        </div>
    </>
    )
}
