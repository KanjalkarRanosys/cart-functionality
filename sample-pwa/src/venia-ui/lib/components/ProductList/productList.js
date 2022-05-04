import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom';
import ViewProduct from '../ViewProduct/viewProduct';

const GET_PRODUCTS = gql`
query GetCategories($id:String!$pageSize:Int!$currentPage:Int!$filters:ProductAttributeFilterInput!$sort:ProductAttributeSortInput){
    categories(filters:{category_uid:{in:[$id]}}){
        items{uid ...CategoryFragment __typename}__typename}products(pageSize:$pageSize currentPage:$currentPage filter:$filters sort:$sort)
        {...ProductsFragment __typename}}fragment CategoryFragment on CategoryTree{uid meta_title meta_keywords meta_description __typename}fragment ProductsFragment on Products{items{id uid name price_range{maximum_price{regular_price{currency value __typename}__typename}__typename}sku small_image{url __typename}stock_status rating_summary __typename url_key}page_info{total_pages __typename}total_count __typename}
`

const ProductList = props => {
    console.log(props);

    const {data} = useQuery(GET_PRODUCTS, {
        variables: {"currentPage":1,"id":"NDA=","filters":{"category_uid":{"eq":"Mzk="}},"pageSize":12,"sort":{"position":"ASC"}}
    })


  return (
    <div>
        {console.log(data)};
        { data && data.products.items.map((el)=>(
        <div style={{display:"flex", flexWrap:"wrap"}}>
            <div style={{flex:"1 1 calc(20% - 20px)", border:"1px solid"}}>
                <div><img src={el.small_image.url} 
                    style={{objectFit:"contain", display:"block", width:"150px", height:"150px"}}
                /> </div>
                <div>{el.name}</div>
                <div>${el.price_range.maximum_price.regular_price.value}</div>
                <Link to={`/view-product/${el.name}`}>
                    <button style={{background:"blue", color:"#fff", padding:"10px 20px"}}
                        
                    >Add To Cart</button>
                </Link>
            </div>
        </div>
        ))
}    </div>
  )
}

export default ProductList