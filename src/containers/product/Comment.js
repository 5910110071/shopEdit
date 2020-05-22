import React, { Component } from "react"
import { connect } from "react-redux"

import CommentForm from "../../containers/product/CommentForm"

import { commentPost } from '../../actions'

class Comment extends Component {
    componentDidMount() {
        
    }

    onSubmit(formValues) {
        formValues.user_id = this.props.user._id
        formValues.user_image = this.props.user.user_image
        formValues.product_id = this.props.product_id 
        formValues.rating = 5

        this.props.commentPost(formValues , this.props.product_id)
    }
    render() {
        const { formValues } = this.props;
        return (
            <div>
                
                <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>
                    <CommentForm onCommentSubmit={() => this.onSubmit(formValues)} />
                </div>
                
            </div>
        )
    }
}
function mapStateToProps({ form , user }) {
    return { formValues: form.commentForm ? form.commentForm.values : null , user }
}
export default connect(mapStateToProps,{commentPost})(Comment)