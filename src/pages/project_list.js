import React from 'react';
import CONST from '../globals/constants';
import Header from '../components/header';
import SideBar from '../components/side_bar';
import queryString from 'query-string';
import ProjectList from '../components/project_list';

class ProjectListPage extends React.Component {
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
                    <SideBar selected_tab={CONST.SELECTED_SIDEBAR.PROJECTS}/>
                    <ProjectList params={this.state.params}/>
                </div>
            </div>
        );
    }
}

export default ProjectListPage;