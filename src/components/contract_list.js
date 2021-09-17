import React from 'react';
import swal from 'sweetalert';
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
import API from '../adapter/api';
import $ from 'jquery';
import CONST from '../globals/constants';
import config from '../globals/config';
import Web3 from 'web3';
import NFTFI from '../contracts/NFTFI.json'

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

class ContractList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contracts: [],
            projects: [],
            show_loading: false
        };
    }

    componentDidMount() {
        this.showLoading();

        this.getProjects();

        if (this.props.params == undefined) {
            this.getContracts();
        } else {
            this.getContracts(this.props.params.address, this.props.params.name, this.props.params.project);
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
            this.hideLoading();
            if (res.result) {
                this.setState({
                    contracts: res.data
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

    handleSearch() {
        var address = $("#search_address").val();
        var name = $("#search_name").val();
        var project = $("#search_project").val();

        document.location = "?address=" + address + "&name=" + name + "&project=" + project;
    }

    handleDelete(item) {
        var text = "";
        if (item.token_cnt != 0) {
            text = "There are " + item.token_cnt + " tokens on this project.\n";
        }

        text += "Are you sure to delete this project?";

        swal({
            title: 'Delete',
            text: text,
            buttons: true,
            dangerMode: true,
        })
        .then((isConfirm) => {
            if (isConfirm) {
                this.showLoading();

                API.delete_contract(item.id)
                .then((res) => {
                    document.location.reload();
                })
            }
        })
    }

    isConnected() {
        if (window.ethereum == undefined) {
            swal('Please install MetaMask.');
            return false;
        }

        const web3 = new Web3(Web3.givenProvider);

        var selectedAddress = web3.givenProvider.selectedAddress;
        if (selectedAddress == null) {
            swal(
                'Please connect the wallet. Do you want to connect?',
                {
                    buttons: ["Cancel", "Connect"]
                }
            )
            .then((res) => {
                if (res == true) {
                    this.handleConnect();
                }
            })
            return false;
        }

        if (Web3.utils.toChecksumAddress(selectedAddress) != config.admin_address) {
            swal('Please connect with administrator wallet.');
            return false;
        }

        if (web3.givenProvider.chainId != config.chain_id) {
            swal('Please select BSC Mainnet on MetaMask.');
            return false;
        }

        return true;
    }

    handleConnect() {
        window.ethereum.enable()
        .then((res) => {
            var connected = false;

            for (var i = 0; i < res.length; i++) {
                if (Web3.utils.toChecksumAddress(res[i]) == config.admin_address) {
                    connected = true;
                    break;
                }
            }

            if (!connected) {
                swal('Please connect with administrator wallet.');
            }
        })
        .catch((err) => {
            console.log(err);
            swal('An error occured while connecting wallet.');
        })
    }

    handleWhiteList(address, white_listed) {
        if (!this.isConnected()) return;

        const web3 = new Web3(Web3.givenProvider);
        const contract_nftfi = new web3.eth.Contract(NFTFI, config.contract_nftfi);
        contract_nftfi.methods.whitelistNFTContract(address, white_listed).send({from: config.admin_address})
        .on('error', () => swal('An error occured.'))
        .then((res) => {
            console.log(res);
            document.location.reload();
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
                                <h5><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Contracts Management
                                </span></h5>
                            </div>
                        </div>

                        <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div className="d-flex">
                                <div className="breadcrumb">
                                    <a href="/" className="breadcrumb-item"><i className="fas fa-home mr-2"></i> Home</a>
                                    <span className="breadcrumb-item active">Contracts Management</span>
                                </div>
                                <a className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                            </div>
                            <div className="header-elements d-none">
                                <div className="breadcrumb justify-content-center">
                                    <a href="/contract_add" className="breadcrumb-elements-item">
                                        <i className="fas fa-plus-square"></i>
                                        Add a contract
                                    </a>
                                </div>
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
                                                <label className="col-form-label col-lg-2">Address</label>
                                                <div className="col-lg-10">
                                                    <input id="search_address" type="text" className="form-control" defaultValue={this.props.params == undefined? "": this.props.params.address}/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Name</label>
                                                <div className="col-lg-10">
                                                    <input id="search_name" type="text" className="form-control" defaultValue={this.props.params == undefined? "": this.props.params.name}/>
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
                                        <th className="text-center">Address</th>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Project</th>
                                        <th className="text-center">Tokens</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.contracts.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{item.address}</td>
                                                    <td className="text-center">{item.name}</td>
                                                    <td className="text-center">{item.project_name == null? "Unknown": item.project_name}</td>
                                                    <td className="text-center">{item.token_cnt} Tokens</td>
                                                    <td className="text-center">{item.status == CONST.CONTRACT_STATUS.BLACK_LISTED? "Blocked": "WHITE LISTED"}</td>
                                                    <td className="text-center">
                                                        <a href={"/contract_update?id=" + item.id}><i class="fas fa-edit"></i></a>
                                                        <a href="#" onClick={() => this.handleWhiteList(item.address, false)} style={item.status == CONST.CONTRACT_STATUS.BLACK_LISTED? style_hidden: {}}><i class="fas fa-lock"></i></a>
                                                        <a href="#" onClick={() => this.handleWhiteList(item.address, true)} style={item.status == CONST.CONTRACT_STATUS.WHITE_LISTED? style_hidden: {}}><i class="fas fa-lock-open"></i></a>
                                                        <a href="#" onClick={() => this.handleDelete(item)}><i class="fas fa-trash-alt"></i></a>
                                                    </td>
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

export default ContractList;