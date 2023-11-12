import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./features/userSlice";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
    localStorage.clear();
    },[]);


    const {error} = useSelector((state)=>state.user)

    const dispatch = useDispatch();
    const handlerLogin = (e) =>{
        e.preventDefault();
        let userCredentials={
            username,password
        }
        dispatch(loginUser(userCredentials)).then((result)=>{
            if(result.error ===null ||result.error ===undefined){
                toast.success('Success');
                     usernameupdate('');
                     passwordupdate('');
                   usenavigate('/profile')
            }
            else{
                console.log(result)
                toast.error(result.payload);
            }
        })
    }

    /*const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            let inputobj={"email": username,
            "password": password};
            fetch("https://reqres.in/api/login",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if ((resp.token)? false: true) {
                    toast.error('Login failed, invalid credentials');
                }else{
                     toast.success('Success');
                     localStorage.setItem('email',username);
                     localStorage.setItem('password',password);
                     localStorage.setItem('jwttoken',resp.token);
                   usenavigate('/profile')
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }*/
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={handlerLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;