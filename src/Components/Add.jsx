import React, { useState } from 'react';

const Add = ({ closeAdd }) => {
    const [confess, setConfession] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    
    const handleInputChange = (event) => {
        setConfession(event.target.value);
    };

    
    const handleSubmit = async () => {
        setIsLoading(true); 
        try {
            const response = await fetch('http://localhost:5000/confessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: confess }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Confession added successfully');
                setConfession(''); 
                closeAdd(); 
            } else {
                alert(data.message || 'Error adding confession');
            }
        } catch (error) {
            console.error('Error posting confession:', error);
            alert('Failed to post confession');
        } finally {
            setIsLoading(false); 
        }
        window.location.reload()
    };

    return (
        <div className="flex flex-col items-center transition-all p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto m-2 w-full sm:w-[400px] relative">
            <p className='absolute left-3 top-2 text-lg' onClick={closeAdd}>&#10005;</p>
            <h5 className="mb-2 w-full text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center border-b pb-2">
                ADD CONFESSION
            </h5>
            <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={confess}
                onChange={handleInputChange} 
            />
            <p>Even the developer will not know your identity. So, feel free to confess.</p>

            {}
            {isLoading ? (
                <div className="flex justify-center items-center mt-4">
                    <div className="w-8 h-8 border-4 border-t-4 border-purple-700 rounded-full animate-spin"></div>
                </div>
            ) : (
                <button
                    type="button"
                    className="focus:outline-none w-full m-3 sm:w-[200px] text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-6 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    onClick={handleSubmit} 
                >
                    Add Confession
                </button>
            )}
        </div>
    );
};

export default Add;
