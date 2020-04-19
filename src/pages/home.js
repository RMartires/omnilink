import React, { Component } from 'react';
import UserProfile from './components/UserProfile';
import Link from './components/Links';
import Grid from '@material-ui/core/Grid';



class Home extends Component {

    state = {
        token: undefined
    };

    componentDidMount() {
    }

    render() {
        const userprofile = () => {
            if (this.props.token) {
                return <UserProfile
                    user_name={this.props.token.username}
                    profile_picture={this.props.token.profile_picture}
                    color={this.props.color}
                />
            } else {
                return <UserProfile color={this.props.color} />
            }
        };

        const links = () => {
            var x = [1, 2, 3, 4, 5, 6];
            return x.map(x => {
                return <Link color={this.props.color} id={x} />
            });
        };

        return (
            <div style={{ backgroundColor: this.props.color.accent1 }}>
                {userprofile()}
                <Grid
                    container
                    direction='column'
                    justify='space-around'
                    spacing='3'
                    alignItems='center'
                >
                    {links()}
                </Grid>
            </div>
        );
    }
}

export default Home;