import React, { useState } from 'react';
import axios from 'axios';
import {productURL} from "../../redux/utils/helper";
import ProductCard from "../whatsnew/ProductCard";

export const OpenAIChatboxTest = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [products, setProducts] = useState([]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = `You: ${input}`;
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('http://localhost:3399/openAI', { input });
            const aiMessage = response.data.data;
            console.log(aiMessage);
            //setMessages((prevMessages) => [...prevMessages, aiMessage]);
            const productResponse = await axios.post(productURL, aiMessage);
            console.log(productResponse.data.rs.products);
            setProducts(productResponse.data.rs.products);
        } catch (error) {
            console.error('Error communicating with AI assistant:', error);
            setMessages((prevMessages) => [...prevMessages, 'AI: Sorry, something went wrong.']);
        }

        setInput('');
    };

    return (
        <div>
            <div style={{maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc'}}>
                <div style={{maxHeight: '500px', overflowY: 'auto', paddingBottom: '10px'}}>
                    {messages.map((message, index) => (
                        <div key={index} style={{margin: '5px 0'}}>{message}</div>
                    ))}
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask something..."
                    style={{width: '97%', padding: '10px', marginBottom: '10px'}}
                />
                <button onClick={handleSendMessage} style={{width: '100%', padding: '10px', marginTop: '10px'}}>
                    Send
                </button>

            </div>
            <div className="productsGrid" style={{width: '90%', padding: '20px'}}>
                {products.map((product, index) => (
                    <ProductCard key={`${product.productId}-${index}`} product={product}/>
                ))}
            </div>
        </div>

    );
};

