import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Users.css';

const User = () => {
    const [custlist, custupdate] = useState([]);
    const [id, idupdate] = useState('');
    const [first_name, firstnameupdate] = useState('');
    const [last_name, lastnameupdate] = useState('');
    const [email, emailupdate] = useState('');
    const [avatar, avatarupdate] = useState('');
    const [search, searchupdate] = useState('');
    const [col, issortedcol] = useState(null);
    const [sortkey, setsortkey] = useState('');


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
            if(localStorage.getItem('users') === null || localStorage.getItem('users') === '[]'){
                localStorage.setItem('users', JSON.stringify(res.data))
            custupdate(res.data)
            }
        })
    }

    const handleadd = () => {

        let a = (JSON.parse(localStorage.getItem('users')));
        a.push({
            'id':id,
            'email':email,
        'first_name':first_name,
        'last_name': last_name,
        'avatar':avatar})
        localStorage.setItem('users', JSON.stringify(a))
        custupdate(a)
        toast.success('Added')
    }

    const handleremove = (e, i)=> {
        e.preventDefault();
            let list = (JSON.parse(localStorage.getItem('users')));
            list.filter((a,g)=>{
                if(i===a.id){
                    list.splice(g,1)
                    localStorage.setItem('users', JSON.stringify(list))
                    custupdate(list)
                    toast.success('Removed')
                }
                return(list)
            })
    }
    const handlesort = (e,v)=>{
        setsortkey(v);
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

    const handleuser = (e,id) =>{
        e.preventDefault()
        navigate('./'+id)
    }


    console.log(custlist)
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
                            <tr className="sortpoint">
                                <th>ID</th>
                                <th onClick={(e) => handlesort(e,'first_name')}>First_Name{sortkey==='first_name'?col!=null ? <span> {col? ' 🔽': '🔼'} </span>: '':''}</th>
                                <th onClick={(e) => handlesort(e,'last_name')}>Last_Name{sortkey==='last_name'? col!=null ? <span> {col? ' 🔽': '🔼'} </span>: '':''}</th>
                                <th onClick={(e) => handlesort(e,'email')}>Email{sortkey==='email'? col!=null ? <span> {col? ' 🔽': '🔼'} </span>: '': ''}</th>
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
                                        <td className="profref" onClick={(e)=>handleuser(e,item.id)}>{item.id}</td>
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