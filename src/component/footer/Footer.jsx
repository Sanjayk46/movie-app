import React from 'react';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandX, IconBrandYoutube } from '@tabler/icons-react';
import './Footer.css';

export default function Footer() {
  return (
   
    <div className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <ul className="footer-links-left">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Speed Test</a></li>
          </ul>
          <ul className="footer-links-center">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Account</a></li>
            <li><a href="#">Media Center</a></li>
            <li><a href="#">Jobs</a></li>
          </ul>
          <ul className="footer-links-right">
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-socials">
          <a href="#" className="social-icon"><IconBrandYoutube size={30} /></a>
          <a href="#" className="social-icon"><IconBrandFacebook size={30} /></a>
          <a href="#" className="social-icon"><IconBrandX size={30} /></a>
          <a href="#" className="social-icon"><IconBrandInstagram size={30} /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p >@ 2024 Netflix, Developed by Sanjay K</p>
      </div>
    </div>
  );
}
