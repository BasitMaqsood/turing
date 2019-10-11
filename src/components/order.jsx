import React from 'react'
import Joi from 'joi-browser';

import Form from '../components/common/form';

import { getShippingRegions , getshippingRegionDetails } from '../services/shippingService';
import { getTaxesType } from '../services/taxService';
import { createOrder } from '../services/orderService';

class Order extends Form {
    state = { 
        data:{
            cart_id: this.props.cart_id,
            shipping_id : 0,
            shipping_region_id: 0,
            tax_id : 0
        },
        shippingRegions:[],
        taxTypes:[],
        shippingDetails:[],
        shippingTime : [],
        errors:{}
     }

     schema = {
         cart_id: Joi.string()
                      .required(),
        shipping_id: Joi.number()
                        .required(),
        tax_id: Joi.number()
                    .required(),
        shipping_region_id: Joi.number()
                                .required()
     }

     async populateShippingRegion(){
            
         const { data : shippingRegions } = await getShippingRegions();
         this.setState({
            shippingRegions 
         })
         console.log("Shipping Areas" , shippingRegions);
     }

     async populateTaxType(){
         const { data } = await getTaxesType();
         const taxTypes = [ { tax_id:0, tax_type:'Please Select' } , ...data]
         this.setState({
             taxTypes
         })
     }

     async populateShippingDetails(id){
         const { data : shippingDetails } = await getshippingRegionDetails(id);
         console.log("Shipping Details Data " , shippingDetails)
         this.setState({
            shippingDetails
         })
     }

     async componentDidMount() {
         await this.populateShippingRegion();
         await this.populateTaxType();
         const token = localStorage.getItem('token');
         console.log('Tokeeen ' , token);
     }


//    handleCreateOrder = async (cart_id , shipping_id, tax_id) =>{
//        this.
//         const result = await createOrder(cart_id, shipping_id, tax_id);

//    }

   handleShipppingOptions = async() =>{
       console.log("Submitted Data ***" , this.state.data);
       const { shipping_region_id } = this.state.data;
       const { data } = await getshippingRegionDetails(shipping_region_id);
       const shippingTime = [ { shipping_id: 0, shipping_type: 'Please Select' } , ...data ]
       console.log("Shipping Region Details, " , shippingTime)
       this.setState({
           shippingTime
       })
   }

    doSubmit = async() =>{

        const { cart_id, shipping_id, tax_id } = this.state.data;
        const result = await createOrder(cart_id, shipping_id, tax_id);
        console.log("Order Placed" , result)

   }



    render() { 
        const {  shippingRegions , taxTypes , shippingTime, shipping_id , tax_id , cart_id } = this.state;
        console.log("In Order Cart ID" , cart_id , "Shipping ID" , shipping_id, "tax ID" , tax_id)
        return ( 
            <React.Fragment>
                <div className="container">
                    <h1>Order</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderSelect('shipping_region_id' , 'Shipping Region' , 'shipping_region', shippingRegions)}
                        {this.renderSelect('tax_id' , 'Tax Option' , 'tax_type' , taxTypes )}
                        <button type="button" onClick={this.handleShipppingOptions} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Press If you're sure to continue 
                        </button>
                        {this.renderSelect('shipping_id', 'Shipping Timing' , 'shipping_type', shippingTime)}
                        {this.renderButton('Order IT')}
                    </form>

                </div>
            </React.Fragment>
         );
    }
}
 
export default Order;