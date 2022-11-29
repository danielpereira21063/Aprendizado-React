import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const Product = () => {
    const { id } = useParams();

    const url = "http:///localhost:3001/products/" + id

    const { data: product } = useFetch(url);

    console.log(product)
    return (
        <div>
            {product.name}
            R$ {product.price}
        </div>
    )
}

export default Product