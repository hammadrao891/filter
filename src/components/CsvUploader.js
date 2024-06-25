// src/components/CsvUploader.js

import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvUploader = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setHeaders(Object.keys(result.data[0]));
        setData(result.data);
      },
    });
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={`${index}-${header}`}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CsvUploader;
