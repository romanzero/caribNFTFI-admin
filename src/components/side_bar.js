import React from 'react';
import CONST from '../globals/constants';

class SideBar extends React.Component {
    render() {
        return (
            <div className="sidebar sidebar-dark sidebar-main sidebar-expand-md">
                <div className="sidebar-mobile-toggler text-center">
                    <a href="#" className="sidebar-mobile-main-toggle">
                        <i className="icon-arrow-left8"></i>
                    </a>
                    Menu
                    <a href="#" className="sidebar-mobile-expand">
                        <i className="icon-screen-full"></i>
                        <i className="icon-screen-normal"></i>
                    </a>
                </div>
                <div className="sidebar-content">
                    <div className="card card-sidebar-mobile">
                        <ul className="nav nav-sidebar" data-nav-type="accordion">
                            <li className="nav-item">
                                <a href="/" className={this.props.selected_tab == CONST.SELECTED_SIDEBAR.USERS? "nav-link active": "nav-link"}>
                                    <i className="fas fa-home"></i>
                                    <span>Users</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/projects" className={this.props.selected_tab == CONST.SELECTED_SIDEBAR.PROJECTS? "nav-link active": "nav-link"}>
                                    <i className="fas fa-coins"></i>
                                    <span>Projects</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/contracts" className={this.props.selected_tab == CONST.SELECTED_SIDEBAR.CONTRACTS? "nav-link active": "nav-link"}>
                                    <i className="fas fa-coins"></i>
                                    <span>Contracts</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/tokens" className={this.props.selected_tab == CONST.SELECTED_SIDEBAR.TOKENS? "nav-link active": "nav-link"}>
                                    <i className="fas fa-coins"></i>
                                    <span>Tokens</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBar;