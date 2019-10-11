import React from 'react'
import Form from './common/form';
import { updateCartItem } from '../services/shoppingCart';


class CartItemForm extends Form{
    
    constructor(props){
        super(props);
        this.state={
         quantity : this.props.match.params.quantity,
         name : this.props.match.params.name

        }
    }

    handleIncrement=()=>{
        const {quantity}=this.state;
        this.setState({quantity:parseInt(quantity)+1},
            this.props.onIncrement(parseInt(quantity))
            )
    }

    handleDecrement=()=>{
        const {quantity}=this.state;
        this.setState({quantity:parseInt(quantity)-1},
            this.props.onDecrement(parseInt(quantity))
            )
    }

    handleChageQuantity = async ()=> {
        const { quantity } = this.state;
        const item_id = this.props.match.params.id;

      let { data : updatedItem } = await updateCartItem(item_id , quantity);
      console.log("Result ---- UpdatedItem" , updatedItem) 
      this.props.onChangeQuantity(updatedItem , true)
    }

    render() { 
        const {quantity,name}=this.state;
        const { itemUpdatedStatus } = this.props;
        return ( 
            <React.Fragment>
                <div className="container-fluid">

                <div className="" style={{ backgroundColor: 'green' , color: 'white' , marginTop:10 }}><h2> Item Name {name}</h2></div>
                    
                    <div className="row">

                        <div className="card text-center">
                            
                            <div className="">
                                    <span style={{ padding:30 }} className={this.getBadgeClasses()} >{ this.formatCount() }</span>
                            </div>

                            <div className="card-body">
                                <div className="">
                                    <button
                                    onClick={this.handleIncrement}
                                    className="btn btn-success m-2"> + 
                                    </button>
                                    <button
                                    onClick={this.handleDecrement}
                                    className="btn btn-success m-2"
                                    disabled = {quantity === 0 ? 'disable' : ''}> - 
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>
      

                    <div className="row" style={{ marginTop: 10 }}><button onClick={this.handleChageQuantity} type="button" className="btn btn-success btn-block">Add New Quantity to Cart </button> </div>

                    { itemUpdatedStatus && <div className="alert alert-info" role="alert" style={{ marginTop: 10 }}>
                                Item Quantity has been Updated
                            </div>  }
                    
                </div>
            </React.Fragment>
         )
    }

        //Helper Methods
        getBadgeClasses() {
            const {quantity} = this.state;
            let classes = "badge badge-pill m-2 badge-";
            classes += quantity === 0 ? "warning" : "info";
            return classes;
        }

        formatCount(){
            const {quantity} = this.state;
            const x = <h6>Zero</h6>;
            return quantity === 0 ? x : quantity;
        }
}
 
export default CartItemForm;