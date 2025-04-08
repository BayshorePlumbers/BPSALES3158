document.addEventListener('DOMContentLoaded', () => {
    "use strict";
  
    const calculateBtn = document.getElementById('calculateBtn');
    const printButton = document.getElementById('printButton');
  
    // Calculate commission at a base rate (2% of total price)
    function calculateCommission() {
      const tp = parseFloat(document.getElementById('tp').value) || 0;
  
      if (tp <= 0) {
        alert("Please enter a valid total price.");
        return;
      }
  
      // Base commission: 2% of total price
      const baseCommissionValue = 0.02 * tp;
      document.getElementById('baseCommission').textContent =
        baseCommissionValue.toFixed(2);
    }
  
    // Attach event listener to "Calculate" button
    calculateBtn.addEventListener('click', calculateCommission);
  
    // Print functionality
    printButton.addEventListener('click', () => {
      // Calculate commission first to ensure it's up-to-date
      calculateCommission();
  
      // Gather form data
      const name = document.getElementById('tn').value.trim();
      const invoiceNumber = document.getElementById('in').value.trim();
      const techAssist = document.getElementById('ta').value.trim();
      const jobAddress = document.getElementById('ja').value.trim();
      const totalPrice = document.getElementById('tp').value.trim();
      const date = document.getElementById('date').value.trim();
      const notes = document.getElementById('notes').value.trim();
      const baseCommission = document.getElementById('baseCommission').textContent;
  
      // Validate required fields
      if (!name || !invoiceNumber || !techAssist || !jobAddress || !totalPrice || !date) {
        alert("Please fill in all required fields (*) before printing.");
        return;
      }
  
      // Compute the absolute base URL from the current window location
      const fullPath = window.location.href;
      const baseUrl = fullPath.substring(0, fullPath.lastIndexOf('/') + 1);
  
      // Create print window with updated HTML structure mimicking htech.js print preview
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Assisted Sales Commission Report</title>
          <link rel="stylesheet" href="${baseUrl}payrollprint.css" type="text/css" media="print">
        </head>
        <body>
          <div class="top-bar">
            <div class="logo-container">
              <img src="BP.png" alt="Bayshore Plumbers" class="logo">
            </div>
            <h1>Assisted Sales Commission Report</h1>
          </div>
          <div class="container">
            <div class="no-break">
              <h3>DETAILS:</h3>
              <table class="input-data">
                <tr><th>Name</th><td>${name}</td></tr>
                <tr><th>Invoice Number</th><td>${invoiceNumber}</td></tr>
                <tr><th>Technician Assisted</th><td>${techAssist}</td></tr>
                <tr><th>Job Address</th><td>${jobAddress}</td></tr>
                <tr><th>Date</th><td>${date}</td></tr>
                <tr><th>Total Price</th><td>${totalPrice}</td></tr>
                <tr><th>Notes</th><td>${notes}</td></tr>
              </table>
            </div>
            <div class="no-break">
              <h3>Commission Details</h3>
              <table class="input-data">
                <tr><th>Commission</th><td>${baseCommission}</td></tr>
              </table>
            </div>
          </div>
        </body>
        </html>
      `);
  
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    });
  });
  