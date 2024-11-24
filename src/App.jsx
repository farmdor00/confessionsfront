import { useState, useEffect } from 'react';
import Confession from './Components/Confession';
import Add from './Components/Add';

function App() {
  const [confessions, setConfessions] = useState([]);
  const [showAdd, setshowAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);  

  
  async function getConfessions() {
    if (loading) return;  

    setLoading(true);  
    try {
      const res = await fetch(`https://confessions-backend.vercel.app/confessions?page=${currentPage}`);
      const data = await res.json();
      setConfessions((prevConfessions) => [...prevConfessions, ...data.confessions]);  
    } catch (error) {
      console.error('Failed to fetch confessions:', error);
    } finally {
      setLoading(false);  
    }
  }

  
  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);  
    }
  };

  useEffect(() => {
    getConfessions();  
  }, []);  

  useEffect(() => {
    getConfessions();  
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);  
    return () => {
      window.removeEventListener('scroll', handleScroll);  
    };
  }, [loading]);  

  return (
    <>
      <header className="z-30 text-center text-3xl m-auto fixed w-full p-5 bg-neutral-900 text-purple-500">
        <h1>UVCE CONFESSIONS</h1>
      </header>
      <div className="py-24 p-8 sm:p-24 flex flex-col items-center">
        {showAdd ? (
          <Add closeAdd={() => setshowAdd(false)}></Add>
        ) : (
          <button
            type="button"
            className="focus:outline-none w-full sm:w-[200px] text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-6 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={() => setshowAdd(true)}
          >
            Add Confession
          </button>
        )}

        <div id="confessions" className="flex flex-wrap justify-center gap-4 w-full">
          {confessions.length > 0 ? (
            confessions.map((confession) => (
              <Confession key={confession._id} text={confession.text} createdAt={confession.createdAt} likes={confession.likes} />
            ))
          ) : (
            ''
          )}
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <span className="loader">Loading...</span>
          </div>
        )}

        
      </div>
    </>
  );
}

export default App;
