import { useState, useEffect } from "react";

// auth 
import { getToken } from "./auth";

export const useData = () => {
    const [qntVehicle, setQntVehicle] = useState(0);
    const [qntType, setQntType] = useState(0);
    const [qntCompany, setQntCompany] = useState(0);

    const [dataVehicle, setDataVehicle] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [dataCompany, setDataCompany] = useState([]);

    useEffect(() => {
        const getData = async (token: string, url: string) => {
        const response = await fetch(
            `https://api-dev.dotelematics.com/${url}`,
            {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        const data = await response.json();
        console.log(`From ${url}:`, data);
        let docsLength = data.docs.length;

        if (url === "vehicle") {
            setQntVehicle(docsLength);
            setDataVehicle(data.docs);
        }
        if (url === "vehicle-type") {
            setQntType(docsLength);
            setDataType(data.docs);
        }
        if (url === "company") {
            setQntCompany(docsLength);
            setDataCompany(data.docs);
        }
        };

        const getAll = (token: string) => {
        getData(token, "vehicle");
        getData(token, "vehicle-type");
        getData(token, "company");
        };

        getAll(getToken());
    }, []);

    return [
        { 
            vehicle: {
                qnt: qntVehicle, data: dataVehicle
            },
            type: { 
                qnt: qntType, data: dataType
            },
            company: {
                    qnt: qntCompany, data: dataCompany
            }
        }
    ];
};
