import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
    const [custlist, custupdate] = useState([]);
    const [haveview, viewchange] = useState(true);
    const [haveadd, addchange] = useState(true);
    const [haveremove, removechange] = useState(true);

    const navigate=useNavigate();


    useEffect(() => {
        loadcustomer();
       
    }, []);

    const loadcustomer = () => {
        fetch("https://reqres.in/api/users")
        .then(res => {
            return res.json();
        }).then(res => {
            custupdate(res.data)
            console.log(custlist)
        });
    }


    const handleadd = () => {
        if(haveadd){
        toast.success('added')
        }else{
            toast.warning('You are not having access for add');
        }
    }

    const handleremove = () => {
        if(haveremove){
        toast.success('removed')
        }else{
            toast.warning('You are not having access for remove');
        }
    }


    return (
        <div className="container">

            <div className="card">
                <div className="card-header">
                    <h3>Users Listing</h3>
                </div>
                <div className="card-body">
                    <button onClick={handleadd} className="btn btn-success">Add (+)</button>
                    <br></br>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>ID</th>
                                <th>First_Name</th>
                                <th>Last_Name</th>
                                <th>Email</th>
                                <th>Avatar</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custlist &&
                                custlist.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>{item.email}</td>
                                        <td><img src={item.avatar} alt="avatar"></img></td>
                                        <td>
                                            <button onClick={handleremove} className="btn btn-danger">Remove</button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default User;