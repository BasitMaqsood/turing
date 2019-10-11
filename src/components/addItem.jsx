import React  from 'react';
import { Link } from 'react-router-dom';
import Form from './common/form';

import { getProduct } from '../services/productServices';



class AddItem extends Form {
    state = { 
        product: "",
     }

     async populateItem(){
        try{
            const product_id = this.props.match.params.id;
      
            const {data : product} = await getProduct(product_id);
            console.log(product);
            this.setState({
                product
            });
      
        }catch(ex){
            if(ex.response && ex.response.status === 404) 
                this.props.history.replace('/not-found');
        }
      }

      async componentDidMount() {
          await this.populateItem();
      }
    

        doSubmit = async () =>{
            // Calling a Server
            // await saveMovie(this.state.data);
            // console.log('Submitted ...');
            this.props.history.replace('/');
    
       }


    render() { 
        const { product } = this.state;
        const { itemAdded } = this.props;
        return ( 
            
            <div className="container">
            <div className="card">
                <div className="container-fliud">     
                    <div className="wrapper row">
                        <div className="preview col-md-6">
                            
                            <div className="preview-pic tab-content">
                              <div className="tab-pane active" id="pic-1"><img src={"https://backendapi.turing.com/images/products/" + product.image_2} alt="Error in Loading"/></div>
                              <div className="tab-pane" id="pic-2"><img src={"https://backendapi.turing.com/images/products/" + product.image} alt="Error in Loading"/></div>
                              <div className="tab-pane" id="pic-3"><img src={"https://backendapi.turing.com/images/products/" + product.image_2} alt="Error in Loading"/></div>
                            </div>
                            <ul className="preview-thumbnail nav nav-tabs">
                              <li className="active"><Link to="/" data-target="#pic-1" data-toggle="tab"><img src={"https://backendapi.turing.com/images/products/" + product.thumbnail} alt="Error in Loading" /></Link></li>
                              <li><Link to="/" data-target="#pic-2" data-toggle="tab"><img src={"https://backendapi.turing.com/images/products/" + product.thumbnail} alt="Error in Loading"/></Link></li>
                              <li><Link to="/" data-target="#pic-3" data-toggle="tab"><img src={"https://backendapi.turing.com/images/products/" + product.image} alt="Error in Loading"/></Link></li>
                            </ul>

                        </div>

                        <div className="details col-md-6">
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <h4 className="price">current price: <span>$ {product.price}</span></h4>
                            <p className="vote"><strong>{product.discounted_price}</strong> Discount on this product! <strong></strong></p>
                            <h5 className="sizes">sizes:
                                <span className="size" data-toggle="tooltip" title="small">s</span>
                                <span className="size" data-toggle="tooltip" title="medium">m</span>
                                <span className="size" data-toggle="tooltip" title="large">l</span>
                                <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                            </h5>
                            <h5 className="colors">colors:
                                <span className="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                                <span className="color green"></span>
                                <span className="color blue"></span>
                            </h5>
                            <div className="action" style={{ paddingBottom: 10 }}>
                                <button className="add-to-cart btn btn-default" type="button" onClick={() => this.props.onAddItem(product)}>add to cart</button>
                            </div>
                            { itemAdded &&  <div className="alert alert-info" role="alert">
                                Item has been Added to the Cart
                            </div>  }
                        </div>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default AddItem;