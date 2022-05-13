import { useQuery, gql } from '@apollo/client'

export const VIEW_PRODUCT = gql`
query getProductDetailForProductPage($urlKey:String!){
    products(filter:{url_key:{eq:$urlKey}}){
        items{
            id uid ...ProductDetailsFragment __typename}__typename}}fragment ProductDetailsFragment on ProductInterface{__typename categories{
                uid breadcrumbs{category_uid __typename}__typename}description{html __typename}short_description{html __typename}id uid media_gallery_entries{
                    uid label position disabled file __typename}meta_description name price{
                        regularPrice{amount{currency value __typename}__typename}__typename}price_range{
                            maximum_price{final_price{currency value __typename}__typename}__typename}sku small_image{url __typename}stock_status url_key custom_attributes{
                                selected_attribute_options{attribute_option{uid label is_default __typename}__typename}entered_attribute_value{value __typename}attribute_metadata{
                                    uid code label attribute_labels{store_code label __typename
                                    }data_type is_system entity_type ui_input{
                                        ui_input_type is_html_allowed __typename}...on ProductAttributeMetadata{
                                            used_in_components __typename}__typename}__typename}...on ConfigurableProduct{
                                                configurable_options{attribute_code attribute_id uid label values{
                                                    uid default_label label store_label use_default_value value_index swatch_data{
                                                        ...on ImageSwatchData{thumbnail __typename}value __typename}__typename}__typename}variants{attributes{
                                                            code value_index __typename}product{
                                                                uid media_gallery_entries{
                                                                    uid disabled file label position __typename}sku stock_status price{
                                                                        regularPrice{amount{currency value __typename}__typename}__typename}price_range{
                                                                            maximum_price{final_price{currency value __typename}__typename}__typename}custom_attributes{
                                                                                selected_attribute_options{
                                                                                    attribute_option{
                                                                                        uid label is_default __typename}__typename}entered_attribute_value{
                                                                                            value __typename}attribute_metadata{
                                                                                                uid code label attribute_labels{store_code label __typename}data_type is_system entity_type ui_input{
                                                                                                    ui_input_type is_html_allowed __typename}...on ProductAttributeMetadata{
                                                                                                        used_in_components __typename}__typename}__typename}__typename}__typename}__typename}}
`

export const UPDATE_QUANTITY = gql`
mutation updateItemQuantity($cartId: String!, $itemId: ID!, $quantity: Float!) {
  updateCartItems(
    input: {cart_id: $cartId, cart_items: [{cart_item_uid: $itemId, quantity: $quantity}]}
  ) {
    cart {
      id
      ...CartPageFragment
      ...AvailableShippingMethodsCartFragment
      __typename
    }
    __typename
  }
}

fragment CartPageFragment on Cart {
  id
  total_quantity
  ...AppliedCouponsFragment
  ...GiftCardFragment
  ...ProductListingFragment
  ...PriceSummaryFragment
  __typename
}

fragment AppliedCouponsFragment on Cart {
  id
  applied_coupons {
    code
    __typename
  }
  __typename
}

fragment GiftCardFragment on Cart {
  applied_gift_cards {
    code
    current_balance {
      currency
      value
      __typename
    }
    __typename
  }
  id
  __typename
}

fragment ProductListingFragment on Cart {
  id
  items {
    uid
    product {
      uid
      name
      sku
      url_key
      thumbnail {
        url
        __typename
      }
      small_image {
        url
        __typename
      }
      stock_status
      ... on ConfigurableProduct {
        variants {
          attributes {
            uid
            __typename
          }
          product {
            uid
            small_image {
              url
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    prices {
      price {
        currency
        value
        __typename
      }
      __typename
    }
    quantity
    errors {
      code
      message
      __typename
    }
    ... on ConfigurableCartItem {
      configurable_options {
        id
        configurable_product_option_uid
        option_label
        configurable_product_option_value_uid
        value_label
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment PriceSummaryFragment on Cart {
  id
  items {
    uid
    quantity
    __typename
  }
  ...ShippingSummaryFragment
  prices {
    ...TaxSummaryFragment
    ...DiscountSummaryFragment
    ...GrandTotalFragment
    subtotal_excluding_tax {
      currency
      value
      __typename
    }
    subtotal_including_tax {
      currency
      value
      __typename
    }
    __typename
  }
  ...GiftCardSummaryFragment
  ...GiftOptionsSummaryFragment
  __typename
}

fragment DiscountSummaryFragment on CartPrices {
  discounts {
    amount {
      currency
      value
      __typename
    }
    label
    __typename
  }
  __typename
}

fragment GiftCardSummaryFragment on Cart {
  id
  applied_gift_cards {
    code
    applied_balance {
      value
      currency
      __typename
    }
    __typename
  }
  __typename
}

fragment GiftOptionsSummaryFragment on Cart {
  id
  prices {
    gift_options {
      printed_card {
        value
        currency
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment GrandTotalFragment on CartPrices {
  grand_total {
    currency
    value
    __typename
  }
  __typename
}

fragment ShippingSummaryFragment on Cart {
  id
  shipping_addresses {
    selected_shipping_method {
      amount {
        currency
        value
        __typename
      }
      __typename
    }
    street
    __typename
  }
  __typename
}

fragment TaxSummaryFragment on CartPrices {
  applied_taxes {
    amount {
      currency
      value
      __typename
    }
    __typename
  }
  __typename
}

fragment AvailableShippingMethodsCartFragment on Cart {
  id
  shipping_addresses {
    available_shipping_methods {
      amount {
        currency
        value
        __typename
      }
      available
      carrier_code
      carrier_title
      method_code
      method_title
      __typename
    }
    street
    __typename
  }
  __typename
}

`

