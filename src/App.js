import LandingPage from './components/LandingPage'
import QuestionPage from './components/QuestionPage'
import React from 'react';

function App() {
  const [hasStarted, setHasStarted] = React.useState(false)

  function switchPage() {
    setHasStarted(prevHasStarted => !prevHasStarted)
  }

  return (
    <div>
      {!hasStarted ? <LandingPage switchPage={switchPage}/> : <QuestionPage />}
    </div>
  );
}

export default App;
