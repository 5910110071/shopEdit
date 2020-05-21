import React, { Component } from 'react';

import ShowWaitPayment from '../../containers/waitPayment/ShowWaitPayment'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"

import { ordersFetch, orderDelete, ordersPaymentFetch, ordersWaitPaymentFetch, ordersReset, orderPaidDelete } from '../../actions/'
import axios from "axios"
class PaymentOrder extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        this.props.ordersWaitPaymentFetch(this.props.user.id)
    }
    onSubmit(id) {
        this.props.orderPaidDelete(id, this.props.user.id)
    }
    //const {orders , onSubmit }
    render() {
        return (
            <div>
                <Header menu={this.props.match.path} />
                <ShowWaitPayment
                    orders={this.props.orders}
                    onSubmit={this.onSubmit}
                />
                <Footer />
            </div>

        )
    }
}
function mapStateToprops({ orders, user }) {
    return { orders, user }
}
export default withRouter(connect(mapStateToprops, { ordersWaitPaymentFetch, ordersReset, orderPaidDelete })(PaymentOrder))