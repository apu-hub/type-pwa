// App Rouer
// Version: 01
// By Chayan Sarkar https://github.com/apu-hub
// Thanks to Andrius Satraitis for react-singleton-store https://github.com/asatraitis/react-singleton-store


import { Suspense, useState, useEffect } from 'react';

/**
 * App Router Component
 * @param {*} Object components 
 * @returns JSX.Element
 */
function AppRouter(props) {
    const [name, setName] = useState("DEFAULT");   // Defualt Component
    const [getCompName, , subscribe, unsubscribe] = useComp();  // Use Component Hooks

    const CompName = () => setName(getCompName());  // Get Current Component Name

    useEffect(() => {
        subscribe(CompName);
        return () => { unsubscribe(CompName); }
    }, []);

    var Comp = null;
    if (props.components[name] === undefined)
        Comp = NOTFOUND;
    else
        Comp = props.components[name];
    // todo get loading component from user
    return (<>
        <Suspense fallback={<div>Loading...</div>}>
            <Comp />
        </Suspense>
    </>);
}

// ------ Not Found Component ------ //
const NOTFOUND = () => {
    return (<><center style={{ "backgroundColor": "white" }}>
        <h1>Please add a <strong>Not Found</strong> component to components object</h1>
        <br /><br /><br />
        learn more about <a href="http://apu-hub.github.io/app-router/" target="_blank" rel="noopener noreferrer">
            app-router
        </a> and <a href="http://apu-hub.github.io/app-router/" target="_blank" rel="noopener noreferrer">
            component object
        </a>
    </center></>);
}
/**
 * Find That Youtube Who Help
 */
// ------ ASYNC Storage ------ //
const useComp = (() => {
    let compNameInstance;
    let subs = [];
    const createCompNameInstance = () => {
        let compName = 'DEFAULT';
        const getCompName = () => {
            return compName;
        }
        const setCompName = (newCompName) => {
            compName = newCompName;
            subs.forEach(fx => fx());
            return compName;
        }
        const subscribe = (fx) => {
            subs.push(fx);
        }
        const unsubscribe = (fx) => {
            let index = subs.indexOf(fx);
            subs.splice(index, 1);
        }

        return [getCompName, setCompName, subscribe, unsubscribe];
    }

    return () => {
        if (!compNameInstance) {
            compNameInstance = createCompNameInstance();
        }
        return compNameInstance
    }
})()

/**
 * Set App Router
 * @param {*} string ComponentName 
 */
function SetAppRouter(name = 'DEFAULT') {
    const [, setCompName, ,] = useComp();
    return setCompName(name);
}

/**
 * Get App Router
 * @return `string` ComponentName
 */
function GetAppRouter() {
    const [getCompName, , ,] = useComp();
    return getCompName();
}

export { AppRouter, GetAppRouter, SetAppRouter };