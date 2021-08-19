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

class ProjectAdd extends React.Component {
    constructor(props) {
        super(props);

        var valid = {
            valid_name: true,
            valid_link_prefix: true,
            valid_thumbnail: true
        };

        this.state = {
            show_loading: false,
            valid: valid
        };
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

    onChangeThumbnail() {
        this.setState({
            thumbnail: $("#thumbnail").prop("files")[0].name
        });
    }

    handleAddProject() {
        var name = $("#name").val();
        var link_prefix = $("#link_prefix").val();
        var thumbnail = $("#thumbnail").prop("files");

        var valid = this.isValid({
            name: name,
            link_prefix: link_prefix,
            thumbnail: thumbnail
        });
        
        if (valid.valid_name && valid.valid_link_prefix && valid.valid_thumbnail) {
            this.showLoading();
            API.add_project(name, link_prefix, thumbnail[0])
            .then((res) => {
                this.hideLoading();

                if (res.result) {
                    document.location = "/projects"
                } else {
                    swal('Adding project failed.');
                }
            })
            .catch((err) => {
                this.hideLoading();
                swal('Adding project failed.');
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
            valid_link_prefix: false,
            valid_thumbnail: false
        }

        if (params.name != '') valid.valid_name = true;
        if (params.link_prefix != '') valid.valid_link_prefix = true;
        if (params.thumbnail.length > 0) valid.valid_thumbnail = true;

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
                                <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Project Management
                                </span></h4>
                            </div>
                        </div>

                        <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div className="d-flex">
                                <div className="breadcrumb">
                                    <a href="/" className="breadcrumb-item"><i className="fas fa-home mr-2"></i> Home</a>
                                    <a href="/projects" className="breadcrumb-item"><i className="fas fa-coins mr-2"></i>  Project Management</a>
                                    <span className="breadcrumb-item active">Add a project</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content pt-0">
                        <div className="card">
                            <div className="card-header header-elements-inline">
                                <h5 className="card-title">Add a project</h5>
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
                                    <span className="form-text text-danger" style={this.state.valid.valid_name? style_hidden: {}}>Input the project name。</span>
                                </div>

                                <div className="form-group">
                                    <label>Link Prefix:</label>
                                    <input id="link_prefix" type="text" className={this.state.valid.valid_link_prefix? "form-control": "form-control border-danger"} placeholder=""/>
                                    <span className="form-text text-danger" style={this.state.valid.valid_link_prefix? style_hidden: {}}>Input the link prefix。</span>
                                </div>

                                <div className="form-group">
                                    <label>Thumbnail:</label>
                                    <div className="uniform-uploader"><input id="thumbnail" type="file" className="form-input-styled" data-fouc="" onChange={() => this.onChangeThumbnail()}/><span className={this.state.valid.valid_thumbnail? "filename": "filename border-danger"} style={{userSelect: 'none'}}>{this.state.thumbnail}</span><span className="action btn bg-pink-400" style={{userSelect: 'none'}}>Select thumbnail
                                    </span></div>
                                    <span className="form-text text-muted">File Format:gif, png, jpg。 Max file size 2Mb</span>
                                </div>

                                <div className="text-left">
                                    <button type="button" className="btn btn-primary" onClick={() => this.handleAddProject()}>Add<i className="icon-paperplane ml-2"></i></button>
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

export default ProjectAdd;