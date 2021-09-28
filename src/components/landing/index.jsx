// import moduls
import { AppRouter, GetAppRouter, SetAppRouter } from '../../hooks/AppRouter';

// style sheets
import './landing.css';

// Image
import LI from "../../assets/images/landing _image.png";
import GitHubLogo from "../../assets/images/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png";

// ------ Main Component ------ //
function Main() {
    return (<div id="body">
        <div className="container-div" id="navbar">
            <span className="navbar-span"><a href="/">Type</a></span>
            <span className="navbar-span" onClick={() => SetAppRouter('HelpCMP')}>help</span>
            <span className="navbar-span" onClick={() => SetAppRouter('AboutCMP')}>about</span>
        </div>
        <div className="container-div" id="header">
            <div id="header-image"><img id="header-image-id" src={LI} alt="Landing Image" /></div>
            <div id="header-context">
                " If a lot of your time sitting at your desk is spent typing,
                you might be able to improve your posture and
                your health by increasing your typing speed."
            </div>
        </div>
        <div className="container-div" id="context">
            This will mean less time spent typing at your desk, and that will lead to more time spent standing up and stretching
            <br />
            so as not to hurt your back, neck, and shoulders.
            <br />
            The more you practice, the faster you will get. Reward yourself!
        </div>
        <div className="container-div" id="button">
            <button id="lt-btn" onClick={() => SetAppRouter('HomeCMP')}>Launch Type Tester</button>
        </div>
        <div className="container-div" id="footer">
            <div id="footer-left">
                Created By &#160;
                <a href="http://github.com/apu-hub" target="_blank" rel="noopener noreferrer">
                    Chayan Sarkar
                </a>
            </div>
            <div id="footer-right">
                <a href="http://github.com/apu-hub/type-pwa" target="_blank" rel="noopener noreferrer">
                    <img src={GitHubLogo} alt="Github Logo" />
                </a>
            </div>
        </div>
    </div>);
}

export default Main;
