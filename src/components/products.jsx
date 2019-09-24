import React from 'react';
import Product from './product';

const Products = ({ products }) => {
    console.log(products);
    return ( 
        <div className="row">
            {products.map(product => 
                <Product  
                    key={product.product_id}
                    product={product} />)}
        </div>
     );
}
 
export default Products;