import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaStar } from "react-icons/fa";


interface Products {
    id: number;
    images: string[];
    title: string;
    price: number;
}

const API_URL: string = "https://dummyjson.com/products/";

const Product: FC = () => {
    const [data, setData] = useState<Products[] | null>(null);

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => setData(res.data.products))
            .catch((res) => console.log(res));
    }, []);

    let productsItem: JSX.Element[] | undefined = data?.map((product: Products): JSX.Element => (
    <div key={product.id} className=" text-center bg-gray-100 p-4">
        <div className='justify-center'>
                <Link to={`/product/${product.id}`} className="text-red-600 underline">
            <img className="w-full object-contain duration-200 hover:scale-105 h-[300px]" src={product.images[0]} alt="" />
                </Link>
        </div>
        <div >
            <div className="ml-4">
                <h2 className="text-black font-bold">{product.title}</h2>
                <p className='text-xl font-medium'>{product.category}</p>
                <div className='flex justify-center gap-2'>
                <FaStar className='text-yellow-300 mt-[2px]'/> 
                <p className='font-bold text-yellow-300'>{product.rating}</p>
                </div>
                <h3 className='text-xl font-bold text-red-600'>{product.price} $</h3>
                <button className='bg-green-500 w-full rounded-[10px] mt-2 py-1'>CART</button>
            </div>
        </div>
        </div>
    ));

    return (
        <div className="container mx-auto px-5 flex-wrap gap-3 grid grid-cols-4">
            {productsItem}
        </div>
    );
};

export default Product;
