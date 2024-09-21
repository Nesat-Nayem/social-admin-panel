import { saveAs } from 'file-saver';

export const arrayToCSV = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return ''; // Return empty string if data array is empty or not an array
  }
  // Extract header row from the first object in the array (assuming all objects have the same keys)
  const headers = Object.keys(arr[0]);

  // Create the CSV content with header row followed by data rows
  const csvContent = [
    headers.join(','), // Header row
    ...arr.map((row) =>
      headers
        .map((header) =>
          row[header] !== null && row[header] !== undefined ? row[header].toString() : ''
        )
        .join(',')
    ),
  ].join('\n');

  return csvContent;
};

export const downloadCSV = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const handleDownloadExcel = (data, fileName) => {
  const excelData = data || [];
  if (!Array.isArray(excelData) || excelData.length === 0) {
    console.error('Invalid data format for Excel export');
    return;
  }
  const csvContent = arrayToCSV(excelData);
  const excelBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(excelBlob, `${fileName}.csv`);
};
