import { useQuery, gql } from '@apollo/client'
import { CartTriggerFragment } from '@magento/peregrine/lib/talons/Header/cartTriggerFragments.gql'
import { MiniCartFragment } from '@magento/peregrine/lib/talons/MiniCart/miniCartFragments.gql'


// Get the details about cart storage
export const GET_CART_DETAILS = gql`
query MiniCartQuery(
    $cartId:String!
    ){
    cart(
        cart_id:$cartId
        ){
    id ...MiniCartFragment __typename}}fragment MiniCartFragment on Cart{id total_quantity prices{subtotal_excluding_tax{currency value __typename}subtotal_including_tax{
        currency value __typename}__typename}...ProductListFragment __typename}fragment ProductListFragment on Cart{id items{uid product{
            uid name url_key thumbnail{url __typename}stock_status ...on ConfigurableProduct{variants{attributes{uid __typename}product{
                uid thumbnail{url __typename}__typename}__typename}__typename}__typename}prices{price{currency value __typename}__typename}quantity ...on ConfigurableCartItem{
                    configurable_options{
                        configurable_product_option_uid option_label configurable_product_option_value_uid value_label __typename}__typename}__typename}__typename}
`

// To get the quantity for cart
export const GET_CART_COUNT = gql`
  query getItemCount($cartId:String!){
    cart(cart_id:$cartId){
      id ...CartTriggerFragment __typename}}fragment CartTriggerFragment on Cart{
        id total_quantity __typename}

`

export const ADD_PRODUCT_TO_CART = gql`
mutation AddProductToCartFromDialog(
    $cartId: String!
    $cartItem: CartItemInput!
) {
    addProductsToCart(cartId: $cartId, cartItems: [$cartItem]) {
        cart {
            id
            ...CartTriggerFragment
            ...MiniCartFragment
        }
    }
}
${CartTriggerFragment}
${MiniCartFragment}
`


export const PRICE_SUMMARY = gql`
query getPriceSummary($cartId:String!){cart(cart_id:$cartId){id ...PriceSummaryFragment __typename}}fragment PriceSummaryFragment on Cart{
  id items{uid quantity __typename}...ShippingSummaryFragment prices{
    ...TaxSummaryFragment ...DiscountSummaryFragment ...GrandTotalFragment subtotal_excluding_tax{
      currency value __typename}subtotal_including_tax{
        currency value __typename}__typename}...GiftCardSummaryFragment ...GiftOptionsSummaryFragment __typename
      }fragment DiscountSummaryFragment on CartPrices{discounts{amount{
        currency value __typename}label __typename}__typename}fragment GiftCardSummaryFragment on Cart{
          id applied_gift_cards{code applied_balance{
            value currency __typename}__typename}__typename}fragment GiftOptionsSummaryFragment on Cart{
              id prices{gift_options{printed_card{
                value currency __typename}__typename}__typename}__typename}fragment GrandTotalFragment on CartPrices{
                  grand_total{currency value __typename}__typename}fragment ShippingSummaryFragment on Cart{id shipping_addresses{
                    selected_shipping_method{amount{
                      currency value __typename}__typename}street __typename}__typename}fragment TaxSummaryFragment on CartPrices{
                        applied_taxes{amount{currency value __typename}__typename}__typename}
`


export const ITEM_COUNT = gql`
query getItemCount($cartId:String!){
  cart(cart_id:$cartId){
    id ...CartTriggerFragment __typename}}fragment CartTriggerFragment on Cart{
      id total_quantity __typename}
`