import React, { Component } from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"

import { ordersFetch, orderDelete, ordersPaymentFetch, ordersWaitPaymentFetch, ordersReset, orderPaidDelete } from '../../actions/'
import axios from "axios"
class PaymentOrder extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.ordersWaitPaymentFetch()

    



    }
    onSubmit(id) {
        this.props.orderPaidDelete(id)
    }

    showOrders() {
        console.log("bbb", this.props.orders)
        return this.props.orders && Array.isArray(this.props.orders) && this.props.orders.map(order => {
            const date = new Date(order.orderDate)
            return (
                <div key={order.id} className="col-md-12">
                    <div className="card mb-4 ">
                        <h5 className="text-center mt-2 ">วันที่ {date.toLocaleDateString()} {date.toLocaleTimeString()}</h5>
                        <div className="row">
                            {order.orders && order.orders.map(record => {
                                return (
                                    <div key={record.product.product_id} className="col-3 d-flex flex-column bd-highlight mb-3" >
                                        <img src={record.product.product_thumbnail} class=" card-img-top img-thumbnail mb-2  rounded mx-auto d-block " Style="width: 100px;" alt="..." />
                                        <h6 className="text-center title ">{record.product.product_name} x {record.quantity} = {record.product.product_price * record.quantity} บาท</h6>
                                    </div>
                                )
                            })}
                        </div>

                        <p className="title text-right mr-2">ยอดรวม {order.totalPrice} บาท</p>
                        <div class="d-flex justify-content-end" >
                            <button className="btn btn-secondary btn-sm title mr-2 mb-2" onClick={() => this.onSubmit(order.id)}>ยกเลิกรายการ</button>
                            <button className="btn btn-danger btn-sm title mr-2 mb-2" onClick={() => this.props.history.push('/paymentOrderConfirm/' + order.id)}>แจ้งชำระเงิน</button>
                        </div>
                    </div>
                </div>
            )
        })
    }
    render() {
        console.log("aaa", Array.isArray(this.props.orders))
        return (
            <div>
                <Header menu={this.props.match.path} />
                { this.props.orders.length == 0 ?
                    <div class="alert alert-success text-center col-12" role="alert">
                        <h5>{this.props.orders.msg}</h5> <button className="btn btn-success title">กดเพื่อติดตามสินค้า</button>
                    </div> : <>
                        <h2 className="text-center pt-3">รายการที่ยังไม่ชำระเงิน</h2>
                        <div className="row">
                            {this.showOrders()}

                        </div>
                    </>}




                <Footer />
            </div>

        )
    }
}
function mapStateToprops({ orders }) {
    return { orders }
}
export default withRouter(connect(mapStateToprops, { ordersWaitPaymentFetch, ordersReset, orderPaidDelete })(PaymentOrder))