const Profile = () => {
    return (
        <div className="text-center">
            <h1 >Welcome!!!</h1>
            <b>{localStorage.email}</b><br/>  
            <b>{localStorage.jwttoken}</b>
        </div>
    );
}

export default Profile;