import { useQuery, gql } from '@apollo/client'


export const SHIPPING_METHOD = gql`
mutation SetShippingMethod($cartId: String!, $shippingMethod: ShippingMethodInput!) {
  setShippingMethodsOnCart(
    input: {cart_id: $cartId, shipping_methods: [$shippingMethod]}
  ) {
    cart {
      id
      available_payment_methods {
        code
        title
        __typename
      }
      ...SelectedShippingMethodCheckoutFragment
      ...PriceSummaryFragment
      ...ShippingInformationFragment
      ...AvailableShippingMethodsCheckoutFragment
      __typename
    }
    __typename
  }
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

`


export const GET_REGION = gql`
query GetRegions($countryCode:String!){country(id:$countryCode){id available_regions{id code name __typename}__typename}}
`


export const SHIPPING_INFO = gql`
query GetShippingInformation($cartId:String!){cart(cart_id:$cartId){
  id ...ShippingInformationFragment __typename}}fragment ShippingInformationFragment on Cart{
    id email shipping_addresses{city country{code label __typename}firstname lastname postcode region{
      code label region_id __typename}street telephone __typename}__typename}
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
