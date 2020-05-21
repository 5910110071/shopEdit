import React, { Component } from "react"
import { connect } from "react-redux"
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WaitPaymentForm from "../../containers/waitPayment/WaitPaymentForm"
import { orderPaymentFetch, ordersPaymentPut } from '../../actions/'
import { authen } from "../../FirebaseConfig";

class PaymentOrderComfirm extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.orderPaymentFetch(this.props.match.params.id)
        }
    }

    onSubmit(formValues) {
        const uploadTask = authen.storage().ref(`images/${formValues.image[0].name}`).put(formValues.image[0]);
        uploadTask.on('state_changed',
            (snapshot) => {
                // // progrss function ....
                // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // this.setState({ progress });
            },
            (error) => {
                // // error function ....
                // console.log(error);
            },
            () => {
                // complete function ....
                authen.storage().ref('images').child(formValues.image[0].name).getDownloadURL().then(url => {
                    console.log(url);
                    //this.setState({ url });
                    formValues.image = "test"
                    formValues.Silp = url
                    formValues.status = "ชำระเงินแล้ว"
                    console.log("formValues", formValues)
                    this.props.ordersPaymentPut(formValues._id, formValues)
                    console.log(" formValues.Silp", formValues);
                })
            });
    }
    render() {
        const { formValues, orders } = this.props;
        return (
            <div>
                <Header menu={this.props.match.path} />
                <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>
                    <h2 className="text-center pt-3" >แจ้งชำระเงิน</h2>
                    <WaitPaymentForm onPaymentSubmit={() => this.onSubmit(formValues)} orders={orders} />
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps({ form, orders }) {
    return { formValues: form.paymentForm ? form.paymentForm.values : null, orders }
}

export default connect(mapStateToProps, { orderPaymentFetch, ordersPaymentPut })(PaymentOrderComfirm)