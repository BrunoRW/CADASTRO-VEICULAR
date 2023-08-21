import { getToken } from "../auth";
import Logo from "../components/logo";
import { useState, useEffect } from "react";

export default function Dash(){

    const [qntVehicle, setQntVehicle] = useState(0);
    const [qntType, setQntType] = useState(0);
    const [qntCompany, setQntCompany] = useState(0);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    useEffect(() => {
        const getData = async (token: string, url: string) => {
            const response = await fetch(`https://api-dev.dotelematics.com/${url}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            });
            const data = await response.json();
            console.log(`From ${url}:`, data);
            let docsLength = data.docs.length;

            if (url === "vehicle") setQntVehicle(docsLength);
            if (url === "vehicle-type") setQntType(docsLength);
            if (url === "company") setQntCompany(docsLength);
        };

        const getAll = async (token: string) => {
            await Promise.all([
            getData(token, "vehicle"),
            getData(token, "vehicle-type"),
            getData(token, "company"),
            ]);
        };

        getAll(getToken());
    }, []);

    
    return(
        <>
            <header className="w-full h-20 flex justify-between p-5 items-center">
                <Logo/>
                <button className="text-gray-600 text-md" onClick={()=>logout()}>Sign out</button>
            </header>

            <div className="w-full flex flex-wrap md:flex-nowrap gap-5 p-5">
                <div className="w-full md:w-1/3 p-5 bg-white flex flex-col items-center gap-5 rounded shadow-md shadow-gray-200 border-2 border-gray-100">
                    <h1 className="text-gray-500 text-lg">Vehicle</h1>
                    <p className="text-orange-400 text-2xl">{qntVehicle}</p>
                </div>
                <div className="w-full md:w-1/3 p-5 bg-white flex flex-col items-center gap-5 rounded shadow-md shadow-gray-200 border-2 border-gray-100">
                    <h1 className="text-gray-500 text-lg">Company</h1>
                    <p className="text-orange-400 text-2xl">{qntCompany}</p>
                </div>
                <div className="w-full md:w-1/3 p-5 bg-white flex flex-col items-center gap-5 rounded shadow-md shadow-gray-200 border-2 border-gray-100">
                    <h1 className="text-gray-500 text-lg">Type</h1>
                    <p className="text-orange-400 text-2xl">{qntType}</p>
                </div>
            </div>
            
            <div className="mt-10 p-5 flex gap-5 flex-col">
                <h1 className="text-gray-500 text-lg">
                    Functions
                </h1>
                <button className="w-full md:w-1/5 flex items-center h-12 bg-white shadow-md shadow-gray-200 border-2 border-gray-100 rounded overflow-hidden hover:opacity-90">
                    <div className="w-1/5 bg-zinc-800 border-r-2 border-orange-500 flex justify-center items-center h-full">
                        <span className="text-lg text-white">+</span>
                    </div>
                    <p className="text-center w-full">Add new vehicle</p>
                </button>
            </div>

            <div className="mt-10 p-5 flex gap-5 flex-col">
                <h1 className="text-gray-500 text-lg">
                    All vehicles
                </h1>
                <button className="w-full md:w-1/5 flex items-center h-12 bg-white shadow-md shadow-gray-200 border-2 border-gray-100 rounded overflow-hidden hover:opacity-90">
                    
                </button>
            </div>
        </>
    )
}