import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const EmpDetail = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({
        name:'',
        Email:'',
        Phone:'',
        _id: ''
    });

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            console.log(res)
            return res.json();
        }).then((resp) => {
            const {name , Email, Phone, _id} = resp;
            console.log(resp)
            empdatachange({name , Email, Phone, _id});
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
        <div className="container">
            <h1>Employee Detail</h1>

        </div>

        <br></br>
        <br></br>

            <div className="container">
             {empdata &&
                    <div>
                        <h4>Employee name: {empdata.name}</h4>
                        <h5>Id: {empdata._id}</h5>
                        <h5>Email: {empdata.Email}</h5>
                        <h5>Phone: {empdata.Phone}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
             }
             </div>

        </div>
        
    );
}

export default EmpDetail;