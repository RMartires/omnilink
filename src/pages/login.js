import React, { Component } from "react";
import axios from 'axios';

var url;

class login extends Component {

    state = {

    };

    componentDidMount() {
        var code = window.location.href.split('code=')[1];
        if (code) {
            var formdata = new FormData();
            formdata.set('client_id', '640026383445330');
            formdata.set('client_secret', '3e17b845507a5eff7f2bc6d9c6cb1942');
            formdata.set('grant_type', 'authorization_code');
            formdata.set('redirect_uri', 'https://localhost:3000/login');
            var t = code.split('#_')[0];
            formdata.set('code', t);

            axios({
                url: 'https://api.instagram.com/oauth/access_token',
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formdata
            }).then(res => {
                if (res.status == '200') {
                    return res.data;
                }
            })
                .then(data => {
                    var access_token = data.access_token;
                    var user_id = data.user_id;
                    axios({
                        url: `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`,
                        method: 'GET',
                        mode: 'cors'
                    })
                        .then(res => {
                            console.log(res);
                        });

                });

        }
    }

    clickInstagram = () => {
        url = 'https://api.instagram.com/oauth/authorize' +
            '?client_id=640026383445330' +
            '&redirect_uri=https://localhost:3000/login' +
            '&scope=user_profile,user_media' +
            '&response_type=code';

        window.location.href = url;
    }

    render() {
        return (
            <div>
                <p>hello</p>
                <button onClick={this.clickInstagram.bind(this)}>instagram login</button>
            </div>
        );
    }

}

export default login;