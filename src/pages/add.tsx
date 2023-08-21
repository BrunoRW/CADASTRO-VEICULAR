// Component 
import Header from "../components/header"

// navigate 
import { useNavigate } from "react-router-dom";

// react hook form 
import { useForm } from "react-hook-form";

// yup 
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from "yup";

// get data 
import { useData } from "../getData";

// auth 
import { getToken } from "../auth";

const yearC = new Date().getFullYear();

const scheme = object({
    name: string().required("Name required.").min(3, "Minimum 3 characters"),
    plate: string().required("Plate required."),
    color: string().required("Color required."),
    brand: string().required("Brand required."),
    year: number().required("Year required.").min(1900, "Min. 1900").max(yearC, `Max. ${yearC}`).transform((value) => {
        if (!value) return 0;
        return Number(value);
    }),
    type: string().required("Category required."),
    company: string().required("Company required."),
})

export default function AddVehicle(){

    const navigate = useNavigate();

    const getData = useData();
    
    const typeList = () => {
        let data = getData[0].type.data;
        return data.map((e) => {
            let id = e["_id"];
            let name = e["name"];
            return <option key={id} value={id}>{name}</option>;
        });
    }
    
    const companyList = () => {
        let data = getData[0].company.data;
        return data.map((e) => {
            let id = e["_id"];
            let name = e["name"];
            return <option key={id} value={id}>{name}</option>;
        });
    }

    const { register, handleSubmit: onSubmit, formState: {errors} } = useForm({resolver: yupResolver(scheme)});

    const handleSubmit = (data: any) => {
        fetch(`https://api-dev.dotelematics.com/vehicle`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    "name": data.name,
                    "plate": data.plate,
                    "color": data.color,
                    "brand": data.brand,
                    "year": data.year,
                    "type": data.type,
                    "company": data.company
                })
            }
        )
        .then((response) => response.json())
        .then(e=>{
            if(e["_id"]) navigate("/dashboard");
        })
    }

    const defaultInp = "p-3 w-full border-slate-200 border-solid border rounded drop-shadow-md drop-shadow-gray-200"
    return(
        <>
            <Header/>
            <div className="p-5 w-full ">
                <div className="bg-white p-5 border-slate-200 border-solid border rounded drop-shadow-md drop-shadow-gray-200">
                    <h1 className="text-gray-500 text-lg">Add new vehicle</h1>

                    <form onSubmit={onSubmit(handleSubmit)} className="mt-10 flex flex-wrap gap-5">
                        <p className={`text-red-400`}>{errors?.name?.message}</p>
                        <input {...register("name")} className={defaultInp} placeholder="Name" name="name"/>
                        <p className={`text-red-400`}>{errors?.plate?.message}</p>
                        <input {...register("plate")}className={defaultInp} placeholder="Vehicle plate" name="plate"/>
                        <p className={`text-red-400`}>{errors?.color?.message}</p>
                        <input {...register("color")} className={defaultInp} placeholder="Color" name="color"/>
                        <p className={`text-red-400`}>{errors?.brand?.message}</p>
                        <input {...register("brand")} className={defaultInp} placeholder="Brand" name="brand"/>
                        <p className={`text-red-400`}>{errors?.year?.message}</p>
                        <input {...register("year")} className={defaultInp} type="number" placeholder="Year" name="year"/>
                        <p className={`text-red-400`}>{errors?.type?.message}</p>
                        <select {...register("type")} className={defaultInp}  name="type">
                            <option value="">Select type</option>
                            {typeList()}
                        </select>
                        <p className={`text-red-400`}>{errors?.company?.message}</p>
                        <select {...register("company")} className={defaultInp} name="company">
                        <option value="">Select company</option>
                            {companyList()}
                        </select>

                        <input type="submit" className="p-3 w-full text-white bg-zinc-900 rounded hover:bg-zinc-800" placeholder="Send"/>
                    </form>
                </div>
            </div>
        </>
    )
}