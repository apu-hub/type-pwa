// compName GS
export const useComp = (() => {
    let compNameInstance;
    let subs = [];
    const createCompNameInstance = () => {
        let compName = "landing";
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
