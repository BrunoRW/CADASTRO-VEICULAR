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

    getAll("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnJ1bm8gV290emtpIiwiZW1haWwiOiJicnVub3dvdHpraUBkb3RlbGVtYXRpY3MuY29tIiwidXNlcklkIjoiNjRkYmMxM2RiZjc2OGJiZjI1ZTU1M2NjIiwic3RhdHVzIjoib25saW5lIiwicmVzdHJpY3RIb3N0IjpbXSwiY29tcGFueSI6W3siX2lkIjoiNjRkYmJmYWE5NTExNmIyN2E1YzliOGNkIiwiaG9zdCI6W3siX2lkIjoiNjRjYWI0NmE0Y2JiOTFkYjJkMjMzNzdhIiwiaG9zdCI6ImxvY2FsaG9zdDozMDAxIn0seyJfaWQiOiI2NGNhYTkxYjY2NTA0ZjY3NjgyNDEwODgiLCJob3N0IjoibG9jYWxob3N0OjMwMDAifSx7Il9pZCI6IjY0Y2FmNWExNGEzNjNkYjY2N2ZmZDVmOCIsImhvc3QiOiJkZXYtYXBwLmRvdGVsZW1hdGljcy5jb20ifSx7Il9pZCI6IjY0Y2FhOGMwNjY1MDRmNjc2ODI0MTA3YyIsImhvc3QiOiJhcHAuZG90ZWxlbWF0aWNzLmNvbSJ9XX1dLCJwZXJtaXNzaW9ucyI6W3siY29kZSI6ImFkbWluLmNvbXBhbnkubGlzdCJ9LHsiY29kZSI6ImFkbWluLmNvbXBhbnkudmlldyJ9LHsiY29kZSI6ImZsZWV0LnZlaGljbGUuZGVsZXRlIn0seyJjb2RlIjoiZmxlZXQudmVoaWNsZS5lZGl0In0seyJjb2RlIjoiZmxlZXQudmVoaWNsZS5saXN0In0seyJjb2RlIjoiZmxlZXQudmVoaWNsZS5tZW51In0seyJjb2RlIjoiZmxlZXQudmVoaWNsZS5uZXcifSx7ImNvZGUiOiJmbGVldC52ZWhpY2xlLnZpZXcifSx7ImNvZGUiOiJhZG1pbi5jb21wYW55Lmxpc3QifSx7ImNvZGUiOiJhZG1pbi51c2VyLnRoZW1lLnZpZXcifSx7ImNvZGUiOiJmbGVldC5mbGVldC5saXN0In0seyJjb2RlIjoiZmxlZXQuZmxlZXQudmlldyJ9LHsiY29kZSI6ImZsZWV0LnZlaGljbGUubGlzdCJ9LHsiY29kZSI6ImZsZWV0LnZlaGljbGUudmlldyJ9LHsiY29kZSI6InJlYWx0aW1lIn1dLCJpYXQiOjE2OTIzNzkxNzQsImV4cCI6MTY5NDk3MTE3NH0.yvAVkcM5Yv42SgeBwRrapIEb6UuR4bKc4Z9uZKpTk64")
    return(
        <>
        
        </>
    )
}