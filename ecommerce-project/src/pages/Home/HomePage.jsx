
import {useEffect,useState} from 'react'
import './HomePage.css'
import axios from 'axios'
import { Header } from '../../components/Header'
import { ProductGrid } from './ProductsGrid'
import { useSearchParams} from 'react-router'


export function HomePage({cart,loadCart}) {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    window.axios = axios;
    const [products,setProducts] = useState([]);

    useEffect(()=>{
            const getHomeData =async ()=>{
                 const response =await (search?axios.get(`/api/products?search=${search}`):axios.get('/api/products'))
                setProducts(response.data);
            }
            getHomeData();
        },[search]);

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <Header cart={cart} />

            <div className="home-page">
              <ProductGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    )
}