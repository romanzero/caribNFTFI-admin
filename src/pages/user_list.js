import React from 'react';
import CONST from '../globals/constants';
import Header from '../components/header';
import SideBar from '../components/side_bar';
import UserList from '../components/user_list';
import queryString from 'query-string';

class UserListPage extends React.Component {
    constructor(props) {
        super(props);

        const params = queryString.parse(this.props.location.search);

        this.state = {
            params: params
        };
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="page-content">
                    <SideBar selected_tab={CONST.SELECTED_SIDEBAR.USERS}/>
                    <UserList params={this.state.params}/>
                </div>
            </div>
        );
    }
}

export default UserListPage;