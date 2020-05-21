import React, { Component } from 'react';


class UserComment extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="container" >
                <div className="row">

                    <div className="col-12 mt-3">
                        <div className="card" >
                            <div className="row">
                                <div className="col-2 ">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6ryCT9DB5-umhvVmtgyzybxosrhbre4ov8I7zB_sILaRlsLfO&usqp=CAU" class="card ml-2 mb-2 mt-2" Style="width: 100px;" />
                                    <h5 className="ml-2">ชานน พรศิริวงศ์ </h5>
                                </div>
                                <div className="col-8 border border-dark mt-2 mb-2">
                                    <p>
                                        ข้อความรีวิวสินค้า
                                    </p>
                                </div>
                                <div className="col-2 ">
                                    <h5>ระดับความพึงพอใจ</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserComment