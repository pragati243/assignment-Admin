
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import DataFetcher from './DataFetcher';
import BookTable from './BookTable';
import SignInPage from './SignInPage'; // Ensure this component exists and is correctly imported

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/"
          element={
            <SignedIn>
              <DataFetcher>
                {({ data, page, handlePageChange,handleSearch }) => (
                  <BookTable data={data} page={page} handlePageChange={handlePageChange} handleSearch={handleSearch} />
                )}
              </DataFetcher>
            </SignedIn>
          }
        />
        <Route
          path="*"
          element={
            <SignedOut>
              <SignInPage />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

