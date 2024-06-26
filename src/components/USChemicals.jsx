import "../css/chemical-distribution-us.311e96ac7f7ff151b1d8.css"
import "../css/global.126a840c714e48337891.css"

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { dataref } from "../firebase";
import { useNavigate } from "react-router-dom";

const USChemicals = () => {
const [data, setData] = useState([]);
const [headers, setHeaders] = useState([]);
const [markets, setMarkets] = useState([]);
const [suppliers, setSuppliers] = useState([]);
const [selectedSuppliers, setSelectedSuppliers] = useState(new Set());
const [selectedMarkets, setSelectedMarkets] = useState(new Set());
const [selectedProducts, setSelectedProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [selectedAlphabet, setSelectedAlphabet] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const navigate = useNavigate()

// Calculate total pages

useEffect(()=>{
  const retrieveData = () => {
    dataref.ref("data/data").once("value", (snapshot) => {
      const retrievedData = snapshot.val();
      console.log(retrievedData);
     
      const data = retrievedData;
     if(data){
      setHeaders(Object?.keys(data[0]));
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
    }
    }).catch((error) => {
      console.error("Error retrieving data: ", error);
    });
  }
  
  
  // Call the function to retrieve data
  retrieveData();
},[])

const collectProducts = async() =>
  {
    await localStorage.setItem("products",JSON.stringify(selectedProducts))
    navigate("/request-info")
  } 
const handleProductChange = (productName) => {
  setSelectedProducts((prevSelectedProducts) => {
    if (prevSelectedProducts.includes(productName)) {
      // Remove product if already selected
      return prevSelectedProducts.filter((product) => product !== productName);
    } else {
      // Add product if not already selected
      return [...prevSelectedProducts, productName];
    }
  });
};
const resetSuppliersAndMarkets = () =>{
  setSelectedMarkets(new Set());
  setSelectedSuppliers(new Set())
}

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
        (row["Market Segments"] && row["Market Segments"].toLowerCase().includes(searchTermLower)) ||
        (row["CAS Number"] && row["CAS Number"].toLowerCase().includes(searchTermLower)) ||
        (row["Product Name"] && row["Product Name"].toLowerCase().includes(searchTermLower)) ||
        (row["Supplier"] && row["Supplier"].toLowerCase().includes(searchTermLower)) 
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
const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// Slice data for current page
const currentData = filteredData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

// Handle change in page
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

// Handle change in items per page
const handleItemsPerPageChange = (event) => {
  setItemsPerPage(Number(event.target.value));
  setCurrentPage(1); // Reset to first page
};
const handlePreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};
const generatePaginationDots = () => {
  const dots = [];
  const maxDots = 4;

  let startPage = Math.max(1, currentPage - Math.floor(maxDots / 2));
  let endPage = startPage + maxDots - 1;

  // Adjust if endPage exceeds totalPages
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxDots + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    dots.push(
      <div
        key={i}
        className={`pagination-dot ${i === currentPage ? 'active' : ''}`}
        onClick={() => handlePageChange(i)}
      ></div>
    );
  }

  return dots;
};


const clearAlphabet = () =>
  {
    setSelectedAlphabet('')
  }
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
              <div class="side-menu-section alphabetical">
                <div class="title-row">
                  <div class="title">Sort By:</div>
                  <a class="clear-alpha" onClick={clearAlphabet}>Clear All</a>
                </div>
                <div class="alphabet-container">
                  <div class="form-options">
                  {alphabets && alphabets.map((alphabet, index) => (
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
              <div class="side-menu-section markets">
                <p class="title">Markets</p>
                <div class="markets-options">
                  <div class="form-options">
                  {markets && markets.map((market, index) => (
             <div className="form-option" key={index}>
               <input
                 type="checkbox"
                 name="services"
                 id={`market-${index}`}
                 checked={selectedMarkets.has(market)}
                 onChange={() => handleMarketChange(market)}
               />
               <label htmlFor={`market-${index}`}>{market}</label>
             </div>
           ))}
                   </div>
                </div>
              </div>
              <div class="side-menu-section suppliers">
                <p class="title">Suppliers</p>
                <div class="markets-options">
                  <div class="form-options">
                     {suppliers && suppliers.map((supplier, index) => (
             <div className="form-option" key={index}>
               <input
                 type="checkbox"
                 name="services"
                 id={`supplier-${index}`}
                 checked={selectedSuppliers.has(supplier)}
                 onChange={() => handleSupplierChange(supplier)}
               />
                    
                   <label htmlFor={`supplier-${index}`}>{supplier}</label>
             </div>
           ))}
                  </div>
                </div>
              </div>
              <div class="side-menu-section">
                <div class="link-row"><a onClick={resetSuppliersAndMarkets}>Clear All</a></div>
              </div>
            </div>
            {/* <button id="openModalButton" class="open-modal-button">
              Filter
            </button> */}
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
                <form className="table-rows"
                 action="chemical-distribution-us-second-part">
           
                   {filteredData.length > 0 && (
         <div className="table-container">
           <form className="table-rows">
           {filteredData.length > 0 && (
        <div className="table-container">
          <form className="table-rows">
            {currentData.map((m, index) => (
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
                    <div className="markets">
                      <p>{m["Market Segments"]}</p>
                    </div>
                    <div className="form-option">
                      <input
                        type="checkbox"
                        name="services"
                        id={`product-${index}`}
                        onChange={() => handleProductChange(m["Product Name"])}
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

      <div className="table-footer">
        <div className="pagination">
          <div className="results">
            <p>
              {filteredData.length > 0
                ? `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
                    currentPage * itemsPerPage,
                    filteredData.length
                  )} of ${filteredData.length} results`
                : "No results"}
            </p>
          </div>
          <div className="selector-container">
            <select
              id="per-page"
              name="per-page"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={selectedProducts.length < 1} onClick={collectProducts} className="btn btn-primary">
          Request Info &gt;
        </button>
      </div>  </form>
         </div>
       )}
       
                
                 </form>
    
                  
                 <div className="table-pagination">
          <a
            className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePreviousPage}
          >
            <p>&lt; Previous</p>
          </a>
          <div className="pagination-dots">
            {generatePaginationDots()}
          </div>
          <a
            className={`pagination-btn ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={handleNextPage}
          >
            <p>Next &gt;</p>
          </a>
        </div>
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
    </>
  )
}

export default USChemicals
