import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chain_id: null,
            selected_address: null,
            balance: 0
        }
    }

    render() {
        return (
            <div className="navbar navbar-expand-md navbar-light">
                <div className="navbar-header navbar-dark d-none d-md-flex align-items-md-center">
                    <div className="navbar-brand navbar-brand-md">
                        <a href="index.html" className="d-inline-block">
                            <h3>NFTFI Admin</h3>
                            {/* <img src="assets/images/logo.png" style={{width: "156px", height: '46px'}} alt=""/> */}
                        </a>
                    </div>
                    <div className="navbar-brand navbar-brand-xs">
                        <a href="index.html" className="d-inline-block">
                            <h3>NFTFI Admin</h3>
                            {/* <img src="assets/images/logo-icon.png" style={{width: "48", height: '48'}} alt=""/> */}
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-1 d-md-none">
                    <div className="navbar-brand mr-auto">
                        <a href="index.html" className="d-inline-block">
                            <h3>NFTFI Admin</h3>
                            {/* <img src="assets/images/logo-color.png" style={{width: "156px", height: '46px'}} alt=""/> */}
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                        <i className="icon-tree5"></i>
                    </button>
                    <button className="navbar-toggler sidebar-mobile-main-toggle" type="button">
                        <i className="icon-paragraph-justify3"></i>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbar-mobile">
                </div>
            </div>
        );
    }
}

export default Header;