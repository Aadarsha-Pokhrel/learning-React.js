
import {useEffect,useState} from 'react'
import './HomePage.css'
import axios from 'axios'
import { Header } from '../../components/Header'
import { ProductGrid } from './ProductsGrid'


export function HomePage({cart}) {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
            const getHomeData =async ()=>{
                const response =  await axios.get('/api/products');
                setProducts(response.data);
            }
            getHomeData();
        },[]);

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <Header cart={cart} />

            <div className="home-page">
              <ProductGrid products={products}/>
            </div>
        </>
    )
}