export const DELETE_PRODUCT = gql`
mutation RemoveItemForMiniCart($cartId: String!, $itemId: ID!) {
  removeItemFromCart(input: {cart_id: $cartId, cart_item_uid: $itemId}) {
     cart {
        id
           ...MiniCartFragment
              ...CartPageFragment
                 __typename
                    }
                   __typename
                   }
                  }
                  fragment MiniCartFragment on Cart {
                     id
                       total_quantity
                      prices {
                         subtotal_excluding_tax {
                              currency
                                value
                                   __typename
                                    }
                                      subtotal_including_tax {
                                          currency
                                            value
                                              __typename
                                              }
                                               __typename
                                               }
                                                ...ProductListFragment
                                                 __typename
                                                }
                                                fragment ProductListFragment on Cart {
                                                   id
                                                    items {
                                                          uid
                                                          product {
                                                            uid
                                                            name
                                                            url_key
                                                            thumbnail {
                                                              url
                                                              __typename
                                                          }
                                                          stock_status
                                                          ... on ConfigurableProduct {
                                                              variants {
                                                                attributes {
                                                                  uid
                                                                  __typename
                                                              }
                                                              product {
                                                                  uid
                                                                  thumbnail {
                                                                    url
                                                                    __typename
                                                                }
                                                                __typename
                                                            }
                                                              __typename
                                                          }
                                                            __typename
                                                        }
                                                          __typename
                                                      }
                                                        prices {
                                                            price {
                                                              currency
                                                              value
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        quantity
                                                        ... on ConfigurableCartItem {
                                                            configurable_options {
                                                              configurable_product_option_uid
                                                              option_label
                                                              configurable_product_option_value_uid
                                                              value_label
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment CartPageFragment on Cart {
                                                        id
                                                        total_quantity
                                                        ...AppliedCouponsFragment
                                                        ...GiftCardFragment
                                                        ...ProductListingFragment
                                                        ...PriceSummaryFragment
                                                        __typename
                                                    }
                                                    
                                                    fragment AppliedCouponsFragment on Cart {
                                                        id
                                                        applied_coupons {
                                                          code
                                                          __typename
                                                      }
                                                      __typename
                                                  }
                                                    
                                                    fragment GiftCardFragment on Cart {
                                                        applied_gift_cards {
                                                          code
                                                          current_balance {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        __typename
                                                    }
                                                      id
                                                      __typename
                                                  }
                                                    
                                                    fragment ProductListingFragment on Cart {
                                                        id
                                                        items {
                                                          uid
                                                          product {
                                                            uid
                                                            name
                                                            sku
                                                            url_key
                                                            thumbnail {
                                                              url
                                                              __typename
                                                          }
                                                          small_image {
                                                              url
                                                              __typename
                                                          }
                                                          stock_status
                                                          ... on ConfigurableProduct {
                                                              variants {
                                                                attributes {
                                                                  uid
                                                                  __typename
                                                              }
                                                              product {
                                                                  uid
                                                                  small_image {
                                                                    url
                                                                    __typename
                                                                }
                                                                __typename
                                                            }
                                                              __typename
                                                          }
                                                            __typename
                                                        }
                                                          __typename
                                                      }
                                                        prices {
                                                            price {
                                                              currency
                                                              value
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        quantity
                                                        errors {
                                                            code
                                                            message
                                                            __typename
                                                        }
                                                        ... on ConfigurableCartItem {
                                                            configurable_options {
                                                              id
                                                              configurable_product_option_uid
                                                              option_label
                                                              configurable_product_option_value_uid
                                                              value_label
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment PriceSummaryFragment on Cart {
                                                        id
                                                        items {
                                                          uid
                                                          quantity
                                                          __typename
                                                      }
                                                      ...ShippingSummaryFragment
                                                      prices {
                                                          ...TaxSummaryFragment
                                                          ...DiscountSummaryFragment
                                                          ...GrandTotalFragment
                                                          subtotal_excluding_tax {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        subtotal_including_tax {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        __typename
                                                    }
                                                      ...GiftCardSummaryFragment
                                                      ...GiftOptionsSummaryFragment
                                                      __typename
                                                  }
                                                    
                                                    fragment DiscountSummaryFragment on CartPrices {
                                                        discounts {
                                                          amount {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        label
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment GiftCardSummaryFragment on Cart {
                                                        id
                                                        applied_gift_cards {
                                                          code
                                                          applied_balance {
                                                            value
                                                            currency
                                                            __typename
                                                        }
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment GiftOptionsSummaryFragment on Cart {
                                                        id
                                                        prices {
                                                          gift_options {
                                                            printed_card {
                                                              value
                                                              currency
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment GrandTotalFragment on CartPrices {
                                                        grand_total {
                                                          currency
                                                          value
                                                          __typename
                                                      }
                                                      __typename
                                                  }
                                                    
                                                    fragment ShippingSummaryFragment on Cart {
                                                        id
                                                        shipping_addresses {
                                                          selected_shipping_method {
                                                            amount {
                                                              currency
                                                              value
                                                              __typename
                                                          }
                                                          __typename
                                                      }
                                                        street
                                                        __typename
                                                    }
                                                      __typename
                                                  }
                                                    
                                                    fragment TaxSummaryFragment on CartPrices {
                                                        applied_taxes {
                                                          amount {
                                                            currency
                                                            value
                                                            __typename
                                                        }
                                                        __typename
                                                    }
                                                      __typename
                                                  }

  `