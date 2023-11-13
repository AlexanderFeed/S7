import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
    const [custlist, custupdate] = useState([]);
    const [haveadd, addchange] = useState(true);
    const [haveremove, removechange] = useState(true);
    const [id, idupdate] = useState('');
    const [first_name, firstnameupdate] = useState('');
    const [last_name, lastnameupdate] = useState('');
    const [email, emailupdate] = useState('');
    const [avatar, avatarupdate] = useState('');
    const [search, searchupdate] = useState('');
    const [glength, setglength] = useState(0);
    const [col, issortedcol] = useState(true);


    const navigate=useNavigate();


    useEffect(() => {
       loadcustomer()
    }, []);

    const loadcustomer = () => {
        fetch("https://reqres.in/api/users")
        .then(res => {
            return res.json();
        })
        .then(res =>{
            if(localStorage.getItem('users') === null){
                localStorage.setItem('users', JSON.stringify(res.data))
                setglength(JSON.parse(localStorage.getItem('users')).length)
            custupdate(res.data)
            }
        })
    }

    const handleadd = () => {
        if(haveadd){
        let a = (JSON.parse(localStorage.getItem('users')));
        a.push({
            'id':id,
            'email':email,
        'first_name':first_name,
        'last_name': last_name,
        'avatar':avatar})
        localStorage.setItem('users', JSON.stringify(a))
        custupdate(a)
        setglength(a.length)
        toast.success('Added')
        }
    }

    const handleremove = (e, i)=> {
        e.preventDefault();
        if(haveremove){
            let list = (JSON.parse(localStorage.getItem('users')));
            list.filter((a,g)=>{
                if(i===a.id){
                    list.splice(g,1)
                    localStorage.setItem('users', JSON.stringify(list))
                    custupdate(list)
                    setglength(list.length)
                    toast.success('Removed')
                }
            })
        }
    }
    const handlesort = (e,v)=>{
        
        let list = (JSON.parse(localStorage.getItem('users')));
        if(!col){
            const finish = list.sort((a,b)=>{ 
                 return a[v].toLocaleLowerCase() > b[v].toLocaleLowerCase()? 1 : -1
            })
            localStorage.setItem('users', JSON.stringify(finish))
            issortedcol(true)
        }
        else{

            const finish = list.sort((a,b)=>{ 
                 return a[v].toLocaleLowerCase() < b[v].toLocaleLowerCase()? 1 : -1
            })
            localStorage.setItem('users', JSON.stringify(finish))

            issortedcol(false)
        }
    }


    return (
        <div className="container">

            <div className="card">
                <div className="card-header">
                    <h3>Users Listing</h3>
                </div>
                <div className="card-body">
                <label>ID</label>
                <input value={id} onChange={e => idupdate(e.target.value)} className="form-control"></input>
                <label>First Name</label>
                <input value={first_name} onChange={e => firstnameupdate(e.target.value)} className="form-control"></input>
                <label>Last Name </label>
                <input value={last_name} onChange={e => lastnameupdate(e.target.value)} className="form-control"></input>
                <label>Email </label>
                <input value={email} onChange={e => emailupdate(e.target.value)} className="form-control"></input>
                <label>Avatar(URL)</label>
                <input value={avatar} onChange={e => avatarupdate(e.target.value)} className="form-control"></input>
                    <button onClick={handleadd} className="btn btn-success">Add (+)</button>
                    <br/>
                    <br/>
                    <label>Search Bar</label>
                    <input value={search} onChange={e => searchupdate(e.target.value) } className="form-control"></input>
                    <br/>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>ID</th>
                                <th onClick={(e) => handlesort(e,'first_name')}>First_Name</th>
                                <th onClick={(e) => handlesort(e,'last_name')}>Last_Name</th>
                                <th onClick={(e) => handlesort(e,'email')}>Email</th>
                                <th>Avatar</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localStorage.getItem('users') &&
                                JSON.parse(localStorage.getItem('users')).filter((item)=>{
                                    return search.toLocaleLowerCase() === ''? item:item.first_name.toLocaleLowerCase().includes(search) ||item.last_name.toLocaleLowerCase().includes(search) ||item.email.toLocaleLowerCase().includes(search) 
                                }).map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>{item.email}</td>
                                        <td><img src={item.avatar} alt="avatar"></img></td>
                                        <td>
                                            <button onClick={(e)=>handleremove(e,item.id)} className="btn btn-danger">Remove</button>
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