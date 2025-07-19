import './student-ui.css'
import EnterCodeTextBox from './EnterCodeTextBox'
import { UserContext } from './UserContext'
import { useState } from 'react'

function JoinRoom() {
    const [username, setUsername] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [score, setScore] = useState(0);

    return (
        <div className="student-page">
            <UserContext.Provider value={{
                username,
                setUsername,
                roomCode,
                setRoomCode,
                score,
                setScore
                }}>
            <EnterCodeTextBox/>
            </UserContext.Provider>
        </div>
    )
}

export default JoinRoom;