import React from 'react';
import Product from './product';

const Products = ({ products , onAddItem , onItemAddedMessage }) => {
    return ( 
        <div className="row">
            {products.map(product => 
                <Product  
                    key={product.product_id}
                    product={product} 
                    onItemAddedMessage={onItemAddedMessage}
                    onAddItem={onAddItem}/>)}
        </div>
     );
}
 
export default Products;