import { useState, React} from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Form (){
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailId, setEmailId] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const {showAlert} = location.state || {};
    if(showAlert){
        alert("Please Fill the necessary information");
    }

    function handleSubmit(){
        // i need to store the information in the local storage
        // i need to route it to the next page
        localStorage.setItem("names",JSON.stringify({name,phoneNumber,emailId}))
        navigate('/second');
    }

    

    return (
        <>
        <div>
            <h1>Contact Form</h1>
            <form>
                Name <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
                <br></br>
                Phone Number <input type="number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}></input>
                <br></br>
                Email Id <input type="text" value={emailId} onChange={(e)=>setEmailId(e.target.value)}></input>
            </form>
            <button onClick={handleSubmit}>Submit</button>
        </div>

        </>
    );
}

export default Form;