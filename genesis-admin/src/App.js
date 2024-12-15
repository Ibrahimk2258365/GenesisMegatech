import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ContentManager from './components/ContentManager';
import Dashboard from './components/Dashboard';
import User from './components/User';
import Register from './components/Register';
import Login from './components/Login';
import FAQForm from './components/FAQs';
import AboutForm from './components/About';
import TeamMemberForm from './components/TeamMemberForm';
import ProjectForm from './components/project';
import ProjectList from './components/ProjectList';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const App = () => {
  return (
    <Routes>
      {/* Admin Authentication Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        {/* Default Route to User Component */}
        <Route index element={<User />} />

        {/* Nested Routes for Dashboard */}
        <Route path="user" element={<User />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="register" element={<Register />} />
        <Route path="faqs" element={<FAQForm />} />
        <Route path="about" element={<AboutForm />} />
        <Route path="team" element={<TeamMemberForm />} />
        <Route path="project" element={<ProjectForm />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/:id" element={<ProjectForm />} />
      </Route>
    </Routes>
  );
};

export default App;
