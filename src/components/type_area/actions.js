/**
 * Generate Result
 * @param {*} typeTime 
 * @param {*} referenceCharacters 
 * @param {*} typeCharactersStr 
 * @returns `JSX.Element`
 */
export function generateResult(typeTime, referenceCharacters, typeCharactersStr) {

    let referenceWords = charTOword(referenceCharacters);
    let typeCharacters = typeCharactersStr.split("");
    let typeWords = charTOword(typeCharacters);

    let result = {};

    // correct word & character

    // Word Per Minute
    result["wpm"] = (60 / (typeTime / typeWords.length));

    // Character Per Minute
    result["cpm"] = (60 / (typeTime / typeCharacters.length));

    // Total Words
    result["totalWord"] = typeWords.length;

    // Total Characters
    result["totalChar"] = typeCharacters.length;

    // Todo return on map
    // Space & Special Characters
    let ssc = 0;
    typeCharacters.map((e) => { if (e.search(/[a-zA-Z0-9]/) !== 0) ssc++; });
    result["ssc"] = ssc;

    // Maximum Word Size
    let maxWS = 1;
    typeWords.map((e) => { if (maxWS <= e.length) maxWS = e.length; });
    result["maxW"] = maxWS;

    // Minimum Word Size
    let minWS = 1;
    typeWords.map((e) => { if (minWS >= e.length) minWS = e.length; });
    result["minW"] = minWS;

    // Most Common Character
    let mostWordArray = [];
    typeWords.map((e) => {
        if (mostWordArray.length === 0) {
            mostWordArray.push({ word: e, no: 1 });
        } else {
            let rindex
            mostWordArray.map((a, index) => {
                if (a.word === e) rindex = index;
            });
            if (rindex !== undefined) {
                mostWordArray[rindex].no += 1;
            } else {
                mostWordArray.push({ word: e, no: 1 });
            }
        }
    });
    let mostWordIndex = 0;
    mostWordArray.map((e, index) => { if (mostWordArray[mostWordIndex].no < e.no) { mostWordIndex = index; } });
    result["mcc"] = mostWordArray[mostWordIndex].word;

    // Overall Score
    result["overallScore"] = result.wpm / 0.4;

    // Generate Result Component 
    return <>
        Word Per Minute : {result.wpm} <br />
        Character Per Minute : {result.cpm}<br />
        Total Words : {result.totalWord}<br />
        Total Characters : {result.totalChar}<br />
        Space & Special Characters : {result.ssc} <br />
        Maximum Word Size : {result.maxW}<br />
        Minimum Word Size : {result.minW}<br />
        Most Common Character : {result.mcc}<br />
        <b>Overall Score : {result.overallScore}% (By Standard)</b>
    </>;
}

/**
 * Time Format
 * @param {*} timer 
 * @returns `string`
 */
export const formatTime = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getMinutes} : ${getSeconds}`;
}

/**
 * Character Array To Ward Array
 * @param {*} array 
 * @returns `array`
 */
function charTOword(array) {
    let tempWord = "";
    let tempWordArray = [];
    let i = 0;
    array.map((e) => {
        // check valid char
        if (e.search(/[a-zA-Z0-9]/) !== 0) {
            // incase first char is not matched
            if (tempWordArray.length !== 0)
                i++;    // increament array index

            tempWord = "";  // clear it for next word
        } else {
            tempWord += e;  // add next char of the word
            tempWordArray[i] = tempWord;    // store word
        }
    });
    return tempWordArray;
}