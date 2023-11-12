const Profile = () => {
    return (
        <div className="text-center">
            <h1 >Welcome!!!</h1>
            <b>{sessionStorage.email}</b><br/>  
            <b>{sessionStorage.jwttoken}</b>
        </div>
    );
}

export default Profile;