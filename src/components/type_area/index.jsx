// import moduls
import { useEffect, useState } from "react";
import PopUp from '../popup';
import useCountTime from '../../hooks/useCountTime';
import * as actions from './actions.js';
import { AppRouter, GetAppRouter, SetAppRouter } from '../../hooks/AppRouter';

// stylesheet
import "./type_area.css";

// ------ Main Component ------ //
function Main() {
    // states
    const [btnCon, setbtnCon] = useState(true);
    const [referenceLetters, setReferenceLetters] = useState([]);
    const [typeLetters, setTypeLetters] = useState("");
    const [targetTime, setTargetTime] = useState(60);
    const [timeOption, setTimeOption] = useState("select");
    const [modalBody, setModalBody] = useState("he he, I did something worng");
    const [modalTitle, setModalTitle] = useState("Warning");
    const [popUp, setPopUp] = useState(false);

    // hooks
    const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useCountTime(0);

    // functions
    // ^^^^^^ On Click Ready ^^^^^^ //
    function onClickReady() {
        setbtnCon(false);
        // setTypeLetters("");
        setTimeOption("counter")
        handleStart();
    }

    // ^^^^^^ On Click Stop ^^^^^^ //
    function onClickStop() {
        setbtnCon(false);
        handlePause();
        if (typeLetters.length !== 0) {
            setModalBody(actions.generateResult(timer, referenceLetters, typeLetters));
            setModalTitle("Result");
            setPopUp(true);
        }
        handleReset();
        // setTypeLetters("");
        setTimeOption("change");
    }

    // ^^^^^^ On Select Time ^^^^^^ //
    function selectTime(time) {
        setTargetTime(time);
        setTimeOption("change");
    }

    // ^^^^^^ Back To Landing ^^^^^^ //
    function backToHome() {
        SetAppRouter('HomeCMP');
    }
   
    useEffect(() => {
        if (timer >= targetTime) {
            onClickStop();
        }

        if (localStorage.getItem("store") === null) {
            // Return to Landing 
            backToHome();
        } else {
            let LS_store = JSON.parse(localStorage.getItem("store"));
            setReferenceLetters(LS_store.reference_letters);
        }
    }, [timer])
    return (<div className="container" id="typearea">
        <PopUp show={popUp} onClose={() => setPopUp(false)} body={modalBody} title={modalTitle} />
        <div id="typearea-content">
            <div id="reference-letters">

                {referenceLetters.map((letter, index) => {

                    let out = " ";
                    if (typeLetters[index] === undefined) {
                        if (letter === " ") {
                            out = <span key={index}> </span>;
                        } else {
                            out = <span key={index}>{letter}</span>;
                        }
                    } else {
                        if (letter === typeLetters[index]) {
                            if (letter === " ") {
                                out = <span key={index} className="right-letter"> </span>;
                            } else {
                                out = <span key={index} className="right-letter">{letter}</span>;
                            }
                        } else {
                            if (letter === " ") {
                                out = <span key={index} className="wrong-letter"> </span>;
                            } else {
                                out = <span key={index} className="wrong-letter">{letter}</span>;
                            }
                        }

                    }
                    return (<>{out}</>);
                })
                }
            </div>
            <div id="type-letters">
                <textarea disabled={btnCon} autoFocus={true}
                    onChange={(e) => { setTypeLetters(e.target.value) }}
                    name="type-letters-textarea"
                    id="type-letters-textarea"
                    value={typeLetters}>
                </textarea>
            </div>
        </div>
        <div id="typearea-option">
            {timeOption === "counter" ? <span id="counter-time">{actions.formatTime(timer)}</span> : (timeOption === "select" ? (
                <span id="select-time">
                    <u>Select Time</u><br />
                    <button onClick={() => selectTime(60)} className="select-time-button" style={{ backgroundColor: 'rgb(246, 246, 246)' }}>1 minute</button><br />
                    <button onClick={() => selectTime(120)} className="select-time-button" style={{ backgroundColor: 'rgb(234, 234, 234)' }}>2 minute</button><br />
                    <button onClick={() => selectTime(300)} className="select-time-button" style={{ backgroundColor: 'rgb(212, 212, 212)' }}>5 minute</button><br />
                    <button onClick={() => selectTime(500)} className="select-time-button" style={{ backgroundColor: 'rgb(196, 196, 196)' }}>custom</button>
                </span>
            ) : (<span id="change-time">
                <button onClick={() => setTimeOption("select")} className="select-time-button" style={{ backgroundColor: 'rgb(196, 196, 196)' }}>change</button>
            </span>))}

            {!isActive ? (
                <span id="ready">
                    <button className="ready-button" onClick={onClickReady}>Ready</button><br />
                    <button className="exit-button" onClick={backToHome}>Home</button>
                </span>
            ) : (isActive && isPaused ? (
                <span>
                    <button className="pause-button" onClick={handlePause}>Pause</button><br />
                    <button className="stop-button" onClick={onClickStop}>Stop</button>
                </span>
            ) : <span>
                <button className="pause-button" onClick={handleResume}>Resume</button><br />
                <button className="stop-button" onClick={onClickStop}>Stop</button>
            </span>)}
        </div>
    </div>)
}

export default Main;