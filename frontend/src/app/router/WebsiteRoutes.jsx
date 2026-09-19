import React from 'react';
import { Route } from 'react-router-dom';
import WebsiteLayout from '../../layouts/WebsiteLayout/WebsiteLayout';
import Home from '../../pages/website/Home/Home';
import About from '../../pages/website/About/About';
import Services from '../../pages/website/Services/Services';
import Contact from '../../pages/website/Contact/Contact';
import Login from '../../pages/website/Login/Login';

export const WebsiteRoutes = (
  <Route element={<WebsiteLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="services" element={<Services />} />
    <Route path="contact" element={<Contact />} />
    <Route path="login" element={<Login />} />
  </Route>
);

export default WebsiteRoutes;

