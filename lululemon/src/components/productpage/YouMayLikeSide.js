import React from 'react';
import './YouMayLikeSide.css';

const YouMayLikeSide = ({ products }) => {
    return (
        <div className="youMayLike">
            <h3>You may like</h3>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <img src={product.images[0].mainCarousel.media.split('|').map(img => img.trim())[0]} alt={product.name} />
                        <p>{product.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YouMayLikeSide;