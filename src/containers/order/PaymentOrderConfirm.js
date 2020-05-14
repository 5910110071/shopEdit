import React, { Component } from "react"
import { connect } from "react-redux"

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PaymentForm from "../../containers/order/PaymentForm"

import { orderPaymentFetch , ordersPaymentPut } from '../../actions/'

class PaymentOrderComfirm extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.orderPaymentFetch(this.props.match.params.id)
            console.log(this.props.match.params)

        }
    }

    onSubmit(formValues) {
        formValues.status = "ชำระเงินแล้ว"
        console.log("formValues", formValues)
        this.props.ordersPaymentPut(formValues.id,formValues)
        //this.props.orderPaymentDelete(formValues.id)
    }
    render() {
        const { formValues, orders } = this.props;
        return (
            <div>
                <Header menu={this.props.match.path} />
                <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>


                    <h2 className="text-center pt-3" >แจ้งชำระเงิน</h2>
                    {/* {
                            products.saved &&
                            <div className="alert alert-secondary title" role="alert">
                                {this.props.products.msg}
                            </div>
                        } */}

                    {/* <PaymentForm onPaymentSubmit={() => this.props.paymentPost(formValues)} orderPayment={orderPayment} /> */}
                    <PaymentForm onPaymentSubmit={() => this.onSubmit(formValues)} orders={orders} />




                    {/* {match.path.indexOf("add") > 0 && (
                        <div>
                            <h2>เพิ่ม</h2>
                            {
                                products.saved &&
                                <div className="alert alert-secondary title" role = "alert">
                                    {this.props.products.msg}
                                </div>
                            }
                            <ProductForm onProductSubmit={() => productCreate(formValues)} />
                        </div>
                    )}
                    {match.path.indexOf("edit") > 0 && (
                        <div>
                            <h2>แก้ไข</h2>
                            {
                                products.saved &&
                                <div className="alert alert-secondary title" role = "alert">
                                    {this.props.products.msg}
                                </div>
                            }
                            <ProductForm onProductSubmit={() => productUpdate(products.id, formValues)} />
                        </div>
                    )} */}

                </div>

                <Footer />
            </div>
        )
    }
}
function mapStateToProps({ form, orders }) {
    return { formValues: form.paymentForm ? form.paymentForm.values : null, orders }
}
export default connect(mapStateToProps, { orderPaymentFetch , ordersPaymentPut })(PaymentOrderComfirm)