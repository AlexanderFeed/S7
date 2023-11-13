import { useEffect, useState } from "react"
import './Watch.css' 

 const Watch = () =>{
    const gid = parseInt(window.location.href.split('/').at(-1));
    return(
        <div>   

                {localStorage.getItem('users') &&
                    JSON.parse(localStorage.getItem('users')).filter((item)=>{return item.id === gid ? item : ''}).map(item => (
                        <div className="watch" key={item.id}>
                            <img src={item.avatar} alt="avatar"></img>
                            <span className="info">{item.first_name}</span>
                            <span className="info">{item.last_name}</span>
                            <span className="info">{item.email}</span>
                        </div>
                                ))
                            }

        </div>
    )



    
}
export default Watch
