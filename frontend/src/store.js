import React from "react";
import { useNavigate } from "react-router-dom";

const Store = (props) => {
    const navigate = useNavigate();
    
    const onButtonClick = () => {
        localStorage.removeItem("user")
        props.setLoggedIn(false)
        navigate("/")
    }
    
    return <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log Out"} />
        </div>
}

export default Store;