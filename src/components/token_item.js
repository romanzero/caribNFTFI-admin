import React from 'react';
import CONST from '../globals/constants';
import Web3 from 'web3';
import config from '../globals/config';
import ERC721 from '../contracts/ERC721.json';
import axios from 'axios';
import FileType from 'file-type/browser';

class TokenItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            metadata: null,
            material_type: CONST.TOKEN_MATERIAL_TYPE.NONE
        };
    }

    componentDidMount() {
        this.getTokenURI();
    }

    async setMetaData(metadata) {
        const response = await fetch(metadata.image);
        const fileType = await FileType.fromStream(response.body);

        if (fileType.mime.includes("image")) {
            this.setState({
                metadata: metadata,
                material_type: CONST.TOKEN_MATERIAL_TYPE.IMAGE
            });
        } else if (fileType.mime.includes("video")) {
            this.setState({
                metadata: metadata,
                material_type: CONST.TOKEN_MATERIAL_TYPE.VIDEO
            });
        }
    }

    getTokenURI() {
        const web3 = new Web3(new Web3.providers.HttpProvider(config.provider_url));

        var TOKEN = new web3.eth.Contract(ERC721, this.props.item.contract_id);
        TOKEN.methods.tokenURI(this.props.item.token_id).call()
        .then((uri) => {console.log(uri);
            try {
                var metadata = JSON.parse(uri);
                this.setMetaData(metadata);
            } catch (err) {
                console.log(err);

                axios.get(uri)
                .then((res) => {console.log(res);
                    try {
                        var metadata = JSON.parse(res);
                        this.setMetaData(metadata);
                    } catch (err) {
                        console.log(err);
                    }
                });
            }
        })
    }

    render() {
        var token_metadata_control = <img className="token_iframe" src={this.state.metadata == null? "": this.state.metadata.image} style={{border: 'none'}}/>;
        if (this.state.material_type == CONST.TOKEN_MATERIAL_TYPE.VIDEO) {
            <video className="token_iframe" src={this.state.metadata == null? "": this.state.metadata.image} style={{border: 'none'}}/>
        }

        return (
            <tr>
                <td className="text-center">
                    {token_metadata_control}
                </td>
                <td className="text-center">{this.props.item.contract_id}</td>
                <td className="text-center">#{this.props.item.token_id}</td>
                <td className="text-center">{this.props.item.project_name == null? "Unknown": this.props.item.project_name}</td>
                <td className="text-center">{this.props.item.contract_name}</td>
                <td className="text-center"><a href={"/token_offers?token_id=" + this.props.item.id}><i class="fas fa-external-link-alt"></i></a></td>
            </tr>
        );
    }
}

export default TokenItem;