import React, { useEffect, useState } from 'react'
import "../../css/chemical-distribution-us-second-part.4f072200db23f00ee071.css"

const SecondPage = () => {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    console.log(products)
    },[])
    
  return (
    <>
      <div class="search-bar highlighted-nav">
      <div class="search-container container">
        <input type="text" class="search-box" placeholder="Search..." />
        <button class="search-button">
          <img src="img/icons/search.svg" alt="" />
        </button>
      </div>
    </div>
    <header>
      <nav class="navbar">
        <div class="container">
          <div class="navbar-header">
            <a href="index.html" class="navbar-brand highlighted-nav">
              <img
                src="img/logo.svg"
                srcset="img/logo.svg 77w, img/logo.svg 144w"
                sizes="(max-width: 767px) 77px, 144px"
                alt="Family Industries"
              />
            </a>
            <button type="button" class="navbar-menu-toggler">
              <span></span> <span></span> <span></span>
            </button>
          </div>
          <div class="navbar-menu">
            <ul class="navbar-nav">
              <div class="highlighted-nav">
                <li class="nav-item highlighted active dropdown">
                  <a
                    href=""
                    class="nav-link dropdown-toggle"
                    id="chemicalDropdown"
                    >Chemical<br class="hide_mobile" />
                    Distribution</a
                  >
                  <ul class="dropdown-menu" aria-labelledby="chemicalDropdown">
                    <li class="dropdown-item">
                      <a href="chemical-distribution-us.html" class="nav-link"
                        >EMCO Chemical (US)</a
                      >
                    </li>
                    <li class="dropdown-item">
                      <a
                        href="chemical-distribution-canada.html"
                        class="nav-link"
                        >EMCO Chemical (Canada)</a
                      >
                    </li>
                  </ul>
                </li>
                <li class="nav-item highlighted">
                  <a href="chemical-packaging.html" class="nav-link"
                    >Chemical<br class="hide_mobile" />Packaging</a
                  >
                </li>
                <li class="nav-item highlighted">
                  <a href="environmental-services.html" class="nav-link"
                    >Environmental<br class="hide_mobile" />Services</a
                  >
                </li>
              </div>
              <li>
                <ul class="nav-sub">
                  <li class="nav-item">
                    <a href="sustainability.html" class="nav-link"
                      >Sustainability</a
                    >
                  </li>
                  <li class="nav-item">
                    <a href="north-american.html" class="nav-link"
                      >North American CASE/<br class="hide_mobile" />Composites
                      App Lab</a
                    >
                  </li>
                  <li class="nav-item">
                    <a href="about-us.html" class="nav-link">About Us</a>
                  </li>
                  <li class="nav-item">
                    <a href="contact-us.html" class="nav-link">Contact Us</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <section class="shared-hero section-chemical-distribution">
        <div class="decor">
          <img class="colors" src="img/distribution-us/hero-us.jpg" alt="" />
        </div>
        <div class="logo">
          <img class="logo" src="img/distribution-us/logo-us-prod.svg" alt="" />
        </div>
        <div class="container">
          <div class="shared-hero-layout">
            <div class="shared-hero-content">
              <div class="shared-hero-text">
                <h1 class="heading">US Products</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        class="shared-section overflow-hidden chemical-distribution-section-2"
      >
        <div class="container">
          <div class="shared-heading">
            <p class="paragraph">
              Zero-defect products and on-time delivery. That’s the standard of
              excellence we strive for with every product we distribute. It’s
              our business to help you build your business, bringing you the
              chemical products you need, when you need them.
            </p>
            <a href="/"
              >&lt; Back to Search Results</a
            >
          </div>
          <div class="step-one">
            <p class="step-title">
              <span>Step 1:</span> Choose Information for Selected Products:
            </p>
            <div class="products-table">
              <div class="table-heading">
                <div class="heading-content">
                  <div class="title"><p></p></div>
                  <div class="form-option"><p>Safety Data Sheet (SDS)</p></div>
                  <div class="form-option">
                    <p>Technical Data Sheet (SDS)</p>
                  </div>
                  <div class="form-option"><p>Sample</p></div>
                  <div class="form-option"><p>Quote</p></div>
                  <div class="form-option"><p>Other</p></div>
                </div>
              </div>
              <div class="table-rows">
              {products.length > 0 && products.map(m=>
                <div class="table-row">
                  <div class="static-content">
                    <div class="title"><p>{m}</p></div>
                    <div class="form-option">
                      <input
                        type="checkbox"
                        name="product-1"
                        id="product-1-sds"
                      />
                      <label for="product-1-sds">Safety Data Sheet (SDS)</label>
                    </div>
                    <div class="form-option">
                      <input
                        type="checkbox"
                        name="product-1"
                        id="product-1-tds"
                      />
                      <label for="product-1-tds"
                        >Technical Data Sheet (SDS)</label
                      >
                    </div>
                    <div class="form-option">
                      <input
                        type="checkbox"
                        name="product-1"
                        id="product-1-sample"
                      />
                      <label for="product-1-sample">Sample</label>
                    </div>
                    <div class="form-option">
                      <input
                        type="checkbox"
                        name="product-1"
                        id="product-1-quote"
                      />
                      <label for="product-1-quote">Quote</label>
                    </div>
                    <div class="form-option">
                      <input
                        type="checkbox"
                        name="product-1"
                        id="product-1-other"
                      />
                      <label for="product-1-other">Other</label>
                    </div>
                  </div>
              
                
              </div>
            )}
            </div>
          </div>
          <div class="step-two">
            <p class="step-title">
              <span>Step 2:</span> Fill in Your Contact Information:
            </p>
            <form class="product-form">
              <div class="form-container">
                <div class="info">
                  <div class="form-row">
                    <label for="name">Name*</label>
                    <input type="text" name="info" id="name" required />
                  </div>
                  <div class="form-row">
                    <label for="company">Company*</label>
                    <input type="text" name="info" id="company" required />
                  </div>
                  <div class="form-row">
                    <label for="email">Name*</label>
                    <input
                      type="email"
                      name="info"
                      id="email"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div class="form-row">
                    <label for="tel">Phone Number</label>
                    <input
                      type="tel"
                      name="info"
                      placeholder="###-###-####"
                      id="tel"
                    />
                  </div>
                </div>
                <div class="message">
                  <label for="message">Message</label>
                  <textarea
                    name="comment"
                    rows="4"
                    id="message"
                    placeholder="If you selected “Other” or have any more questions we can help with."
                  ></textarea>
                </div>
              </div>
              <div class="buttons">
                <button type="submit" class="btn btn-primary">Submit ></button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </section>
    </main>
    <footer>
      <div class="container">
        <div class="footer-layout">
          <div class="footer-columns">
            <div class="column">
              <ul class="footer-links">
                <li><p>8601 – 95th Street, Pleasant Prairie, WI 53158</p></li>
              </ul>
            </div>
            <div class="column">
              <ul class="footer-links">
                <li><a href="#">Chemical Distribution</a></li>
                <li><a href="#">Chemical Packaging</a></li>
                <li><a href="#">Environmental Services</a></li>
              </ul>
            </div>
            <div class="column">
              <ul class="footer-links">
                <li><a href="#">Sustainability</a></li>
                <li><a href="#">North American CASE Composites App Lab</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div class="column">
              <p class="footer-title">Let's connect</p>
              <ul class="footer-links">
                <li>
                  <a class="icon-link" href="tel:262-427-0400">
                    <img src="img/icons/phone.svg" alt="" />
                    <p>262-427-0400</p>
                  </a>
                </li>
                <li>
                  <a class="icon-link" href="mailto:info@emcochem.com">
                    <img src="img/icons/email.svg" alt="" />
                    <p>info@emcochem.com</p>
                  </a>
                </li>
                <li>
                  <a class="icon-link" href="#">
                    <img src="img/icons/linkedin.svg" alt="" />
                    <p>Linkedin</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="footer-copyright">
              <p class="paragraph">
                © 2024 EMCO Chemical Distributors, Inc. All rights reserved.
              </p>
            </div>
            <ul class="footer-links-2">
              <li><a href="#">Terms and Conditions of Sale</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Biometric Information Security Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer> 
    </>
  )
}

export default SecondPage
