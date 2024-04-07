
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClaimPage from './pages/ClaimPage';
import Boost from './pages/Boost';
import Task from './pages/Task';
import { UserProvider } from './context/UserContext'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <UserProvider >
          <Route component={HomePage} path="/" exact />
          <Route component={ClaimPage} path="/claim" exact />
          <Route component={Boost} path="/boost" exact />
          <Route component={Task} path="/task" exact />
          </UserProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
