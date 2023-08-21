
import Header from "../components/header";
import { Link } from "react-router-dom";

// All data - vehicle, company and type 
import { useData } from "../getData"


export default function Dash(){

    const getData = useData();
    
    const qntVehicle = getData[0].vehicle.qnt;
    const qntCompany = getData[0].company.qnt;
    const qntType = getData[0].type.qnt;

    const dataVehicle = getData[0].vehicle.data;

    console.log(dataVehicle)
    const generateList = () => {
        return dataVehicle.map(e=>{
            let name = e["name"];
            let color = e["color"];
            let brand = e["brand"];
            let plate = e["plate"];
            let year = e["year"];
            let type = e["type"]["name"];
            let by = e["createdBy"]["name"];

            return <div className="vehicleItem p-5 bg-white flex flex-col items-center gap-5 rounded shadow-md shadow-gray-200 border-2 border-gray-100">
                <div className="flex flex-col gap-2 items-center">
                    <h1>Created By</h1>
                    <p className="text-gray-500">{by}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h1>Type</h1>
                    <p className="text-gray-500">{type}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h1>Name</h1>
                    <p className="text-gray-500">{name}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h1>Color</h1>
                    <p className="text-gray-500">{color}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h1>Brand</h1>
                    <p className="text-gray-500">{brand}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h1>Plate</h1>
                    <p className="text-gray-500">{plate}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h1>Year</h1>
                    <p className="text-gray-500">{year}</p>
                </div>
            </div>
        })
    }
    
    return(
        <>
            <Header/>
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
                    <h1 className="text-gray-500 text-lg">Vehicle category</h1>
                    <p className="text-orange-400 text-2xl">{qntType}</p>
                </div>
            </div>
            
            <div className="mt-10 p-5 flex gap-5 flex-col">
                <h1 className="text-gray-500 text-lg">
                    Functions
                </h1>
                <Link to="/add" className="w-full md:w-1/5 flex items-center h-12 bg-white shadow-md shadow-gray-200 border-2 border-gray-100 rounded overflow-hidden hover:opacity-90">
                    <div className="w-1/5 bg-zinc-800 border-r-2 border-orange-500 flex justify-center items-center h-full">
                        <span className="text-lg text-white">+</span>
                    </div>
                    <p className="text-center w-full">Add new vehicle</p>
                </Link>
            </div>

            <div className="mt-10 p-5 flex gap-5 flex-col">
                <h1 className="text-gray-500 text-lg">
                    All vehicles
                </h1>
                <div className="w-full flex flex-wrap gap-5">
                    {generateList()}
                </div>
            </div>
        </>
    )
}