// import moduls
import { useState } from "react";
import { useComp } from '../../global_state'
import PopUp from '../popup'

// stylesheet
import "./landing.css"

// data
import prefixedStory from '../../assests/data/prefixed_story.json'


// ------ Main Component ------ //
function Main() {
    // state
    const [customStory, setCustomStory] = useState("");
    const [popupBody, setPopupBody] = useState("he he, I did something worng");
    const [popupTitle, setPopupTitle] = useState("Warning");
    const [showPopUp, setShowPopUp] = useState(false);
    // hooks
    const [getComp, setComp] = useComp();

    // functions
    // ^^^^^^ Save Story To Local Storage ^^^^^^ //
    function saveToLocalStorage(story) {
        let storyArray = story.split("");
        if (localStorage.getItem("store") === null) {
            let LS_store = {
                reference_letters: storyArray
            };
            localStorage.setItem("store", JSON.stringify(LS_store));
        } else {
            let LS_store = JSON.parse(localStorage.getItem("store"));
            LS_store["reference_letters"] = storyArray;
            localStorage.setItem("store", JSON.stringify(LS_store));
        }
    }

    // ^^^^^^ On Click Start Now ^^^^^^ //
    function onStartNow() {
        // Check custom story lenth 
        // minimum lenght 100 characters
        if (customStory.length < 100) {
            // Show Warning
            setPopupBody(<>
                Minimum <b>100 characters</b> needed for start
            </>);
            setPopupTitle("Warning");
            setShowPopUp(true);
            return;
        }
        // save it to local store 
        saveToLocalStorage(customStory);

        // Load Type Area
        setComp("type_area");
    }
    function onClickPrefixed(storyNo) {
        // save it to local store 
        saveToLocalStorage(prefixedStory[storyNo].story);
        // Load Type Area
        setComp("type_area");
    }

    return (
        <div className="container" id="landing">
            <PopUp show={showPopUp} body={popupBody} title={popupTitle} onClose={() => setShowPopUp(false)} />
            <div className="story custom-story">
                <textarea
                    className="bmp-cleaner "
                    name="custom-story-textarea"
                    placeholder="Remember, be nice!"
                    id="custom-story-textarea"
                    onChange={e => setCustomStory(e.target.value)}
                    value={customStory}
                ></textarea>
                <br />
                <button
                    className="bmp-cleaner "
                    id="start-now-button"
                    onClick={onStartNow}
                >Start Now</button>
            </div>
            <div className="story prefixed-story">
                <div id="prefixed-story-buttons">
                    <button className="story-button" onClick={() => { onClickPrefixed(0) }}>{prefixedStory[0].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(1) }}>{prefixedStory[1].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(2) }}>{prefixedStory[2].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(3) }}>{prefixedStory[3].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(4) }}>{prefixedStory[4].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(5) }}>{prefixedStory[5].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(6) }}>{prefixedStory[6].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(7) }}>{prefixedStory[7].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(8) }}>{prefixedStory[8].name}</button><br />
                    <button className="story-button" onClick={() => { onClickPrefixed(9) }}>{prefixedStory[9].name}</button>
                </div>
            </div>

        </div>
    )
}

export default Main;