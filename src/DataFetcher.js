import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetcher = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://openlibrary.org/search.json', {
          params: {
            q: query || undefined, // Use undefined if query is empty
            page: page,
          },
        });

        if (Array.isArray(response.data.docs)) {
          setData(response.data.docs);
        } else {
          setData([]);
          setError(new Error('Invalid data format'));
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, query]);

  useEffect(() => {
    // Fetch data without a search query on initial load
    if (query === '') {
      const fetchInitialData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get('https://openlibrary.org/search.json', {
            params: {
              page: page,
            },
          });

          if (Array.isArray(response.data.docs)) {
            setData(response.data.docs);
          } else {
            setData([]);
            setError(new Error('Invalid data format'));
          }
        } catch (error) {
          setError(error);
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchInitialData();
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return children({ data, page, handlePageChange, handleSearch });
};

export default DataFetcher;


