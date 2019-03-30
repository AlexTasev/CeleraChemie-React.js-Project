import React, { Component } from "react";

import ProductSelector from './ProductSelector';
import './Products.css'

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // category, language
        };
    }

    render(){
        return (
            <section>
                <ProductSelector />
            </section>
            
        )
    }

    
}

export default Products;