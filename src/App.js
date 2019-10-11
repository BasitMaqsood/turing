import React , { Component } from 'react';
import { Route , Redirect , Switch } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/resigisterForm';
import LoginForm from './components/loginForm';
import Home from './components/home';
import ProtectedRoute from './components/common/protectedRoutes';
import NavBar from './components/navBar';
import NotFound from './components/not-found';
import Logout from './components/logout';
import AddItem from './components/addItem';
import TotalBill from './components/totalBill';
import CartLists from './components/cartLists';
import CartItemForm from './components/cartItemForm';
import Order from './components/order';

import auth from './services/authService';
import { getCartProducts,
         generateCartID,
         addCart,
         removeAllProduct,
         removeProduct,
         gettotalAmount } from './services/shoppingCart';
import {  getshippingRegionDetails } from './services/shippingService';


class App extends  Component {

  state = { 
    cartProducts: [],
    cart_id: "",
    countProducts: 0,
    itemAdded : false,
    itemUpdatedStatus: false,
    name : "",
    quantity : 0,
    totalBillAmount:0,
    taxPaid: 1,
    taxNotPaid: 2,
    errors : {}
 }



handleAddCart = async product =>{
  const result1 = await addCart(this.state.cart_id.cart_id , product.product_id , product.description);
  
    const { data : cartProducts } = await this.getProductsListAddtoCart(this.state.cart_id.cart_id);
    const countProducts = cartProducts.length;
    const  itemAdded = true;
    this.setState({ cartProducts , countProducts , itemAdded })
    console.log("Result Cart List" , cartProducts)
    
    console.log("Add Cart Result" , result1)

    //this.props.history.replace('/');
}


    async componentDidMount() {
      const { data: cart_id} = await generateCartID();
      console.log("Cart ID" , cart_id.cart_id);
      const customer = auth.getCurrentUser();
      await this.populateItem();

      const result = await getshippingRegionDetails(2);
      console.log("Shipping Regions Details" , result);

      this.setState({ customer , cart_id });
    }

    async getProductsListAddtoCart(cart_id){
      const data = await getCartProducts(cart_id);
      return data;
    }

    async populateItem(){
      try{
          const { data: cart_id} = await generateCartID();
          this.setState({
              cart_id
          });
    
      }catch(ex){
          if(ex.response && ex.response.status === 404) 
              this.props.history.replace('/not-found');
      }
    }

    handleRemoveAllCartItems = async () =>{
      const {data :  cartProducts } = await removeAllProduct(this.state.cart_id.cart_id);
      this.setState({
        cartProducts,
        countProducts: 0
      })
      console.log(cartProducts);
    }
    
    handleItemAddedMessage = value =>{
      this.setState({
        itemAdded: value

      })
    }

    handleIncrement = (quantity) => {
      console.log('quantity',quantity)
   }
 
   handleDecrement = (quantity) => {
    console.log('quantity',quantity)
 }

 handleChageQuantity = (updatedProduct , value) =>{
   this.setState({
      cartProducts:updatedProduct,
      itemUpdatedStatus: value
   })
 }

 handleResetStatus = value =>{
   this.setState({
     itemUpdatedStatus: value
   })
 }
  
hanldeRemoveProduct = async item_id =>{
  const  { cartProducts } = this.state;
  const updatedCartProducts = cartProducts.filter(product => product.item_id !== item_id);
  const updatedCount = updatedCartProducts.length;
  const result = await removeProduct(item_id);
  this.setState({
    cartProducts: updatedCartProducts,
    countProducts: updatedCount
  })
  console.log("Result Remove Product" , result , "Updated Cart Product ---" , updatedCartProducts)
}

handleTotalPice = async () => {
  const { totalBillAmount } = this.state;
  const { data: total_amount } = await gettotalAmount(this.state.cart_id.cart_id);
  this.setState({
    totalBillAmount: total_amount.total_amount
  })
  console.log("Total Price " , totalBillAmount);
}

  render(){
    const { customer , countProducts ,  cartProducts , itemUpdatedStatus , totalBillAmount } = this.state;
    const { cart_id : { cart_id } } = this.state;
     
   

    return (
        <React.Fragment>
          <NavBar customer={customer} 
                  counterProducts={countProducts}
                  onResetStatus={this.handleResetStatus}/>
          <main className="container">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/home" render={props => <Home {...props} 
                                  onItemAddedMessage = {this.handleItemAddedMessage} /> } />
              <Route path="/cartlists" 
                render={props => <CartLists {...props}  cartProducts={cartProducts} 
                        onRemoveAllItems={this.handleRemoveAllCartItems}
                        onTotalPrice={this.handleTotalPice}
                        onRemoveProduct = {this.hanldeRemoveProduct}/>} />
              <ProtectedRoute path="/items/:id" 
                render={props => <AddItem {...props} onAddItem={this.handleAddCart} 
                                itemAdded={this.state.itemAdded} />} />
              <ProtectedRoute path="/cartItem/:id/:name/:quantity" render={ props =>  
                            <CartItemForm {...props} 
                            onIncrement={this.handleIncrement}
                            onDecrement={this.handleDecrement}
                            onChangeQuantity = {this.handleChageQuantity}
                            onItemUpdatedMessage ={this.handleItemUpdatedMessage}
                            itemUpdatedStatus={itemUpdatedStatus}/>} />
              <ProtectedRoute path="/bill-amount" render={props => <TotalBill {...props} 
                                                    billAmount = {totalBillAmount}
                                                    cartProducts={cartProducts}/>}/>
              <ProtectedRoute path="/order" render={props => <Order {...props} cart_id = {cart_id} />}/>
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </React.Fragment>);
  }    
}

export default App;
