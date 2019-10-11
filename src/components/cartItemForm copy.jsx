import React from 'react'
import Joi from 'joi-browser';
import Form from './common/form';



class CartItemForm extends Form{
    

//     // Transformation returning a new Object
//     mapToViewModel(movie){
//         return {
//             _id: movie._id,
//             title: movie.title,
//             genreId: movie.genre._id,
//             numberInStock: movie.numberInStock,
//             dailyRentalRate: movie.dailyRentalRate
//         };
//     }

//     doSubmit = async () =>{
//         // Calling a Server
//         await saveMovie(this.state.data);
//         console.log('Submitted ...');
//         this.props.history.replace('/movies');

//    }

    

    render() { 
        const item_id = this.props.match.params.id;
        const name = this.props.match.params.name;
        const quantity = this.props.match.params.quantity;

        return ( 
            <React.Fragment>
                <div className="container-fluid">

                <div className="" style={{ backgroundColor: 'green' , color: 'white' , marginTop:10 }}><h2> Item Name {name}</h2></div>
                    
                    <div className="row">

                        <div className="card text-center">
                            
                            <div className="">
                                    <span style={{ width:70 , height:70 , padding:30 }} className={this.getBadgeClasses()} >{ this.formatCount() }</span>
                            </div>

                            <div className="card-body">
                                <div className="">
                                    <button
                                    onClick={() => this.handleIncrement(quantity)}
                                    className="btn btn-success m-2"> + 
                                    </button>
                                    <button
                                    onClick={() => this.handleDecrement(quantity)}
                                    className="btn btn-success m-2"
                                    disabled = {quantity === 0 ? 'disable' : ''}> - 
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>
      

                    <div className="row"><button onClick={() => this.handleChageQuantity()} type="button" className="btn btn-success btn-block">Add New Quantity to Cart </button> </div>
                </div>
            </React.Fragment>
         )
    }

        //Helper Methods
        getBadgeClasses() {
            let classes = "badge badge-pill m-2 badge-";
            classes += this.props.match.params.quantity === 0 ? "warning" : "info";
            return classes;
        }

        formatCount(){
            const quantity = this.props.match.params.quantity
            const x = <h6>Zero</h6>;
            return quantity === 0 ? x : quantity;
        }
}
 
export default CartItemForm;