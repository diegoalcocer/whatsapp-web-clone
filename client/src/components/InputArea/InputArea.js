import React, {useState} from 'react';
import './InputArea.css';

function InputArea(){
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        console.log(message);
        setMessage("");
    };

    return (
        <div className='input-area'>
            <input type='text' value={message}
            onChange={(e)=> setMessage(e.target.value)}
            placeholder='Type a message'
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default InputArea;