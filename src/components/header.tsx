import Logo from "./logo"
import { Link } from "react-router-dom";

export default function Header(){
    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return(
        <header className="w-full h-20 flex justify-between p-5 items-center">
            <Link to="/"><Logo/></Link>
            <button className="text-gray-600 text-md" onClick={()=>logout()}>Sign out</button>
        </header>
    )
}