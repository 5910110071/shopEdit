import { ORDERS_PAYMENT_FETCH , ORDER_PAYMENT_FETCH , ORDER_PAYMENT_DELETE } from "../actions/types"
export default function (state = [], action) {
    switch (action.type) {
        case ORDERS_PAYMENT_FETCH:
        case ORDER_PAYMENT_FETCH:
        case ORDER_PAYMENT_DELETE:
            return action.payload
        default: return state
    }
}