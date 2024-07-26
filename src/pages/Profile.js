import axios from "axios";
import { useEffect, useState } from "react";

function Profile  () {
    const token = localStorage.getItem('user');
    const [userData,setUserData] = useState([]);

    useEffect(()=>{
        const handleloginSubmit = async () => {
            const url = "http://127.0.0.1:3001/api/auth/profile";
            try {
              const data = await axios.get(url, {
                headers: {
                  "Authorization" :`Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });

                setUserData(data.data);

                console.log(data);
            } catch (error) {
                setUserData(null);
            }
          };
          handleloginSubmit();
    })
    return (

        <p> profile page  
            
        {userData.id} 
         {userData.Firstname}
        </p>
       
       
    );
}
export default Profile;