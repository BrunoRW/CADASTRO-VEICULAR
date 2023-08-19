export default function Dash(){

    // FETCH ALL 
    const getData = (token: string, url: string) => {
        fetch(`https://api-dev.dotelematics.com/${url}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        })
        .then((response) => response.json())
        .then((data) => {
        console.log(`From ${url}:`, data);
        })
        .catch(err => {
        console.log(`Error: ${err}`)
        })
    }

    // GET INFO

    const getAll = (token: string) => {
        // GET VEHICLE 
        getData(token, "vehicle");
        // GET COMPANY 
        getData(token, "company");
        // GET TYPE 
        getData(token, "vehicle-type");
    }

    getAll(localStorage.token);
    
    return(
        <>
        {localStorage.token}
        </>
    )
}