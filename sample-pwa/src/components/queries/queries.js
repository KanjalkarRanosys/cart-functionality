import { useQuery, gql } from '@apollo/client'

// Get shop the look products
export const GET_PRODUCTS = gql`
query GetCategories($id:String!$pageSize:Int!$currentPage:Int!$filters:ProductAttributeFilterInput!$sort:ProductAttributeSortInput){
    categories(filters:{category_uid:{in:[$id]}}){
        items{uid ...CategoryFragment __typename}__typename}products(pageSize:$pageSize currentPage:$currentPage filter:$filters sort:$sort)
        {...ProductsFragment __typename}}fragment CategoryFragment on CategoryTree{uid meta_title meta_keywords meta_description __typename}fragment ProductsFragment on Products{items{id uid name price_range{maximum_price{regular_price{currency value __typename}__typename}__typename}sku small_image{url __typename}stock_status rating_summary __typename url_key}page_info{total_pages __typename}total_count __typename}
`

// Get the dresses for homepage
export const GET_DRESSES = gql`
query GetCategories($id:String!$pageSize:Int!$currentPage:Int!$filters:ProductAttributeFilterInput!$sort:ProductAttributeSortInput){
    categories(filters:{category_uid:{in:[$id]}}){
        items{uid ...CategoryFragment __typename}__typename}products(pageSize:$pageSize currentPage:$currentPage filter:$filters sort:$sort){
            ...ProductsFragment __typename}}fragment CategoryFragment on CategoryTree{
                uid meta_title meta_keywords meta_description __typename}fragment ProductsFragment on Products{items{
                    id uid name price_range{maximum_price{final_price{
                        currency value __typename}regular_price{currency value __typename}__typename}__typename}sku small_image{
                            url __typename}stock_status rating_summary __typename url_key}page_info{total_pages __typename}total_count __typename}
` 

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

  export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
      __typename
    }
  }
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

  export const GUEST_ADDRESS = gql`
  mutation SetGuestShipping($cartId: String!, $email: String!, $address: CartAddressInput!) {
    setGuestEmailOnCart(input: {cart_id: $cartId, email: $email}) {
      cart {
        id
        __typename
      }
      __typename
    }
    setShippingAddressesOnCart(
      input: {cart_id: $cartId, shipping_addresses: [{address: $address}]}
    ) {
      cart {
        id
        ...ShippingInformationFragment
        ...ShippingMethodsCheckoutFragment
        ...PriceSummaryFragment
        ...AvailablePaymentMethodsFragment
        __typename
      }
      __typename
    }
  }
  
  fragment ShippingInformationFragment on Cart {
    id
    email
    shipping_addresses {
      city
      country {
        code
        label
        __typename
      }
      firstname
      lastname
      postcode
      region {
        code
        label
        region_id
        __typename
      }
      street
      telephone
      __typename
    }
    __typename
  }
  
  fragment ShippingMethodsCheckoutFragment on Cart {
    id
    ...AvailableShippingMethodsCheckoutFragment
    ...SelectedShippingMethodCheckoutFragment
    shipping_addresses {
      country {
        code
        __typename
      }
      postcode
      region {
        code
        __typename
      }
      street
      __typename
    }
    __typename
  }
  
  fragment AvailableShippingMethodsCheckoutFragment on Cart {
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
  
  fragment SelectedShippingMethodCheckoutFragment on Cart {
    id
    shipping_addresses {
      selected_shipping_method {
        amount {
          currency
          value
          __typename
        }
        carrier_code
        method_code
        method_title
        __typename
      }
      street
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
  
  fragment AvailablePaymentMethodsFragment on Cart {
    id
    available_payment_methods {
      code
      title
      __typename
    }
    __typename
  }
  
  `