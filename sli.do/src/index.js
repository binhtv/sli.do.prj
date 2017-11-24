import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import DashboardPanel from './containers/DashboardPanel';
import AudiencePanel from './containers/AudiencePanel';
import EventDetailPanel from './containers/EventDetailPanel';
import Callback from './components/Auth/Callback';
import configureStore from './store/configureStore';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Auth from './components/Auth/Auth';
import './assets/css/style.css';


let preloadedState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// Create an enhanced history that syncs navigation events with the store
const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route path="/" component={(props) => <App auth={auth} {...props}/>}/>
                <Route path="admin/events" component={(props) => <DashboardPanel auth={auth} {...props}/>} />
                <Route path="admin/event/:id" component={(props) => <EventDetailPanel auth={auth} {...props}/>} />
                <Route path="event/:id" component={(props) => <AudiencePanel auth={auth} {...props}/>} />
                <Route path="/callback" component={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} /> 
                  }}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
//registerServiceWorker();
