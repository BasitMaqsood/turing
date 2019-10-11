import React from 'react';
import { Link } from 'react-router-dom';

const TotalBill = ({ billAmount , cartProducts }) => {
    return ( 
        <React.Fragment>
            <div className="row" style={{ alignContent: 'center' }}>
                <div className="columns">
                    <ul className="price">
                        <li className="header">Total Bill</li>
                        <li>Number of Products :{cartProducts.length}</li>
                        <li className="header">Products Names</li>
                        <li className="grey">$ { billAmount } </li>
                        {cartProducts.map(product => <li key={product.item_id}>{product.name}</li>)}
                        <li className="grey"><Link to="/order" className="button" style={{ textDecoration: 'none' }}> Order It </Link></li>
                    </ul>
                </div>
            </div>
            
        </React.Fragment>
     );
}
 
export default TotalBill;