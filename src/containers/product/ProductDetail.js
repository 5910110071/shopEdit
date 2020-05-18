import React, { Component } from 'react';
import { productFetch, orderAdd, orderDelete, orderConfirm } from "../../actions"
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
    }

    addOrder(product) {
        if (this.getQuantity(product) < product.product_inventory)
            this.props.orderAdd(product)

    }


    delOrder(id) {

        let findOrder = this.props.orderBuffer.orders.find(order => order.product.product_id == id);
        if (findOrder) {
            this.props.orderDelete(id)
        }
    }

    getQuantity(product) {
        //console.log("this.props.orders.orders", this.props.orderBuffer.orders)
        let findOrder = this.props.orderBuffer.orders.find(order => order.product.product_id == product.product_id);
        if (findOrder) {
            return findOrder.quantity;
        } else {
            return 0
        }
    }

    checkQuantity(product) {
        console.log("checkQuantity(product)", product[0])
        let findOrder = this.props.orderBuffer.orders.find(order => order.product.product_id == product[0].product_id);
        console.log("findOrder", findOrder)

        if (findOrder) {
            console.log("here")
            if (findOrder.quantity == 0) {

            }
        }
        else {
            console.log("here2")
            this.addOrder(product[0])
        }
    }


    render() {
        // console.log("this.props.products", this.props.products.id)
        // console.log("this.props.orderBuffer", this.props.orderBuffer)

        if (this.props.products.length == 1) {
            this.checkQuantity(this.props.products)
        }

        return (
            <div>
                <Header menu={this.props.match.path} />
                <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>
                    <h2 className="text-center pt-3 mb-3">รายละเอียดสินค้า</h2>
                    {this.props.products.map(product => {
                        return (
                            <div className="card mb-3 ">
                                <div className="row no-gutters">
                                    <div className="col-md-5">
                                        <img src={product.product_thumbnail} className="card-img" alt="..." />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body">
                                            <h3 className="card-title">{product.product_name}</h3>
                                            <p className="card-text">รายละเอียดสินค้า : {product.product_detail}</p>
                                            <p className="card-text">จำนวนที่เหลือ : {product.product_inventory}</p>
                                            <p className="card-text">ราคา : {product.product_price} บาท</p>
                                        </div>
                                        {/* <h5 className="container text-right ">เพิ่มสินค้าลงตะกร้า</h5> */}


                                        <div className="container input-group d-flex justify-content-end   ">
                                            <h5 className="text-right mr-2">จำนวน :  </h5>
                                            <span class="input-group-btn ">
                                                <button type="button" class="quantity-left-minus btn btn-secondary btn-number" data-type="minus" data-field="" onClick={() => this.delOrder(product.product_id)}>
                                                    <span class="glyphicon glyphicon-minus">-</span>
                                                </button>
                                            </span>
                                            <input type="text" id="quantity" name="quantity" class="form-control input-number col-1 text-center" value={this.getQuantity(product)} min="1" max="10" />
                                            <span class="input-group-btn">
                                                <button type="button" class="quantity-right-plus btn btn-secondary btn-number mr-2" data-type="plus" data-field="" onClick={() => this.addOrder(product)}>
                                                    <span class="glyphicon glyphicon-plus">+</span>
                                                </button>
                                            </span>
                                           
                                        </div>
                                        

                                        <div className=" mr-4 mt-3 d-flex justify-content-end">
                                            <button className="btn btn-danger" onClick={() => this.props.orderConfirm(product)}>เพิ่มลงตะกร้า </button>
                                        </div>
                                        
                                        <div className=" btn d-flex justify-content-end bd-highlight mb-3 mr-5" onClick={() => this.props.history.push('/order/')}>
                                            <img src="https://cdn1.iconfinder.com/data/icons/ecommerce-1-9/48/2-512.png" class="mt-2" Style="width: 50px;" alt="..." />
                                        </div>

                                        {/* {this.getQuantity(product) > 0 && <div className="btn col-12 d-flex flex-row-reverse bd-highlight">
                                            <div className="d-flex flex-column bd-highlight mb-3" onClick={() => this.props.history.push('/order/')}>
                                                <img src="https://cdn1.iconfinder.com/data/icons/ecommerce-1-9/48/2-512.png" class="ml-5 mt-2" Style="width: 70px;" alt="..." />
                                                <h5 className="">กดดูสินค้าในตะกร้า</h5>
                                            </div>
                                        </div>} */}

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Footer />
            </div >
        )
    }
}

function mapStateToProps({ products, orderBuffer }) {
    console.log("products", products)
    return { products, orderBuffer }
}

export default withRouter(connect(mapStateToProps, { productFetch, orderAdd, orderDelete, orderConfirm })(ProductDetail))