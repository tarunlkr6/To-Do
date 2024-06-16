import React, { useState } from "react";

export default function Footer() {

    const now = new Date().toLocaleTimeString();
    const currDate = new Date().toLocaleDateString();
    const [time, setTime] = useState(now);
    const name = "Tarun Kumar"

    function newTime() {
        const currentTime = new Date().toLocaleTimeString();
        setTime(currentTime);
    }
    setInterval(newTime, 1000);
    
    return (
        <footer class='footer'>
            <p>{currDate}   {time}</p>
            <p>Copyright &copy; {name}</p>
        </footer>
    );
}