import React, { Component } from "react"
import { connect } from "react-redux"

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RegisterForm from "../../containers/register/RegisterForm"

import { setUser } from '../../actions'

class Register extends Component {
    componentDidMount() {
        // if (this.props.match.params.id) {
        //     this.props.orderPaymentFetch(this.props.match.params.id)
        //     console.log(this.props.match.params)

        // }
    }

    onSubmit(formValues) {
        formValues.status = "ลงทะเบียนแล้ว"
        formValues.id = this.props.user_id
        console.log("formValues", formValues)
        this.props.setUser(formValues)
    }
    render() {
        const { formValues } = this.props;
        return (
            <div>
                
                <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>
                    <h2 className="text-center pt-3" >ลงทะเบียน</h2>
                    <RegisterForm onPaymentSubmit={() => this.onSubmit(formValues)} />
                </div>
                
            </div>
        )
    }
}
function mapStateToProps({ form }) {
    return { formValues: form.registerForm ? form.registerForm.values : null }
}
export default connect(mapStateToProps,{setUser})(Register)