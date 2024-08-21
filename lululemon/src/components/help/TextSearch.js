import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import ProductCard from "../whatsnew/ProductCard";
import "./TextSearch.css";
import { productURL } from "../../redux/utils/helper";
import {useNavigate} from "react-router-dom";
import {setHelpOpen} from "../../redux/actions/helpAction";
import {useDispatch} from "react-redux";

const TextSearch = () => {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([
        { text: 'AI: Hi! Tell us what you want!', sender: "ai" }]);
    const [input, setInput] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    //const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: `You: ${input}`, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('http://localhost:3399/openAI', { input });
            const responseData = response.data.data;

            const productResponse = await axios.post(productURL, responseData);
            const products = productResponse.data.rs.products;

            let aiMessage;
            // if (products.length > 0) {
            //     aiMessage = { text: "AI: Here are some product suggestions for you.", sender: "ai" };
            //     setIsModalOpen(true);
            // } else {
            //     aiMessage = { text: "AI: Sorry, we can't find any products that match your request. Please try again.", sender: "ai" };
            // }
            if (products.length > 0) {
                aiMessage = {
                    text: "AI: Here are some product suggestions for you.",
                    sender: "ai",
                    link: true, // Indicates there's a link associated
                    products: products // Store the products in the message
                };
            } else {
                aiMessage = { text: "AI: Sorry, we can't find any products that match your request. Please try again.", sender: "ai" };
            }

            setMessages((prevMessages) => [...prevMessages, aiMessage]);
            setProducts(products);
            //navigate("/suggestion", { state: { products } });

        } catch (error) {
            console.error('Error communicating with AI assistant:', error);
            const aiErrorMessage = { text: 'AI: Sorry, something went wrong.', sender: "ai" };
            setMessages((prevMessages) => [...prevMessages, aiErrorMessage]);
        }

        setInput('');
    };
    const handleViewSuggestions = (products) => {
        // Navigate to the suggestions page with the products
        navigate("/suggestion", { state: { products } });

        // Close the chat box
        dispatch(setHelpOpen(false));
    };

    return (
        <div className="chatContainer">
            <h2>AI Text Search</h2>
            <div className="chatMessages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === "user" ? "userMessage" : "aiMessage"}`}
                    >
                        {message.text}
                        {message.link && (
                            <button
                                onClick={() => handleViewSuggestions(message.products)}
                                className="viewSuggestionsButton"
                            >
                                View Suggestions
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="inputContainer">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask something..."
                />
                <button onClick={handleSendMessage}>
                    Send
                </button>
            </div>
            {/*<Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>*/}
            {/*    <div className="productsGrid">*/}
            {/*        {products.map((product, index) => (*/}
            {/*            <ProductCard key={`${product.productId}-${index}`} product={product} />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*    <button onClick={() => setIsModalOpen(false)}>Close</button>*/}
            {/*</Modal>*/}

            {/*{products.length > 0 && (*/}
            {/*    <div className="productsGrid" style={{ width: '90%', padding: '20px' }}>*/}
            {/*        {products.map((product, index) => (*/}
            {/*            <ProductCard key={`${product.productId}-${index}`} product={product} />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default TextSearch;