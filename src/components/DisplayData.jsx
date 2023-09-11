'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Audio } from "react-loader-spinner";
import { FaSearch } from 'react-icons/fa';

const DisplayData = () => {
    const [displayData, setDisplayData] = useState([]);
    const [loading, setLoading] = useState(true); // Initial loading state
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.punkapi.com/v2/beers");
                setDisplayData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when data is fetched or on error
            }
        };

        fetchData();
    }, []);

    // Filter the data based on the search term
    const filteredData = displayData.filter((beer) =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render the loader when loading is true
    if (loading) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <Audio
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            </div>
        );
    }

    // Render the content when loading is false
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Display Data</h1>
            <div className="flex mb-5 p-1 px-3 border border-gray-200 rounded-md items-center gap-4">
                <FaSearch className=" text-blue-500" />
                <input
                    type="text"
                    placeholder="Search by beer name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 outline-none"
                />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10'>
                {filteredData.map((beer) => (
                    <Card
                        key={beer.id}
                        name={beer.name}
                        description={beer.description}
                        image={beer.image_url}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayData;

