import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from './EmpEdit.module.css'

const EmpEdit = () => {
    const { empid } = useParams();
    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {

            console.log(resp)
            idchange(resp._id);
            namechange(resp.name);
            emailchange(resp.Email);
            phonechange(resp.Phone);
            activechange(resp.isactive);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id,name,email,phone,active};
      

      fetch("http://localhost:8000/employee/"+empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit} style={{'postion': 'absolute', 'bottom': '0'}}>

                    <div className="card " >
                        <div className="text-centre" >
                            <h2 className={style.m}>Employee Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="m-2">ID</label>
                                        <br></br>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="m-2">Name</label>
                                        <br></br>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    { validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12 ">
                                    <div className="form-group">
                                        <label className="m-2">Email</label>
                                        <br></br>
                                        <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="m-2">Phone</label>
                                        <input value={phone} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                        
                                <div className="col-lg-12 m-2">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit" style={{marginLeft:'9.5em',marginRight:'1em', marginTop:'1em'}}>Save</button>
                                       <Link to="/" className="btn btn-danger" style={{marginRight:'1em', marginTop:'1em'}}>Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default EmpEdit;