import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {
    state = {  }
    
    render() { 
        const { product , onItemAddedMessage } = this.props;
        return ( 
            <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100">
                        <Link  to="/"><img className="card-img-top" src={"https://backendapi.turing.com/images/products/" + product.thumbnail} alt="Error not Loaded" /></Link>
                            <div className="card-body">

                                <h4 className="card-title">
                                    <Link to="/" style={{ textDecoration: 'none' }}>{ product.name }</Link>
                                </h4>
                                <h6 className="card-price text-center"> $ {product.price}<span className="period"></span></h6>
                                <p className="card-text">{product.discription}</p>
                            </div>
                            <div className="card-footer">
                                <Link to={`/items/${product.product_id}`}>
                                    <button type="button" onClick={() => onItemAddedMessage(false)} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Add to Cart
                                    </button>
                                </Link>

                            </div>
                </div> 

            </div>        
         );
    }
}
 
export default Product;