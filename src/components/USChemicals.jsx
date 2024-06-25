import "../css/chemical-distribution-us.7b7966cfa0dc9a8a325a.css"
import "../css/global.72fedcb701581cba84c5.css"

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { dataref } from "../firebase";

const USChemicals = () => {
const [data, setData] = useState([]);
const [headers, setHeaders] = useState([]);
const [markets, setMarkets] = useState([]);
const [suppliers, setSuppliers] = useState([]);
const [selectedSuppliers, setSelectedSuppliers] = useState(new Set());
const [selectedMarkets, setSelectedMarkets] = useState(new Set());
const [searchTerm, setSearchTerm] = useState('');
const [selectedAlphabet, setSelectedAlphabet] = useState('');

useEffect(()=>{
  const retrieveData = () => {
    dataref.ref("data/data").once("value", (snapshot) => {
      const retrievedData = snapshot.val();
      console.log(retrievedData);
      const data = retrievedData;
      setHeaders(Object.keys(data[0]));
      setData(data);
      console.log(data[0])

      const uniqueMarkets = new Set();
      const uniqueSuppliers = new Set();

      data.forEach((row) => {
        if (row["Market Segments"]) {
          const segments = row["Market Segments"].split(",").map(segment => segment.trim());
          segments.forEach((segment) => {
            const trimmedSegment = segment.trim();
            if (trimmedSegment) {
              uniqueMarkets.add(trimmedSegment);
            }
          });
        }

        if (row["Supplier"]) {
          const segments = row["Supplier"].split(",").map(segment => segment.trim());
          segments.forEach((segment) => {
            const trimmedSegment = segment.trim();
            if (trimmedSegment) {
              uniqueSuppliers.add(trimmedSegment);
            }
          });
        }
      });

      setMarkets(Array.from(uniqueMarkets));
      setSuppliers(Array.from(uniqueSuppliers));  
      // If you want to use the retrieved data in your application
      // you can update your state or perform other operations here
      // setData(retrievedData);
    }).catch((error) => {
      console.error("Error retrieving data: ", error);
    });
  }
  
  // Call the function to retrieve data
  retrieveData();
},[])

const handleFileUpload = (event) => {
  const file = event.target.files[0];

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      const data = result.data;
      setHeaders(Object.keys(data[0]));
      setData(data);
      console.log(data[0])

      const uniqueMarkets = new Set();
      const uniqueSuppliers = new Set();

      data.forEach((row) => {
        if (row["Market Segments"]) {
          const segments = row["Market Segments"].split(",").map(segment => segment.trim());
          segments.forEach((segment) => {
            const trimmedSegment = segment.trim();
            if (trimmedSegment) {
              uniqueMarkets.add(trimmedSegment);
            }
          });
        }

        if (row["Supplier"]) {
          const segments = row["Supplier"].split(",").map(segment => segment.trim());
          segments.forEach((segment) => {
            const trimmedSegment = segment.trim();
            if (trimmedSegment) {
              uniqueSuppliers.add(trimmedSegment);
            }
          });
        }
      });

      setMarkets(Array.from(uniqueMarkets));
      setSuppliers(Array.from(uniqueSuppliers));
    },
  });
};

const handleSupplierChange = (supplier) => {
  setSelectedSuppliers((prevSelectedSuppliers) => {
    const newSelectedSuppliers = new Set(prevSelectedSuppliers);
    if (newSelectedSuppliers.has(supplier)) {
      newSelectedSuppliers.delete(supplier);
    } else {
      newSelectedSuppliers.add(supplier);
    }
    return newSelectedSuppliers;
  });
};

const handleMarketChange = (market) => {
  setSelectedMarkets((prevSelectedMarkets) => {
    const newSelectedMarkets = new Set(prevSelectedMarkets);
    if (newSelectedMarkets.has(market)) {
      newSelectedMarkets.delete(market);
    } else {
      newSelectedMarkets.add(market);
    }
    return newSelectedMarkets;
  });
};

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

const handleAlphabetChange = (alphabet) => {
  setSelectedAlphabet(alphabet);
};

const filteredData = data.filter((row) => {
  // Filter by selected suppliers
  if (selectedSuppliers.size > 0 && row["Supplier"]) {
    const supplierSegments = row["Supplier"].split(",").map(segment => segment.trim());
    const supplierMatch = supplierSegments.some((segment) =>
      selectedSuppliers.has(segment)
    );
    if (!supplierMatch) {
      return false;
    }
  }

  // Filter by selected markets
  if (selectedMarkets.size > 0 && row["Market Segments"]) {
    const marketSegments = row["Market Segments"].split(",").map(segment => segment.trim());
    const marketMatch = marketSegments.some((segment) =>
      selectedMarkets.has(segment)
    );
    if (!marketMatch) {
      return false;
    }
  }

  // Filter by search term in CAS Number or Name
  if (searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    if (
      !(
        (row["CAS Number"] && row["CAS Number"].toLowerCase().includes(searchTermLower)) 
        // (row["Product Name"] && row["Product Name"].toLowerCase().includes(searchTermLower))
      )
    ) {
      return false;
    }
  }

  // Filter by selected alphabet
  if (selectedAlphabet && !row["Product Name"].toLowerCase().startsWith(selectedAlphabet.toLowerCase())) {
    return false;
  }

  return true;
});

