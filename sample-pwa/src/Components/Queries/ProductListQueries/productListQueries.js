import { gql } from '@apollo/client'


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

export const SEARCHING_PRODUCTS = gql`
query getAutocompleteResults($inputText:String!){products(search:$inputText currentPage:1 pageSize:3){
    aggregations{label count attribute_code options{label value __typename}position __typename}items{
        id uid name small_image{url __typename}url_key url_suffix price{regularPrice{amount{
            value currency __typename}__typename}__typename}price_range{maximum_price{final_price{
                currency value __typename}__typename}__typename}__typename}page_info{total_pages __typename}total_count __typename}}
`

export const GET_FILTERED_PRODUCTS = gql`
query ProductSearch($currentPage:Int=1$inputText:String!$pageSize:Int=6$filters:ProductAttributeFilterInput!$sort:ProductAttributeSortInput){
    products(currentPage:$currentPage pageSize:$pageSize search:$inputText filter:$filters sort:$sort){
        items{id uid name price_range{maximum_price{final_price{
            currency value __typename}regular_price{currency value __typename}__typename}__typename}sku small_image{
                url __typename}stock_status __typename url_key}page_info{total_pages __typename}total_count __typename}}
`