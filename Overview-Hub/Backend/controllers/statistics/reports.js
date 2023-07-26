const path = require('path');
const fs = require('fs');
const XlsxPopulate = require('xlsx-populate');
const { PDFDocument , StandardFonts} = require('pdf-lib');

const convertToPdf = async (req, res) => {
  const xlsxFolderPath = path.join(__dirname, '../../../public/xlsxs');
  const pdfFolderPath = path.join(__dirname, '../../../public/pdfs');
  const { filename } = req.params;
  const filePath = path.join(xlsxFolderPath, filename);
  const pdfPath = path.join(pdfFolderPath, `${filename}.pdf`);

  try {
   // wait for the file reading operation to complete and assign the resulting workbook object to the workbook variable.
    const workbook = await XlsxPopulate.fromFileAsync(filePath);
    //creates a new PDF document
    const pdfDoc = await PDFDocument.create();
    //embeds the StandardFonts.Helvetica font into the PDF document using pdfDoc.embedFont
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    workbook.sheets().forEach((sheet) => {
      //retrieves the used range of cells and assigns the resulting CSV data to the csvData variable.
      const csvData = sheet.usedRange().value();
      
      const textPage = pdfDoc.addPage();//adds a new page to the PDF document 
      const { width, height } = textPage.getSize();//retrieves the page size
      const margin = 50;////distance between the text and the page edges
      const startY = height - margin;//initial Y-coordinate for drawing the text.

      let currentY = startY;
      const rowHeight = 20;

      csvData.forEach((row) => {// iterates over each row 
        let currentX = margin;

        row.forEach((value, columnIndex) => {//terates over each cell value
          const cellText = String(value);
          textPage.drawText(cellText, {//draw the cellText at the specified position (x, y) 
            x: currentX,
            y: currentY,
            font: helveticaFont,
            size: 8,
          });
          currentX += 60;// incremented to adjust the horizontal position for the next cell in the row.
        });

        currentY -= rowHeight;//adjust the vertical position for the next row.
      });
    });

    const pdfBytes = await pdfDoc.save();//generate the PDF document as a byte array 
    fs.writeFileSync(pdfPath, pdfBytes);//writes the PDF byte array to the specified PDF file 
    res.sendFile(pdfPath, { headers: { 'Content-Type': 'application/pdf' } });

  } catch (error) {
    console.error("Failed to convert: " + error);
    return res.status(500).json({ error: 'Failed to convert file to PDF' });
  }
};

  
const getFiles = (req, res) => {
  const xlsxFolderPath = path.join(__dirname, '../../../public/xlsxs');

  fs.readdir(xlsxFolderPath, async (err, files) => {
    if (err) {
      console.error("failed to getfiles " + err);
      return res.status(500).json({ error: 'Failed to fetch files' });
    }
    const processedData = [];
    for (const file of files){
      const filePath = path.join(xlsxFolderPath, file);
      const workbook = await XlsxPopulate.fromFileAsync(filePath);

      //your code here 
      const sheet = workbook.sheet(0); // Assuming data is in the first sheet
      const data = await sheet.usedRange().value();
      let headers = data[0];
      const rows = sheet.usedRange().value();
        rows.slice(1).forEach(rowData => { // Start from the second row (excluding headers)
          const processedRow = {};
          rowData.forEach((value, index) => {
            processedRow[headers[index]] = value;
          });
          processedData.push(processedRow);
        });
    }
    res.json({files , processedData});
  });
};

const downloadFile = (req, res) => {
  const { filename, extension } = req.params;
  const folderPath = path.join(__dirname, `../../../public/${extension}s`);
  const filePath = path.join(folderPath, filename + (extension === 'pdf' ? `.${extension}` : ''));
  const contentType = getContentType(extension);

  try {
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.${extension}`);
    res.setHeader('Content-Type', contentType);

    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error('Failed to download: ', error);
    return res.status(500).json({ error: 'Failed to download file' });
  }
};


const getContentType = (extension) => {
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    default:
      return 'application/octet-stream';
  }
};


module.exports = {
  getFiles,
  convertToPdf,
  downloadFile,
};
