import React, { Component } from "react"
import { connect } from "react-redux"

import CommentForm from "../../containers/product/CommentForm"

import { commentPost ,ratingFetch } from '../../actions'

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import axios from 'axios'

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }
    componentDidMount() {

    }

    onSubmit(formValues) {
        formValues.user_id = this.props.user._id
        formValues.user_image = this.props.user.user_image
        formValues.user_name = this.props.user.user_name
        formValues.product_id = this.props.product_id
        formValues.rating = this.state.value

        this.props.ratingFetch(this.props.product_id,formValues)

        // axios.get("http://localhost:5000/rating/" + this.props.product_id).then(
        //     res => {
        //         console.log("Rating55555555555555555555", res.data)
        //         if (res.data == null) {
        //             console.log("Here1", formValues.rating)
        //             axios.post("http://localhost:5000/rating", { product_id: this.props.product_id, sum: formValues.rating, count: 1, average: formValues.rating }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
        //                 res => {
        //                     console.log("Rating", res.data)
        //                 }
        //             )
        //         }
        //         else {
        //             let value = {
        //                 product_id: this.props.product_id,
        //                 sum: (res.data.sum + formValues.rating),
        //                 count: res.data.count + 1,
        //                 average: (res.data.sum + formValues.rating) / (res.data.count + 1)
        //             }
        //             console.log("res.data.sum ", res.data.sum , "formValues.rating" ,formValues.rating )
        //             axios.put("http://localhost:5000/rating/" + this.props.product_id, value).then(
        //                 res => {
        //                     console.log("Rating", res.data)
        //                 }
        //             )
        //         }
        //     }
        // )

        this.props.commentPost(formValues, this.props.product_id)
        
        
        this.setState({
            value: 0
        });
    }
    render() {
        console.log("this.state.value", this.state.value)
        const { formValues } = this.props;
        return (
            <div>
                <div className="container">
                    <div className="card">
                        <div className="row">
                            <div className="col-8">
                                <CommentForm onCommentSubmit={() => this.onSubmit(formValues)} />
                            </div>
                            <div className="col-4" >
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Controlled</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={this.state.value}
                                        onChange={(event, newValue) => {
                                            this.setState({
                                                value: newValue
                                            });
                                        }}
                                    />
                                </Box>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
function mapStateToProps({ form, user }) {
    return { formValues: form.commentForm ? form.commentForm.values : null, user }
}
export default connect(mapStateToProps, { commentPost ,ratingFetch })(Comment)