import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CartList from './cartList';


class CartLists extends Component {
    state = {  }
    render() { 
        const { cartProducts , onRemoveAllItems , onRemoveProduct , onTotalPrice } = this.props;
        if(cartProducts.length === 0) return(
            <React.Fragment>
                <div className="container">
                    <div className="row text-info"> <h1 style={{ textAlign:'center' }}> No Item Selected Till yet !!! </h1>  </div>
                </div>
            </React.Fragment>);
        return ( 
            <React.Fragment>
                <div className="row">
                    {cartProducts.map(listItem =>
                    <CartList key={listItem.item_id}
                              listItem={listItem} 
                              onRemoveProduct={onRemoveProduct}/>)}
                </div>
                <div className="row"><button onClick={() =>onRemoveAllItems()} type="button" className="btn btn-danger btn-block">Remove All Items </button> </div>
                <div className="row" style={{ marginTop:10  }}><button onClick={() =>onTotalPrice()} type="button" className="btn btn-primary btn-block"><Link to="/bill-amount" style={{ color: 'white' }}>Total Bill </Link></button> </div>
            </React.Fragment>);
    }
}
 
export default CartLists;