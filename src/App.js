// import moduls
import { lazy } from 'react';
import { AppRouter, GetAppRouter, SetAppRouter } from './hooks/AppRouter';

// style sheets
import './App.css';

// import components
const LandingCMP = lazy(() => import('./components/landing'));
const HomeCMP = lazy(() => import('./components/home'));
const Type_areaCMP = lazy(() => import('./components/type_area'));

// Component Objects 
const components = {
  LandingCMP: LandingCMP,
  HomeCMP: HomeCMP,
  AboutCMP: HomeCMP,
  HelpCMP: HomeCMP,
  Type_areaCMP: Type_areaCMP,
  // NOTFOUND: NOTFOUNDCOMPONENT,
  DEFAULT: LandingCMP
};

// TEST
window.onbeforeunload = () => false;

// ------ Main Component ------ //
function App() {
  // Todo Add A Loading Component
  return (<AppRouter components={components} />);
}

export default App;
