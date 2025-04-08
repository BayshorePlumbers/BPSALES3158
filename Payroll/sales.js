document.addEventListener('DOMContentLoaded', () => {
    "use strict";
  
    const calculateBtn = document.getElementById('calculateBtn');
    const printButton = document.getElementById('printButton');
  
    // Calculate the commission based on job type and total price
    function calculateCommission() {
      const tp = parseFloat(document.getElementById('tp').value) || 0;
      const job = document.getElementById('job').value;
  
      let payRate;
      switch (job) {
        case 'Follow up & Close - From Day 8 to Day 21':
          payRate = 0.02; // 2% commission
          break;
        case 'Follow up & Close - After Day 21':
          payRate = 0.10; // 10% commission
          break;
        case 'Billable Hours/ Job Sold':
          payRate = 0.15; // example 15% commission
          break;
        case 'Outreach Effort':
          payRate = 0.01; // 1% commission
          break;
        default:
          payRate = 0;
      }
  
      const baseCommission = payRate * tp;
      document.getElementById('baseCommission').textContent =
        `$${baseCommission.toFixed(2)}`;
    }
  
    // Event listener for Calculate button
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateCommission);
    }
  
    // Event listener for Print button
    if (printButton) {
        printButton.addEventListener('click', () => {
          // Ensure commission is calculated before printing.
          calculateCommission();
      
          // Compute the absolute base URL so payrollprint.css loads correctly.
          const fullPath = window.location.href;
          const baseUrl = fullPath.substring(0, fullPath.lastIndexOf('/') + 1);
      
          // Retrieve the field values.
          const name = document.getElementById('tn').value || '';
          const jobAddress = document.getElementById('ja').value || '';
          const date = document.getElementById('date').value || '';
          const totalPrice = document.getElementById('tp').value || '';
          const saleDetails = document.getElementById('job').value || '';
          const notes = document.getElementById('notes').value || '';
          const commission = document.getElementById('baseCommission').textContent || '';
      
          // Build the print HTML using the same structure and classes as htech.js.
          const printHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta charset="UTF-8">
               <title>SALES COMMISSION REPORT</title>
               <link rel="stylesheet" href="${baseUrl}payrollprint.css" type="text/css" media="print">
            </head>
            <body>
               <div class="top-bar">
                 <div class="logo-container">
                   <img src="BP.png" alt="BP logo" class="logo">
                 </div>
                 <h1>SALES COMMISSION REPORT</h1>
               </div>
               <div class="container">
                 <div class="no-break details-section">
                   <h3>DETAILS:</h3>
                   <table class="input-data">
                     <tr><th>Name</th><td>${name}</td></tr>
                     <tr><th>Job Address</th><td>${jobAddress}</td></tr>
                     <tr><th>Date</th><td>${date}</td></tr>
                     <tr><th>Total Price</th><td>${totalPrice}</td></tr>
                     <tr><th>Sale Details</th><td>${saleDetails}</td></tr>
                     <tr><th>Notes</th><td>${notes}</td></tr>
                   </table>
                 </div>
                 <div class="no-break commission-details-section">
                   <h3>COMMISSION DETAILS:</h3>
                   <table class="input-data">
                     <tr><th>Commission</th><td>${commission}</td></tr>
                   </table>
                 </div>
               </div>
            </body>
            </html>
          `;
      
          const printWindow = window.open('', '', 'width=800,height=600');
          printWindow.document.write(printHTML);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        });
      }
    });