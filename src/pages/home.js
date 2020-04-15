import React, { Component } from 'react';
import UserProfile from './components/UserProfile';
import Link from './components/Links';


class home extends Component {

    state = {

    };

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <UserProfile
                    user_name='rebel_just_for_kicks98'
                />
                <Link />
            </div>
        );
    }
}

export default home;