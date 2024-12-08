import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';
import FAQs from './components/FAQs';
import Header from './components/Header';
import './App.css'
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          
          {/* Define dashboard routes and nested routes */}
          
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
