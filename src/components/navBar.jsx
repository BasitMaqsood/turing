import React , { Component } from 'react';
import { NavLink , Link } from 'react-router-dom';

class NavBar extends Component {

        
    
    render() { 
        const { customer , counterProducts } = this.props;
        return ( 
                <React.Fragment>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link className="navbar-brand" to="/">Shopify </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <NavLink className="nav-link" to="/">Home </NavLink>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="#">Action</Link>
                                    <Link className="dropdown-item" to="#">Another action</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="#">Something else here</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link disabled" to="#">Disabled</Link>
                                </li>
                                
                                </ul>

                                <ul className="navbar-nav mr-auto">
                                    {!customer &&(
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/register">Sign Up</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">Login</Link>
                                            </li>

                                        </React.Fragment>
                                        )
                                    }

                                    {customer &&(
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/">{customer.name}</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/logout">Logout</Link>
                                            </li>

                                            <div className="row float-right" style={{ paddingLeft: 20 }}>
                                                <Link to="/cartlists">
                                                    <button onClick={() => this.props.onResetStatus(false)} type="button" className="btn btn-primary">
                                                    Cart Items <span className="badge badge-light">{counterProducts}</span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </React.Fragment>)
                                    }

                                </ul>
                                {/* <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form> */}
                            </div>
                    </nav>

                </React.Fragment>

         );
    }
}
 
export default NavBar;
