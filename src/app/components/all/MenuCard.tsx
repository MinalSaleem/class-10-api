"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface Book {
    id: number;
    title: string;
    image: string;
    author: string;
}

const MenuCard = ({ title, image, author }: Book) => {
    const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

    const handleAddToCart = async () => {
        setIsAddedToCart(!isAddedToCart);
        const bookData = {
            title,
            image,
            author,
        };

        const response = await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            console.error("Failed to add book");
            setIsAddedToCart(false);
        }
    };

    return (
        <div className='bg-slate-100 rounded-lg m-3 flex flex-col justify-center md:w-[400px] w-[350px]'>
            <div className='w-[250px] mx-auto h-[350px] mt-2'>
                <Image
                    src={image}
                    alt={title}
                    width={200}
                    height={200}
                    className='w-[100%] h-[100%] object-contain'
                />
            </div>

            <h1 className='mt-20px text-[22px] text-black font-semibold text-center'>{title}</h1>

            <div className='flex flex-col items-center space-x-3'>
                <div className='flex w-32 justify-center rounded-lg'>
                    <h1 className='text-black font-semibold'>{author}</h1>
                </div>
                <div className='my-3'>
                <button className={`font-semibold w-52 rounded-lg py-2 ${isAddedToCart ? 'bg-green-600' : 'bg-red-700'} text-white`}
                    onClick={handleAddToCart}>
                    {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
