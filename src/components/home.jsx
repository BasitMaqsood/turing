import React from 'react'
import Form from './common/form';
import ListGroup from './common/listGroup';
import Products from './products';
import { getCategories } from '../services/categoriesService';
import { getProducts } from '../services/productServices';
import { getProductsByCategory } from '../services/productServices';



class Home extends Form {
    state = {
        categories:[],
        filteredProducts: [],
        products:[],
        
        selectedCategory: null
    }

    async componentDidMount() {

        let { data: { rows: categories } } = await getCategories();
       
        categories = [{ category_id : 0 , name: 'All Categories'} , ...categories];

        let { data: { rows: products } } = await getProducts();


        this.setState({
            categories,
            products
         });

    }

    handleCategory = category =>{
        this.setState({
            selectedCategory: category
        })
        this.getFilteredProducts(category.category_id)
        
    }

    handleAddItem = product =>{
        console.log(product);
    }

    async getFilteredProducts(category_id){
        let data;
        if(category_id===0)
                 data = await getProducts();
        else 
            data = await getProductsByCategory(category_id);
        const { data: {rows: products}}=data;
        this.setState({products}) ;
    }


    render(){
        const { products } = this.state;
        const { onItemAddedMessage } = this.props;
         
        return ( 
           <React.Fragment>
        
                <div className="container">
    
                    <div className="row">
    
                    <div className="col-lg-3">
    
                        <h3 className="my-4">Categories</h3>
                            <div className="list-group">
                                <ListGroup
                                    items={this.state.categories}
                                    selectedItem={this.state.selectedCategory}
                                    onItemSelect={this.handleCategory}
                                    valueProperty="category_id" />
                            </div>
    
                    </div>
    
                    <div className="col-lg-9">
    
                        <div className="row">
                        <Products
                          onItemAddedMessage={onItemAddedMessage} 
                          products={products}
                          onAddItem={this.handleAddItem}/>
             
                        </div>
                    </div>

                    </div>

                
    
                </div>
           </React.Fragment>
         );

    }

}
 
export default Home;