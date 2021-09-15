// import moduls
import { useEffect, useState, Suspense, lazy } from 'react';
import { useComp } from './global_state';

// style sheets
import './App.css';

// import components
const Landing = lazy(() => import('./components/landing'));
const Type_area = lazy(() => import('./components/type_area'));


// ------ Main Component ------ //
function App() {
  // states
  const [compName, setSignUp] = useState("landing");
  // hooks
  const [getComp, setComp, subComp, unsubComp] = useComp();

  // functions
  const GStoCompName = () => setSignUp(getComp());

  useEffect(() => {
    subComp(GStoCompName);

    return () => {
      unsubComp(GStoCompName);
    }
  }, []);
  // Todo Add A Loading Component
  return (<>
    <Suspense fallback={<div>Loading...</div>}>
      {compName === "landing" && <Landing />}
      {compName === "type_area" && <Type_area />}
    </Suspense>
  </>);
}

export default App;
