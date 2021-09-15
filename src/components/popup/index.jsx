// stylesheer
import "./popup.css"
/**
 * 
 * @param {*} props show 'true' or 'false'
 * @param {*} props title
 * @param {*} props body
 * @returns 
 */
// ------ Main Component ------ //
function Main(props) {
    if (!props.show) {
        return null;
    }
    // TODO add `ESC` handler
    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><h4 className="modal-title">{props.title}</h4></div>
                <div className="modal-body">{props.body}</div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="modal-button-close">close</button>
                </div>
            </div>
        </div>
    )
}
export default Main;