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
       
        categories = [{ category_id : "0" , name: 'All Categories'} , ...categories];

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
        
    }

    async getFilteredProducts(category_id){
        let { data: {rows: filteredProducts}} = await getProductsByCategory(category_id);
        return filteredProducts;
    }

    async componentDidUpdate(){
        const { selectedCategory } = this.state;
        if(selectedCategory){
            let filteredProducts = await this.getFilteredProducts(selectedCategory.category_id);
            this.setState({
                filteredProducts
                });
            }
    }

    render(){
        const { products , filteredProducts } = this.state;
        let finalProducts = products;
        if(filteredProducts){
            finalProducts = filteredProducts;
        }else{
            finalProducts = products;
        }
       
       
           
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
                          products={finalProducts}/>
             
                        </div>
                    </div>

                    </div>
                
    
                </div>
           </React.Fragment>
         );

    }

}
 
export default Home;