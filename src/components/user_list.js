import React from 'react';
import config from '../globals/config';
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
import API from '../adapter/api';
import $ from 'jquery';

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            show_loading: false
        };
    }

    componentDidMount() {
        if (this.props.params == undefined) {
            this.getUsers();
        } else {
            this.getUsers(this.props.params.name, this.props.params.address);
        }
    }

    showLoading() {
        this.setState({
            show_loading: true
        });
    }

    hideLoading() {
        this.setState({
            show_loading: false
        });
    }

    getUsers(name = '', address = '') {
        this.showLoading();
        API.get_users(name, address)
        .then((res) => {console.log(res);
            this.hideLoading();
            if (res.result) {
                this.setState({
                    users: res.data
                });

                var script = document.createElement('script');
                script.src = '../assets/js/init_datatable.js';
                script.async = true;
                document.body.appendChild(script);
            }
        })
        .catch((err) => {
            console.log(err);
            this.hideLoading();
        })
    }

    handleSearch() {
        var name = $("#search_name").val();
        var address = $("#search_address").val();

        document.location = "?name=" + name + "&address=" + address;
    }

    onAvatarError(ev){
        ev.target.src = config.thumb_avatar_url + "default.png"
    }

    render() {
        var style_hidden = {display: 'none'};
        return (
            <div style={{width: '100%'}}>
                <DarkBackground disappear={this.state.show_loading}>
                    <LoadingOverlay
                        active={true}
                        // spinner={<BounceLoader />}
                        spinner={true}
                        text="Please wait..."
                        >
                        {/* <p>Some content or children or something.</p> */}
                    </LoadingOverlay>
                </DarkBackground>
                <div className="content-wrapper">
                    <div className="page-header">
                        <div className="page-header-content header-elements-md-inline">
                            <div className="page-title d-flex">
                                <h5><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">User Management
                                </span></h5>
                            </div>
                        </div>

                        <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div className="d-flex">
                                <div className="breadcrumb">
                                    <a href="/" className="breadcrumb-item"><i className="fas fa-home mr-2"></i> Home</a>
                                    <span className="breadcrumb-item active">User Management</span>
                                </div>
                                <a className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="content pt-0">
                        <div className="card-group-control card-group-control-right">
                            <div className="card">
                                <div className="card-header bg-dark">
                                    <h6 className="card-title">
                                        <a data-toggle="collapse" className="collapsed text-white" href="#collapsible-search-items">Search Filter</a>
                                    </h6>
                                </div>

                                <div id="collapsible-search-items" className="collapse">
                                    <div className="card-body">
                                        <fieldset>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Name</label>
                                                <div className="col-lg-10">
                                                    <input id="search_name" type="text" className="form-control" defaultValue={this.props.params == undefined? "": this.props.params.name}/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Address</label>
                                                <div className="col-lg-10">
                                                    <input id="search_address" type="text" className="form-control" defaultValue={this.props.params == undefined? "": this.props.params.address}/>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="text-center">
                                            <button type="button" className="btn btn-primary" onClick={() => this.handleSearch()}>Search <i className="fas fa-search ml-2"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header header-elements-inline">
                                <h5 className="card-title">User List</h5>
                                <div className="header-elements">
                                    <div className="list-icons">
                                        {/* <a className="list-icons-item" data-action="collapse"></a> */}
                                        {/* <a className="list-icons-item" data-action="remove"></a> */}
                                    </div>
                                </div>
                            </div>

                            <table className="table datatable-basic table-bordered js-list">
                                <thead>
                                    <tr>
                                        <th className="text-center"></th>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Address</th>
                                        <th className="text-center">Tokens</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center"><img src={config.thumb_avatar_url + item.thumb_path} className="img-thumbnail ryma-token-thumbnail" onError={this.onAvatarError}/></td>
                                                    <td className="text-center">{item.name}</td>
                                                    <td className="text-center">{item.address}</td>
                                                    <td className="text-center">{item.token_cnt} tokens</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div id="init_datatable" style={style_hidden}></div>
                        </div>
                    </div>

                    <div className="navbar navbar-expand-lg navbar-light">
                        <div className="text-center d-lg-none w-100">
                            <button type="button" className="navbar-toggler dropdown-toggle" data-toggle="collapse"
                                data-target="#navbar-footer">
                                <i className="icon-unfold mr-2"></i>
                                Footer
                            </button>
                        </div>

                        <div className="navbar-collapse collapse" id="navbar-footer">
                            <span className="navbar-text">
                                &copy; 2021 - 2031. NFTFI
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserList;