import React, { useEffect, useState } from 'react';
import { server } from '../../utils/apiRoutes';
import { Button , ButtonBase, Grid } from '@mui/material';
import XLSXDataUI from '../../components/Measurement';
import XLSX from 'xlsx';

const Reports = () => {
  const [files, setFiles] = useState([]);
  const [xlsxData, setXlsxData] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const viewAndEditXLSXFile = async (file) => {
    try {
      const response = await fetch(`${server}/reports/download/${file}/xlsx`);
      const blob = await response.blob();
  
      // Create a file reader to read the blob data
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        // Do something with the workbook, e.g., display the data in a table
        // Example: const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        //          const jsonData = XLSX.utils.sheet_to_json(worksheet);
        //          setXlsxData(jsonData);
      };
      reader.readAsBinaryString(blob);
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${server}/reports/getfiles`);
      const data = await response.json();
      console.log(data.files);
      setFiles(data.files );
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <Grid container direction="column" spacing={2} sx={{ padding: '24px' }}>
  <Grid item xs={12}>
    <h1>Reports</h1>
  </Grid>
  {/* <XLSXDataUI/> */}
  {files.map((file, index) => (
    <Grid item key={index} xs={12}>
      <div sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <span>{file}</span>
        <div sx={{ marginTop: '16px' }}>
          <ButtonBase
            component="a"
            href={`${server}/reports/convert/${file}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-block',
              textDecoration: 'underline',
              marginRight: '8px',
            }}
          >
            View as PDF
          </ButtonBase>
          <ButtonBase
            component="a"
            href={`${server}/reports/download/${file}/pdf`}
            download
            sx={{
              display: 'inline-block',
              textDecoration: 'underline',
              marginRight: '8px',
            }}
          >
            Download as PDF
          </ButtonBase>
          <ButtonBase
            component="a"
            href={`${server}/reports/download/${file}/xlsx`}
            download
            sx={{
              display: 'inline-block',
              textDecoration: 'underline',
            }}
          >
            Download as XLSX
          </ButtonBase>
   
        </div>
      </div>
    </Grid>
  ))}
</Grid>
 
  );
};

export default Reports;


  // const downloadFile = async (filename, extension) => {
  //   try {
  //     const response = await fetch(`${server}/reports/download/${filename}/${extension}`);
  //     const blob = await response.blob();
  //     const fileUrl = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = fileUrl;
  //     const fname = filename + (extension === 'pdf' ? `.${extension}` : '');
  //     link.setAttribute('download', fname);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const viewFileAsPdf = async (filename) => {
  //   try {
  //     const response = await fetch(`${server}/reports/convert/${filename}`);
  //     const blob = await response.blob();
  //     const pdfUrl = URL.createObjectURL(blob);
  //     window.open(pdfUrl);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

   //   <Grid container direction="column" spacing={2} sx={{ padding: '24px' }}>
  //   <Grid item xs={12}>
  //     <h1>Reports</h1>
  //   </Grid>
  //   {files.map((file, index) => (
  //     <Grid item key={index} xs={12}>
  //       <div sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
  //         <span>{file}</span>
  //         <div sx={{ marginTop: '16px' }}>
  //           <Button variant="contained" onClick={() => viewFileAsPdf(file)}>View as PDF</Button>
  //           <Button variant="contained" onClick={() => downloadFile(file, 'pdf')}>Download as PDF</Button>
  //           <Button variant="contained" onClick={() => downloadFile(file, 'xlsx')}>Download as XLSX</Button>
  //         </div>
  //       </div>
  //     </Grid>
  //   ))}
  // </Grid>

//   const XLSX = require('xlsx');

// const fetchFiles = async () => {
//   try {
//     const response = await fetch(`${server}/reports/getfiles`);
//     const data = await response.json();

//     // Process each file and extract the required information
//     const processedData = [];
//     for (const file of data) {
//       const fileResponse = await fetch(file.url);
//       const fileData = await fileResponse.arrayBuffer();

//       // Read the xlsx file data using xlsx library
//       const workbook = XLSX.read(fileData, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//       // Process the sheetData and extract the required information
//       // For simplicity, let's assume the data is in the first row of the sheet
//       const rowData = sheetData[0];
//       const processedRow = {
//         name: rowData.Name,
//         length: rowData.Length,
//         min_tolerence: rowData.Min_Tolerance,
//         max_tolerence: rowData.Max_Tolerance,
//       };

//       // Add the processed row to the final processed data
//       processedData.push(processedRow);
//     }

//     console.log(processedData);
//     setFiles(processedData);
//   } catch (error) {
//     console.error(error);
//   }
// };
