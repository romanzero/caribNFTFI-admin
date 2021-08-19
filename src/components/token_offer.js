import React from 'react';
import config from '../globals/config';
import CONST from '../globals/constants'
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

class TokenOffers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offerlimit: null,
            offers: [],
            show_loading: false,
            token: null
        };
    }

    componentDidMount() {
        this.showLoading();

        this.getTokenOfferLimit(this.props.token_id);
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

    getTokenOfferLimit(token_id) {
        API.get_offer_limit(token_id)
        .then((res) => {
            if (res.result) {
                if (res.data == null) {
                    this.hideLoading();
                    return;
                }

                this.setState({
                    offerlimit: res.data
                });

                this.getTokenOffers(token_id);
            } else {
                this.hideLoading();
            }
        })
        .catch((err) => {
            this.hideLoading();
            console.log(err);
        })
    }

    getTokenOffers(token_id) {
        API.get_offers(token_id)
        .then((res) => {
            this.hideLoading();
            if (res.result) {
                this.setState({
                    offers: res.data
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
                                    <span className="breadcrumb-item active">Offer Management</span>
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
                                        <a data-toggle="collapse" className="collapsed text-white" href="#collapsible-search-items">Offer Limit</a>
                                    </h6>
                                </div>

                                <div id="collapsible-search-items" className="collapse show">
                                    <div className="card-body">
                                        <fieldset>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Max Loan Value(WBNB)</label>
                                                <div className="col-lg-10">
                                                    <input id="max_loan_value_wbnb" type="text" className="form-control" value={this.state.offerlimit == null? "0": this.state.offerlimit.max_loan_value_wbnb} disabled/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Max Loan Value(DAI)</label>
                                                <div className="col-lg-10">
                                                    <input id="max_loan_value_dai" type="text" className="form-control" value={this.state.offerlimit == null? "0": this.state.offerlimit.max_loan_value_dai} disabled/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">Max Duration</label>
                                                <div className="col-lg-10">
                                                    <input id="max_duration" type="text" className="form-control" value={this.state.offerlimit == null? "0": this.state.offerlimit.max_duration} disabled/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-form-label col-lg-2">APR</label>
                                                <div className="col-lg-10">
                                                    <input id="apr" type="text" className="form-control" value={this.state.offerlimit == null? "0": this.state.offerlimit.apr} disabled/>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header header-elements-inline">
                                <h5 className="card-title">Offer List</h5>
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
                                        <th className="text-center">Loan Value</th>
                                        <th className="text-center">Asset</th>
                                        <th className="text-center">Duration</th>
                                        <th className="text-center">APR</th>
                                        <th className="text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.offers.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{item.address}</td>
                                                    <td className="text-center">{item.loan_value}</td>
                                                    <td className="text-center">{item.asset_id}</td>
                                                    <td className="text-center">{item.duration}</td>
                                                    <td className="text-center">{item.apr}</td>
                                                    <td className="text-center">{item.status == CONST.OFFER_STATUS.PENDING? "Pending": "Accepted"}</td>
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

export default TokenOffers;