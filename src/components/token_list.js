import React from 'react';
import swal from 'sweetalert';
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
import API from '../adapter/api';
import $ from 'jquery';
import Web3 from 'web3';
import ERC721 from '../contracts/ERC721.json';
import config from '../globals/config';
import {Multicall, ContractCallResults, ContractCallContext} from 'ethereum-multicall';
import TokenItem from './token_item';

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

class TokenList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contracts: [],
            projects: [],
            tokens: [],
            show_loading: false
        };
    }

    componentDidMount() {
        this.showLoading();

        this.getProjects();
        this.getContracts();

        if (this.props.params == undefined) {
            this.getTokens();
        } else {
            this.getTokens(this.props.params.owner, this.props.params.contract, this.props.params.token_id, this.props.params.project);
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

    getContracts(address = '', name = '', project = 0) {
        API.get_contracts(address, name, project)
        .then((res) => {
            if (res.result) {
                this.setState({
                    contracts: res.data
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getProjects() {
        API.get_projects('')
        .then((res) => {
            if (res.result) {
                this.setState({
                    projects: res.data
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getTokens(owner = '', contract = 0, token_id = '', project = 0) {
        API.get_tokens(owner, contract, token_id, project)
        .then((res) => {
            this.hideLoading();console.log(res.data); console.log(typeof res.data);

            if (res.result) {
                this.setState({
                    tokens: res.data
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
        var owner = $("#search_owner").val();
        var contract = $("#search_contract").val();
        var token_id = $("#search_token_id").val();
        var project = $("#search_project").val();

        document.location = "?owner=" + owner + "&contract=" + contract + "&token_id=" + token_id + "&project=" + project;
    }

    handleDelete(item) {
        swal({
            title: 'Delete',
            text: 'Are you sure to delete this project?',
            buttons: true,
            dangerMode: true,
        })
        .then((isConfirm) => {
            if (isConfirm) {
                this.showLoading();

                API.delete_project(item.id)
                .then((res) => {
                    document.location.reload();
                })
            }
        })
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
                                <h5><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Token Management
                                </span></h5>
                            </div>
                        </div>

                        <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div className="d-flex">
                                <div className="breadcrumb">
                                    <a href="/" className="breadcrumb-item"><i className="fas fa-home mr-2"></i> Home</a>
                                    <span className="breadcrumb-item active">Token Management</span>
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
                                                <label className="col-form-label col-lg-2">Owner</label>
                                                <div className="col-lg-10">
                                                    <input id="search_owner" type="text" className="form-control" defaultValue={this.props.params == undefined? "": this.props.params.owner}/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Project</label>
                                                <div className="col-lg-10">
                                                    <select id="search_project" className="form-control" defaultValue={this.props.params == undefined? 0: this.props.params.project}>
                                                        <option value="0">All</option>
                                                        {
                                                            this.state.projects.map((item, index) => {
                                                                return (<option value={item.id}>{item.name}</option>);
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Contract</label>
                                                <div className="col-lg-10">
                                                    <select id="search_contract" className="form-control" defaultValue={this.props.params == undefined? 0: this.props.params.contract}>
                                                        <option value="0">All</option>
                                                        {
                                                            this.state.contracts.map((item, index) => {
                                                                return (<option value={item.id}>{item.name}</option>);
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Token ID</label>
                                                <div className="col-lg-10">
                                                    <input id="search_token_id" type="text" className="form-control" defaultValue={this.props.params == undefined? "": this.props.params.token_id}/>
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
                                <h5 className="card-title">Contract List</h5>
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
                                        <th className="text-center">Contract Address</th>
                                        <th className="text-center">Token ID</th>
                                        <th className="text-center">Project</th>
                                        <th className="text-center">Token Name</th>
                                        <th className="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tokens.map((item, index) => {
                                            return (
                                                <TokenItem item={item}/>
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

export default TokenList;