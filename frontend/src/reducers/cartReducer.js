import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO, UPDATE_CART } from "./cartConstants"
import Swal from 'sweetalert2'
// const initialData={
//     cart_items:[],
//     shipping_info:{}
// }

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            let new_product = action.payload
            let itemExists = state.cart_items.find(item => item.product === new_product.product)
            if (itemExists) {
                // Swal.fire({
                //    title: 'Alert',
                //    Text:'Item already in cart. Do you want to another?',
                //    icon:'question',
                //    showCancelButton:true,
                // })
                // .then(result=>{
                //     if(result.isConfirmed){
                //         new_product.quantity++
                //         Swal.fire('Congrats','item quantity increased','success')
                //         return {...state,cart_items: state.cart_items.map(item=>{
                //             return item.product===new_product.product?new_product:item 
                //         })}
                //     }
                // })
                Swal.fire('warning', 'item already in cart', 'success')
                return { ...state, cart_items: state.cart_items, new_product }
            }
            else {
                Swal.fire('congrats', 'Item added to cart', 'success')
                return { ...state, cart_items: [...state.cart_items, new_product] }
            }
        }
        case REMOVE_FROM_CART: {
            let product = action.payload
            Swal.fire('Alert', 'Item has been removed from cart', 'info')
            return { ...state, cart_items: state.cart_items.filter(item => item.product != product) }

        }
        case EMPTY_CART: {
            Swal.fire('Alert', 'cart emptied', 'info')
            return { ...state, cart_items: [] }
        }
        case UPDATE_CART: {
            return {
                ...state,
                cart_items: state.cart_items.map(item => {
                    return item.product === action.payload.product ? action.payload : item
                })
            }
        }
        case SAVE_SHIPPING_INFO: {
            return { ...state, shipping_info: action.payload }
        }

        default:
            return state
    }
}
export default cartReducer