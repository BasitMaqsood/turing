import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../CartLists.css';


class CartList extends Component {

    state = {
        cart_id: 0,
        name: "",
        item_id: 0,
        quantity: 0,
        errors : {} 
    };


    async populateItem(){
        try{
            const item_id = this.props.match.params.id;
            const name = this.props.match.params.name;
            const quantity = this.props.match.params.quantity;
            this.setState({
                item_id, 
                name,
                quantity
            })
        }catch(ex){
            if(ex.response && ex.response.status === 404) 
                this.props.history.replace('/not-found');
        }
    }

    async componentDidMount(){

//        await this.populateItem();

    }





    render() { 
        const { listItem , onRemoveProduct } = this.props;
        console.log("Cart Products in Cart List --------" , listItem);

        return ( 
            <React.Fragment>    
                        <div className="container CartLists">
                        <div className="row">
                            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                            <div className="table-responsive">
                                <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="p-2 px-3 text-uppercase">Product</div>
                                    </th>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="py-2 text-uppercase">Price</div>
                                    </th>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="py-2 text-uppercase">Quantity</div>
                                    </th>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="py-2 text-uppercase">Remove</div>
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row" className="border-0">
                                        <div className="p-2">
                                        <img src={"https://backendapi.turing.com/images/products/" + listItem.image} alt="" width="70" className="img-fluid rounded shadow-sm" />
                                        <div className="ml-3 d-inline-block align-middle">
                                            <h5 className="mb-0"> <Link to={`/cartItem/${listItem.item_id}/${listItem.name}/${listItem.quantity}`} className="text-dark d-inline-block align-middle">{listItem.name}</Link></h5><span className="text-muted font-weight-normal font-italic d-block">Category: Watches</span>
                                        </div>
                                        </div>
                                    </th>
                                    <td className="border-0 align-middle"><strong>$ {listItem.price}</strong></td>
                                    <td className="border-0 align-middle"><strong>{listItem.quantity}</strong></td>
                                    <td className="border-0 align-middle"><button to="#" className="text-dark btn" onClick={() =>onRemoveProduct(listItem.item_id)}><i className="fa fa-trash"></i></button></td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>

                            </div>
                        </div>

                        </div>
            </React.Fragment>
         );
    }
}
 
export default CartList;