// Function to generate array of alphabets A-Z
const alphabets = Array.from(Array(26)).map((_, index) => String.fromCharCode(65 + index));

  return (
    <div>
     <div class="search-bar highlighted-nav">
      <div class="search-container container">
        <input type="text" class="search-box" placeholder="Search..." />
        <button class="search-button">
          <img src="img/icons/search.svg" alt="" />
        </button>
        {/* <h2>Upload CSV File</h2> */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      
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
                      <a href="#" class="nav-link">EMCO Chemical (Canada)</a>
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
          <img class="logo" src="img/logo-full.svg" alt="" />
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
        class="shared-section overflow-hidden chemical-distribution-section"
      >
        <div class="container">
          <div class="shared-heading">
            <p class="paragraph">
              Zero-defect products and on-time delivery. That’s the standard of
              excellence we strive for with every product we distribute. It’s
              our business to help you build your business, bringing you the
              chemical products you need, when you need them.
            </p>
          </div>
          <div class="products-section">
            <div class="side-menu">
              <div class="side-menu-section">
                <p class="title">Search Products:</p>
                <p class="paragraph">Enter Name or CAS Number</p>
                <div class="search-side-bar">
                <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
                  <button class="search-button">
                    <img src="img/icons/search.svg" alt="" />
                  </button>
                </div>
              </div>
              <div class="side-menu-section">
                <div class="title-row">
                  <div class="title">Sort By:</div>
                  <a href="#">Clear All</a>
                </div>
                <div class="alphabet-container">
                <div class="form-options">
                {alphabets.map((alphabet, index) => (
            <div className="form-option" key={index}>
              <input
                type="radio"
                name="reference"
                id={alphabet.toLowerCase()}
                checked={selectedAlphabet === alphabet}
                onChange={() => handleAlphabetChange(alphabet)}
              />
              <label htmlFor={alphabet.toLowerCase()}>{alphabet}</label>
            </div>
          ))}
          </div>
          </div>
                
              </div>
              <div class="side-menu-section">
                <p class="title">Markets</p>
                <div class="markets-options">
                  <div class="form-options">
                  {markets.map((market, index) => (
            <div className="form-option" key={index}>
              <input
                type="checkbox"
                name="services"
                id={`market-${index}`}
                onChange={() => handleMarketChange(market)}
              />
              <label htmlFor={`market-${index}`}>{market}</label>
            </div>
          ))}
                     </div>
                </div>
              </div>
              <div class="side-menu-section">
                <p class="title">Suppliers</p>
                <div class="markets-options">
                  <div class="form-options">
                  {/* {suppliers.length > 0 && suppliers.map(m=> */}
                    {suppliers.map((supplier, index) => (
            <div className="form-option" key={index}>
              <input
                type="checkbox"
                name="services"
                id={`supplier-${index}`}
                onChange={() => handleSupplierChange(supplier)}
              />
                    
                  <label htmlFor={`supplier-${index}`}>{supplier}</label>
            </div>
          ))}
                  </div>
                </div>
              </div>
              <div class="side-menu-section">
                <div class="link-row"><a href="#">Clear All</a></div>
              </div>
            </div>
            <div class="product-form-container">
              <div class="products-table">
                <div class="table-heading">
                  <div class="heading-content">
                    <div class="title"><p>Name</p></div>
                    <div class="suppliers"><p>Suppliers</p></div>
                    <div class="markets"><p>Markets</p></div>
                    <div class="form-option">
                      <p>Select Product(s)</p>
                      <span>(Then click Request Info)</span>
                    </div>
                  </div>
                </div>
                <form class="table-rows">
              
      {filteredData.length > 0 && (
        <div className="table-container">
          <form className="table-rows">
            {filteredData.map((m, index) => (
              <div className="table-row" key={index}>
                <div className="collapsible">
                  <div className="static-content">
                    <div className="title">
                      <span className="text">{m["Product Name"]}</span>
                      <span className="arrow">
                        <img src="img/distribution-us/arrow-expand.svg" alt="" />
                      </span>
                    </div>
                    <div className="suppliers">
                      <p>{m.Supplier}</p>
                    </div>
                    <div className="markets"><p>{m["Market Segments"]}</p></div>
                    <div className="form-option">
                      <input
                        type="checkbox"
                        name="services"
                        id={`product-${index}`}
                      />
                      <label className="d-none" htmlFor={`product-${index}`}>
                        Product {index + 1}
                      </label>
                    </div>
                  </div>
                  <div className="expandable-content">
                    <p>{m.Description}</p>
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      )}
            
                
                </form>
              </div>
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
    
    </div>
  )
}

export default USChemicals
