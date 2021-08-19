import React from 'react';
import swal from 'sweetalert';
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

class ContractUpdate extends React.Component {
    constructor(props) {
        super(props);

        var valid = {
            valid_name: true,
            valid_address: true
        };

        this.state = {
            show_loading: false,
            valid: valid,
            projects: [],
            contract: null
        };
    }

    componentDidMount() {
        this.showLoading();
        this.getProjects();
        this.getContract(this.props.params.id);
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

    getContract(id) {
        API.get_contract(id)
        .then((res) => {
            this.hideLoading();

            if (res.result) {
                this.setState({
                    contract: res.data
                });

                $("#name").val(res.data.name);
                $("#address").val(res.data.address);
                $("#project").val(res.data.project_id);
            }
        })
        .catch((err) => {
            console.log(err);
            this.hideLoading();
        });
    }

    handleUpdateContract() {
        var name = $("#name").val();
        var address = $("#address").val();
        var project = $("#project").val();

        var valid = this.isValid({
            name: name,
            address: address
        });
        
        if (valid.valid_name && valid.valid_address) {
            this.showLoading();
            API.update_contract(address, name, project)
            .then((res) => {
                this.hideLoading();

                if (res.result) {
                    document.location = "/contracts"
                } else {
                    swal('Updating project failed.');
                }
            })
            .catch((err) => {
                this.hideLoading();
                swal('Updating project failed.');
                console.log(err);
            })
        } else {
            this.setState({
                valid: valid
            });
        }
    }

    isValid(params) {
        var valid = {
            valid_name: false,
            valid_address: false
        }

        if (params.name != '') valid.valid_name = true;
        if (params.address != '') valid.valid_address = true;

        return valid;
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
                                <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Contract Management
                                </span></h4>
                            </div>
                        </div>

                        <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div className="d-flex">
                                <div className="breadcrumb">
                                    <a href="/" className="breadcrumb-item"><i className="fas fa-home mr-2"></i> Home</a>
                                    <a href="/contracts" className="breadcrumb-item"><i className="fas fa-coins mr-2"></i>  Contract Management</a>
                                    <span className="breadcrumb-item active">Update contract</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content pt-0">
                        <div className="card">
                            <div className="card-header header-elements-inline">
                                <h5 className="card-title">Update the contract</h5>
                                <div className="header-elements">
                                    <div className="list-icons">
                                        {/* <a className="list-icons-item" data-action="collapse"></a>
                                        <a className="list-icons-item" data-action="remove"></a> */}
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input id="name" type="text" className={this.state.valid.valid_name? "form-control": "form-control border-danger"} placeholder=""/>
                                    <span className="form-text text-danger" style={this.state.valid.valid_name? style_hidden: {}}>Input the contract name。</span>
                                </div>

                                <div className="form-group">
                                    <label>Address:</label>
                                    <input id="address" type="text" disabled className={this.state.valid.valid_address? "form-control": "form-control border-danger"} placeholder=""/>
                                    <span className="form-text text-danger" style={this.state.valid.valid_address? style_hidden: {}}>Input the address。</span>
                                </div>

                                <div className="form-group">
                                    <label>Project:</label>
                                    <select id="project" className="form-control">
                                        {
                                            this.state.projects.map((item, index) => {
                                                if (this.state.contract != null && this.state.contract.project_id == item.id) {
                                                    return (<option value={item.id} selected>{item.name}</option>)
                                                }
                                                return (<option value={item.id}>{item.name}</option>);
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="text-left">
                                    <button type="button" className="btn btn-primary" onClick={() => this.handleUpdateContract()}>Add<i className="icon-paperplane ml-2"></i></button>
                                </div>
                            </div>
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

export default ContractUpdate;