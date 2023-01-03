import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Portfolio from './components/Portfolio';
import Login from './pages/LoginandSignup/Login';
import Signup from './pages/LoginandSignup/Signup'
import Favorites from './pages/SavedLesson';
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({

  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (

    <ApolloProvider client={client}>
      <Router>
        <>
        <Header />
          <Navbar />
          <hr />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
              <Route
              path="/savedlesson"
              element={<Favorites />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='*'
              element={<h1>Wrong page!</h1>}
            />

          </Routes>
          <hr />
          <Portfolio /> 
          <Footer />
        </>
    
      </Router>
     
    </ApolloProvider>
  );
}

export default App;
