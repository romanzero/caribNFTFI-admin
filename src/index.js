import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserListPage from './pages/user_list';
import ProjectListPage from './pages/project_list';
import ProjectAdd from './components/project_add';
import Header from './components/header';
import SideBar from './components/side_bar';
import CONST from './globals/constants';
import ProjectUpdatePage from './pages/project_update';
import ContractListPage from './pages/contract_list';
import TokenListPage from './pages/token_list';
import ContractAdd from './components/contract_add';
import ContractUpdatePage from './pages/contract_update';
import TokenOfferPage from './pages/token_offer';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserListPage}>
        </Route>
        <Route exact path="/projects" component={ProjectListPage}>
        </Route>
        <Route exact path="/project_add">
            <div>
                <Header/>
                <div className="page-content">
                    <SideBar selected_tab={CONST.SELECTED_SIDEBAR.PROJECTS}/>
                    <ProjectAdd/>
                </div>
            </div>
        </Route>
        <Route exact path="/project_update" component={ProjectUpdatePage}>
        </Route>
        <Route exact path="/contracts" component={ContractListPage}>
        </Route>
        <Route exact path="/tokens" component={TokenListPage}>
        </Route>
        <Route exact path="/token_offers" component={TokenOfferPage}>
        </Route>
        <Route exact path="/contract_add">
            <div>
                <Header/>
                <div className="page-content">
                    <SideBar selected_tab={CONST.SELECTED_SIDEBAR.CONTRACTS}/>
                    <ContractAdd/>
                </div>
            </div>
        </Route>
        <Route exact path="/contract_update" component={ContractUpdatePage}>
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
