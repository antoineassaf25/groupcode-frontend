import { SetStateAction, useState } from 'react'
import { useAsyncValue } from 'react-router-dom';

export default function() {
    const EMPTY_FIELD_TEXT = "Enter Room Code!";
    const CODE_LENGTH = 6;
    const [text, setText] = useState<string>("");
    const [codeStatus, setCodeStatus] = useState<"TYPING" | "READY" | "LOADING" | "INCORRECT">("TYPING")

    const BUTTON_COLORS = {
        "TYPING" : "bg-gray-400",
        "READY" : "bg-green-500",
        "LOADING" : "bg-gray-800",
        "INCORRECT" : "bg-red-500"
    }

    function keyPressed(e: React.ChangeEvent<HTMLInputElement>) {
        const desiredText = e.target.value;


        // no input allowed while loading

        if (codeStatus === "LOADING") {
            return
        }

        // update code status
        if (desiredText.length >= 6) {
            setCodeStatus("READY")
        } else {
            setCodeStatus("TYPING")
        }
        
        // Codes should be no longer than 6 characters
        if (desiredText.length > 6) { return }

        setText(desiredText.toUpperCase());
    }

    async function codeSubmitted() {

        if (text.length !== CODE_LENGTH) { return }

        setCodeStatus("LOADING")

        try {
            const res = await fetch(`http://localhost:8080/api/rooms?code=${text}`);

            if (!res.ok) {
                setCodeStatus("INCORRECT")
                console.error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }

        } catch (err : any) {
            setCodeStatus("INCORRECT")
            console.error(err.message || 'Unknown error');
        }
        

    }

    return (
        <div className="flex flex-col gap-2 items-center w-[500px] h-[200px]">

            <input className="bg-gray-600 rounded-lg centered text-center text-gray-300 w-full text-4xl h-[70px]"
            value={text}
            placeholder={EMPTY_FIELD_TEXT}
            onChange={keyPressed}/>

            <button 
            className={`${BUTTON_COLORS[codeStatus]} h-[60px] text-3xl px-10`}
            onClick={codeSubmitted}
            disabled={text.length !== CODE_LENGTH}>
                JOIN ROOM!
            </button>
        </div>
    )
}