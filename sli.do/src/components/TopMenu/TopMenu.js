import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showMessage } from '../../commons/helpers';


class TopMenu extends Component {
    constructor(props) {
        super(props);
    }
    
    getUserInfo() {
        if(!this.props.auth.isAuthenticated() || !this.props.app) {
            return null;
        }

        let userInfo = this.props.app.userInfo;
        let session = this.props.auth.getSession();
        if (!session) {
            this.props.gotoPage('/');
        }

        if (!userInfo) {
            this.props.loadUserInfo(session.accessToken);
        }
        return userInfo;
    }

    render() {
        let user = this.getUserInfo();
        user = user ? user : {};
        let avatar = <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="avatar icon-size24">
            <title>user-circle-o</title>
            <path d="M12 0c-6.609 0-12 5.391-12 12s5.391 12 12 12c6.609 0 12-5.391 12-12s-5.391-12-12-12zM12 0.984c6.047 0 11.016 4.969 11.016 11.016 0 2.672-0.984 5.109-2.578 7.031-1.078-0.469-3.656-1.359-5.25-1.828-0.141-0.047-0.188-0.047-0.188-0.609 0-0.469 0.188-0.938 0.375-1.359 0.234-0.422 0.469-1.172 0.563-1.828 0.234-0.281 0.563-0.844 0.797-1.875 0.188-0.938 0.094-1.313-0.047-1.594 0-0.047-0.047-0.094-0.047-0.141-0.047-0.188 0.047-1.359 0.188-2.203 0.094-0.609-0.047-1.922-0.844-3-0.563-0.656-1.547-1.5-3.375-1.594h-1.031c-1.828 0.094-2.813 0.938-3.328 1.594-0.844 1.078-0.984 2.391-0.891 3 0.188 0.844 0.234 2.016 0.188 2.203 0 0.047-0.047 0.094-0.047 0.141-0.094 0.281-0.188 0.656 0 1.594 0.188 1.031 0.516 1.594 0.75 1.875 0.094 0.656 0.328 1.406 0.563 1.828 0.141 0.328 0.188 0.75 0.188 1.359 0 0.563 0 0.563-0.141 0.609-1.641 0.516-4.266 1.453-5.25 1.875-1.641-1.922-2.625-4.359-2.625-7.078 0-6.047 4.969-11.016 11.016-11.016zM4.313 19.875c1.125-0.469 3.375-1.266 4.875-1.688 0.844-0.281 0.844-1.031 0.844-1.594 0-0.469-0.047-1.172-0.328-1.781-0.188-0.422-0.422-1.125-0.469-1.688 0-0.094-0.047-0.234-0.141-0.328-0.141-0.094-0.469-0.563-0.609-1.5-0.188-0.703-0.094-0.844-0.047-1.031 0.047-0.047 0.047-0.141 0.094-0.188 0.094-0.422-0.047-1.875-0.188-2.672-0.047-0.375 0-1.359 0.656-2.203 0.609-0.703 1.5-1.125 2.625-1.219h0.938c1.172 0.094 2.016 0.516 2.625 1.219 0.656 0.844 0.703 1.828 0.656 2.203-0.141 0.797-0.281 2.25-0.141 2.672 0 0.047 0.047 0.141 0.047 0.188 0.047 0.188 0.141 0.328 0 1.031-0.188 0.938-0.469 1.406-0.609 1.5s-0.188 0.234-0.188 0.328c-0.047 0.563-0.281 1.266-0.469 1.688-0.234 0.469-0.469 1.078-0.469 1.781 0 0.563 0 1.266 0.844 1.547 1.453 0.422 3.703 1.219 4.875 1.688-1.969 1.969-4.734 3.188-7.734 3.188s-5.672-1.219-7.688-3.141z"></path>
        </svg>;
        if(user.picture) {
            avatar = <img src={user.picture} alt={user.name} className="avatar icon-size24"/>
        }
        return (
            <nav className="navbar navbar-default navbar-static-top top-menu">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="javascript:void(0)">Event</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <div className="profile-name">
                                        <span className="name">{user.name}</span>
                                        <span className="email">{user.email}</span>
                                    </div>
                                    {avatar}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="#">Action</a>
                                    </li>
                                    <li>
                                        <a href="#">Another action</a>
                                    </li>
                                    <li>
                                        <a href="#">Something else here</a>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li className="dropdown-header">Nav header</li>
                                    <li>
                                        <a href="#">Separated link</a>
                                    </li>
                                    <li>
                                        <a href="#">One more separated link</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

TopMenu.propTypes = {
    title: PropTypes.string
}
export default TopMenu;