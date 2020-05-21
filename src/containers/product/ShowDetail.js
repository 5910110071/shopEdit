import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

class ShowDetail extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        const { products, onCheckQuantity , onGetQuantity , onDelOrder , onAddOrder , onOrderConfirm } = this.props
        
        console.log("this.props.products", products)
        if (products != null) {
            onCheckQuantity(products)
        }
        return (
            <div className="container" >
                <h2 className="text-center pt-3 mb-3">รายละเอียดสินค้า</h2>
                <div className="card mb-3 ">
                    <div className="row no-gutters">
                        <div className="col-md-5">
                            <img src={products.product_image} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <h3 className="card-title">{products.product_name}</h3>
                                <p className="card-text">รายละเอียดสินค้า : {products.product_detail}</p>
                                <p className="card-text">จำนวนที่เหลือ : {products.product_inventory}</p>
                                <p className="card-text">ราคา : {products.product_price} บาท</p>
                            </div>
                            <div className="container input-group d-flex justify-content-end   ">
                                <h5 className="text-right mr-2">จำนวน :  </h5>
                                <span class="input-group-btn ">
                                    <button type="button" class="quantity-left-minus btn btn-secondary btn-number" data-type="minus" data-field="" onClick={() => onDelOrder(products.product_id)}>
                                        <span class="glyphicon glyphicon-minus">-</span>
                                    </button>
                                </span>
                                <input type="text" id="quantity" name="quantity" class="form-control input-number col-1 text-center" value={onGetQuantity(products)} min="1" max="10" />
                                <span class="input-group-btn">
                                    <button type="button" class="quantity-right-plus btn btn-secondary btn-number mr-2" data-type="plus" data-field="" onClick={() => onAddOrder(products)}>
                                        <span class="glyphicon glyphicon-plus">+</span>
                                    </button>
                                </span>
                            </div>
                            <div className=" mr-4 mt-3 d-flex justify-content-end">
                                <button className="btn btn-danger" onClick={() => onOrderConfirm(products)}>เพิ่มลงตะกร้า </button>
                            </div>
                            <div className=" btn d-flex justify-content-end bd-highlight mb-3 mr-5" onClick={() => this.props.history.push('/basket/')}>
                                <img src="https://cdn1.iconfinder.com/data/icons/ecommerce-1-9/48/2-512.png" class="mt-2" Style="width: 50px;" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ShowDetail)