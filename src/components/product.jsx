import React, { Component } from 'react';

class Product extends Component {
    state = {  }
    
    render() { 
        const { product } = this.props;
        return ( 
            <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100">
                        <a href="#"><img className="card-img-top" src={"https://cdn11.bigcommerce.com/s-pkla4xn3/images/stencil/1280x1280/products/7680/70046/Plyesxale-Men-Suit-2018-Wedding-Suits-For-Men-Shawl-Collar-3-Pieces-Slim-Fit-Burgundy-Suit__18578.1527763490.jpg?c=2&imbypass=on"} alt="Image not Loaded" /></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    <a href="#">{ product.name }</a>
                                </h4>
                                <h5>{product.price}</h5>
                                <p className="card-text">{product.discription}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                            </div>
                </div> 

            </div>        
         );
    }
}
 
export default Product;