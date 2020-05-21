import React, { Component } from 'react';
import { productFetch, orderAdd, orderDelete, orderConfirm } from "../../actions"
import { connect } from "react-redux"

import ShowDetail from "./ShowDetail"
import UserComment from "./UserComment"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

class Product extends Component {
    constructor(props) {

        super(props)

        this.addOrder = this.addOrder.bind(this)
        this.delOrder = this.delOrder.bind(this)
        this.getQuantity = this.getQuantity.bind(this)
        this.checkQuantity = this.checkQuantity.bind(this)

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
        let findOrder = this.props.orderBuffer.orders.find(order => order.product.product_id == product.product_id);
        if (findOrder) {
            return findOrder.quantity;
        } else {
            return 0
        }
    }

    checkQuantity(product) {
        console.log("checkQuantity(product)", product)
        let findOrder = this.props.orderBuffer.orders.find(order => order.product.product_id == product.product_id);
        console.log("findOrder", findOrder)

        if (findOrder) {
            console.log("here")
            if (findOrder.quantity == 0) {

            }
        }
        else {
            console.log("here2")
            this.addOrder(product)
        }
    }

    render() {
        return (
            <div>
                <Header menu={this.props.match.path} />
                <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
                    <ShowDetail products={this.props.products}
                        onCheckQuantity={this.checkQuantity}
                        onGetQuantity={this.getQuantity}
                        onDelOrder={this.delOrder}
                        onAddOrder={this.addOrder}
                        onOrderConfirm={this.props.orderConfirm}
                    />
                    <UserComment />

                </div>>

                <Footer />
            </div>
        )
    }
}

function mapStateToProps({ products, orderBuffer }) {
    console.log("products", products)
    return { products, orderBuffer }
}

export default connect(mapStateToProps, { productFetch, orderAdd, orderDelete, orderConfirm })(Product)