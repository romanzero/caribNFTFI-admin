import React from 'react';
import CONST from '../globals/constants';
import Header from '../components/header';
import SideBar from '../components/side_bar';
import queryString from 'query-string';
import TokenList from '../components/token_list';

class TokenListPage extends React.Component {
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
                    <SideBar selected_tab={CONST.SELECTED_SIDEBAR.TOKENS}/>
                    <TokenList params={this.state.params}/>
                </div>
            </div>
        );
    }
}

export default TokenListPage;