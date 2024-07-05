import { useState, React, useEffect} from "react"
import { useNavigate } from 'react-router-dom';


function Component (){
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("names")){
            // fetch the data from api and show on screen

        }
        else{
            // redirect to the first page
            navigate('/',{
                state:{
                    showAlert:true
                }
            })

        }
        

    })


    return (
        <p>Bye</p>
    );
}

export default Component;