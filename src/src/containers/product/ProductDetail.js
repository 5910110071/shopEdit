import React, { Component } from 'react';
import { productFetch, orderAdd, orderDelete } from "../../actions"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

class ProductDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.productFetch(this.props.match.params.id)
        }

        /* let findOrder = this.props.orders.orders.find(order => order.product.product_id == this.props.match.params.id);
         if (findOrder) {
             this.setState({
                 count: findOrder.quantity
             })
         }
         else
             this.setState({
                 count: 0
             })*/
    }

    addOrder(product) {
        this.props.orderAdd(product)

    }

    delOrder(id) {

        let findOrder = this.props.orders.orders.find(order => order.product.product_id == id);
        if (findOrder) {
            this.props.orderDelete(id)
        }




        /*if(this.state.count > 0)
         this.setState({
             count: this.state.count - 1
         })*/


    }

    getQuantity(product) {
        let findOrder = this.props.orders.orders.find(order => order.product.product_id == product.product_id);
        if (findOrder) {
            return findOrder.quantity;
        } else {
            return 0
        }
    }



    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h2>รายละเอียดสินค้า</h2>
                    {this.props.products.map(product => {
                        return (
                            <div className="card mb-3 ">
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={product.product_thumbnail} className="card-img" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h3 className="card-title">{product.product_name}</h3>
                                            <p className="card-text">รายละเอียดสินค้า : {product.product_detail}</p>
                                            <p className="card-text">จำนวนที่เหลือ : {product.product_inventory}</p>
                                            <p className="card-text">ราคา : {product.product_price} บาท</p>
                                        </div>
                                        {/* <h5 className="container text-right ">เพิ่มสินค้าลงตะกร้า</h5> */}
                                        <div className="container input-group d-flex justify-content-end ">
                                            <h5 className="text-right mr-2">จำนวน :  </h5>
                                            <span class="input-group-btn">
                                                <button type="button" class="quantity-left-minus btn btn-secondary btn-number" data-type="minus" data-field="" onClick={() => this.delOrder(product.product_id)}>
                                                    <span class="glyphicon glyphicon-minus">-</span>
                                                </button>
                                            </span>
                                            <input type="text" id="quantity" name="quantity" class="form-control input-number col-1 text-center" value={this.getQuantity(product)} min="1" max="100" />
                                            <span class="input-group-btn">
                                                <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field="" onClick={() => this.addOrder(product)}>
                                                    <span class="glyphicon glyphicon-plus">+</span>
                                                </button>


                                            </span>

                                        </div>
                                        {this.getQuantity(product)>0 && <div className="btn col-12 d-flex flex-row-reverse bd-highlight">
                                            <div className="d-flex flex-column bd-highlight mb-3" onClick = {()=>this.props.history.push('/order/')}>
                                                <img src="https://cdn1.iconfinder.com/data/icons/ecommerce-1-9/48/2-512.png" class="ml-5 mt-2" Style="width: 70px;" alt="..." />
                                                <h5 className="">กดดูสินค้าในตะกร้า</h5>
                                            </div>
                                        </div>}


                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps({ products, orders }) {
    console.log("products", products)
    return { products, orders }
}

export default withRouter(connect(mapStateToProps, { productFetch, orderAdd, orderDelete })(ProductDetail))