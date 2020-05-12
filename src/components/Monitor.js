import React, { Component } from "react";
import { withRouter } from "react-router-dom"

class Monitor extends Component {

    constructor(props) {
        super(props);
    }

    selectProduct(product) {
        this.props.history.push('product/' + product.product_id)
    }

    showProducts() {
        console.log("this.props.products", this.props.products);
        return (
            this.props.products &&
            this.props.products.map(product => (
                <div className="col-md-2">
                    <img className="img-fluid img-thumbnail" src={product.product_thumbnail} />
                    <h5 className="mt-2">{product.product_name}</h5>
                    <p className="title text-right" >{product.product_price} THB</p>
                    <button className="btn btn-block btn-danger btn-sm mt-2" onClick={() => this.selectProduct(product)}>เลือก</button>
                    <hr />
                </div>
            ))
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <h2 className="title">รายการสินค้า</h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            {this.showProducts()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Monitor); 