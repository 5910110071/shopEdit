import React, { Component } from 'react';

import { commentFetch } from '../../actions'
import { connect } from "react-redux"

class UserComment extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.commentFetch(this.props.product_id)
    }

    renderComment() {
        return (
            this.props.comments && this.props.comments.map(comment => {
                return (
                    <div className="col-12 mt-3">
                        <div className="card" >
                            <div className="row">
                                <div className="col-2 ">
                                    <img src={comment.user_image} class="card ml-2 mb-2 mt-2" Style="width: 100px;" />
                                    <h5 className="ml-2">ชานน พรศิริวงศ์ </h5>
                                </div>
                                <div className="col-8 border border-dark mt-2 mb-2">
                                    <p>
                                        {comment.comment}
                                    </p>
                                </div>
                                <div className="col-2 ">
                                    <h5>{comment.rating}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="container" >
                <div className="row">
                    {this.renderComment()}

                </div>
            </div>
        )
    }
}
function mapStateToProps({ comments }) {
    return { comments }
}
export default connect(mapStateToProps, { commentFetch })(UserComment)