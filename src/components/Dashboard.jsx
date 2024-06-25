// import "./App.css";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { dataref } from "../firebase";
import Papa from 'papaparse';

function App() {
  const sanitizeKey = (key) => {
    // Replace empty strings with a placeholder like "empty_key"
    if (!key) {
      return "empty_key";
    }
    // Replace invalid characters with an underscore
    return key.replace(/[.#$/\[\]]/g, "_");
  }
  const deleteAllData = () => {
    dataref.ref().remove()
      .then(() => {
        // alert("Previous data deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  }
  const handleFileUpload = (event) => {
    deleteAllData()
    const file = event.target.files[0];
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data;
  
        // Sanitize the keys in the data
        const sanitizedData = data.map(item => {
          const sanitizedItem = {};
          for (const key in item) {
            const sanitizedKey = sanitizeKey(key);
            sanitizedItem[sanitizedKey] = item[key];
          }
          return sanitizedItem;
        });
  
        // console.log(sanitizedData);
  
        // Save the sanitized data to Firebase
        dataref.ref("data").set(
          {
            data: sanitizedData
          }
          
        );
        alert("New Data Saved Successfully")
      }
    });
  }
  

  return (
    <div className="App">
      <div class="search-bar highlighted-nav">
      <div class="search-container container">
        
        <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      
      </div>
    </div>
    
    </div>
  );
}

export default App;