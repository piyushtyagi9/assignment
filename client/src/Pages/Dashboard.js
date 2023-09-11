import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-grid-system';
import { AiFillEdit } from 'react-icons/ai'
import { BsTrashFill } from 'react-icons/bs'
import { GrView } from 'react-icons/gr'
import style from './Dashboard.module.css'
import TextExample from '../Components/cards'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const [empdata, empdatachange] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2); // Number of items to display per page
    const [searchTerm, setSearchTerm] = useState(""); // New state for search
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/employee")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                empdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    };

    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    };

    const Removefunction = (id) => {
        console.log(id)
        if (window.confirm("Do you want to remove?")) {
            fetch("http://localhost:8000/employee/" + id, {
                method: "DELETE",
            })
                .then((res) => {
                    alert("Removed successfully.");
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    // Create a function to filter the data based on the search term
    const filterItems = () => {
        if (!searchTerm) {
            return empdata;
        }
        return empdata.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Update the currentItems to use the filtered data
    const filteredData = filterItems();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    let str1 = "Total Records"
    let str2 = "Total Pages"
    let str3 = "Per Page Count"

    return (
        <>
        <Container className="text-centre">
                <Row>
                    <Col sm={4} className='grid'>
                        <TextExample data={str1} />
                    </Col>
                    <Col sm={4} className='grid'>
                        <TextExample data={str2} />
                    </Col>
                    <Col sm={4} className='grid'>
                        <TextExample data={str3} />
                    </Col>
                </Row>
            </Container>
            <br></br>
            <br></br>
            <br></br>
        <div className="text-centre container">
            <div className="">
                <div className="card-title">
                    <h2>Employee List</h2>
                </div>
                <div className="card-body">
                    <div className={style.btnsection}>
                        <Link to="employee/create" className={style.button71}>
                            Add New
                        </Link>
                        <input
                            type="text"
                            className={style.search}
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td><b>ID</b></td>
                                <td><b>Name</b></td>
                                <td><b>Email</b></td>
                                <td><b>Phone</b></td>
                                <td><b>Action</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems &&
                                currentItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.Phone}</td>
                                        <td>
                                            <a onClick={() => LoadEdit(item._id)} className="btn btn-success">
                                                <AiFillEdit />
                                            </a>
                                            <a onClick={() => Removefunction(item._id)} className="btn btn-danger">
                                                <BsTrashFill />
                                            </a>
                                            <a onClick={() => LoadDetail(item._id)} className="btn btn-primary">
                                                <GrView />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className={style.button25}>
                        <button onClick={prevPage} className= 'btn btn-primary text-centre m-1' disabled={currentPage === 1}>
                            Previous Page
                        </button>

                        <button
                            onClick={nextPage}
                            className='btn btn-primary text-centre' 
                            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

};

export default Dashboard;
