let sheets = [];
let currentSheetIndex = 0;
let rowCounter = 1;
let colCounter = 101;

window.onload = function initialize() {
    addSheet(); // Start with one sheet
    loadSheets();
};

// Function to toggle visibility of add/remove options
function toggleAddRemoveOptions() {
    const optionsDiv = document.getElementById('add-remove-options');
    optionsDiv.style.display = (optionsDiv.style.display === 'none') ? 'block' : 'none';
}

// Initialize the grid for the current sheet
function initializeGrid() {
    const spreadsheet = document.getElementById('spreadsheet');
    spreadsheet.innerHTML = '';
    
    // Add headers (Columns as numbers)
    const headerRow = document.createElement('div');
    headerRow.classList.add('header-row');
    headerRow.innerHTML = `<div class="cell header"></div>`; 
    spreadsheet.appendChild(headerRow);
    
    for (let i = 1; i <= 100; i++) {
        const newHeader = document.createElement('div');
        newHeader.classList.add('cell', 'header');
        newHeader.textContent = i; 
        headerRow.appendChild(newHeader);
    }

    for (let i = 1; i <= 26; i++) {
        addRow();
    }
}

function getRowLabel(index) {
    let label = '';
    while (index > 0) {
        const mod = (index - 1) % 26;
        label = String.fromCharCode(mod + 65) + label;
        index = Math.floor((index - 1) / 26);
    }
    return label;
}

// Add a new column
function addColumn() {
    const spreadsheet = document.getElementById('spreadsheet');
    const headerRow = spreadsheet.querySelector('.header-row');
    
    const newHeader = document.createElement('div');
    newHeader.classList.add('cell', 'header');
    newHeader.textContent = colCounter;
    headerRow.appendChild(newHeader);

    const rows = spreadsheet.querySelectorAll('.row');
    rows.forEach(row => {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.setAttribute('contenteditable', 'true');
        newCell.setAttribute('data-cell', `${getRowLabel(row.rowIndex + 1)}${colCounter}`);
        row.appendChild(newCell);
    });
    
    colCounter++;
}

// Add a new row
function addRow() {
    const spreadsheet = document.getElementById('spreadsheet');
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    
    const rowLabel = getRowLabel(rowCounter); 
    newRow.innerHTML = `<div class="cell header">${rowLabel}</div>`; 
    
    const colCount = document.querySelector('.header-row').children.length;
    for (let i = 1; i < colCount; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.setAttribute('contenteditable', 'true');
        newCell.setAttribute('data-cell', `${rowLabel}${i}`);
        newRow.appendChild(newCell);
    }
    
    spreadsheet.appendChild(newRow);
    rowCounter++;
}

// Remove a column
function removeColumn() {
    const spreadsheet = document.getElementById('spreadsheet');
    const headerRow = spreadsheet.querySelector('.header-row');
    const columns = headerRow.children;
    
    if (columns.length > 1) {
        headerRow.removeChild(columns[columns.length - 1]);
        
        const rows = spreadsheet.querySelectorAll('.row');
        rows.forEach(row => {
            row.removeChild(row.lastElementChild);
        });
        
        colCounter--;
    }
}

// Remove a row
function removeRow() {
    const spreadsheet = document.getElementById('spreadsheet');
    const rows = spreadsheet.querySelectorAll('.row');
    
    if (rows.length > 1) {
        spreadsheet.removeChild(rows[rows.length - 1]);
        rowCounter--;
    }
}

// Add a new sheet
function addSheet() {
    const newSheet = {
        rows: [],
        columns: []
    };
    sheets.push(newSheet);
    currentSheetIndex = sheets.length - 1;
    loadSheets();
    initializeGrid();
}

// Load all sheets and display them in the sheet list
function loadSheets() {
    const sheetList = document.getElementById('sheet-list');
    sheetList.innerHTML = '';

    sheets.forEach((sheet, index) => {
        const sheetItem = document.createElement('li');
        sheetItem.textContent = `Sheet ${index + 1}`;
        sheetItem.onclick = () => {
            currentSheetIndex = index;
            loadSheetContent();
        };
        sheetList.appendChild(sheetItem);
    });

    loadSheetContent();
}

// Load content for the current sheet
function loadSheetContent() {
    const spreadsheet = document.getElementById('spreadsheet');
    const currentSheet = sheets[currentSheetIndex];
    
    rowCounter = 1;
    colCounter = 101;

    initializeGrid();
    
    currentSheet.rows.forEach((row, rowIndex) => {
        row.cells.forEach((cellData, colIndex) => {
            const cell = document.querySelector(`.row:nth-child(${rowIndex + 1}) .cell:nth-child(${colIndex + 1})`);
            if (cell) {
                cell.textContent = cellData;
            }
        });
    });
}


// Save sheets to a file
function saveSheets() {
    const jsonSheets = JSON.stringify(sheets);
    const blob = new Blob([jsonSheets], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sheets.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Load sheets from a file
function loadSheetsFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function() {
            const loadedSheets = JSON.parse(reader.result);
            sheets = loadedSheets;
            currentSheetIndex = 0;
            loadSheets();
        };
        
        reader.readAsText(file);
    });
    input.click();
}
 // SUM - Adds a range of numbers
function sum(range) {
    return range.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
}

// AVERAGE - Computes the average of a range of numbers
function average(range) {
    const sumValue = sum(range);
    return sumValue / range.length;
}

// MIN - Finds the minimum value in a range of numbers
function min(range) {
    return Math.min(...range.map(val => parseFloat(val) || Infinity));
}

// MAX - Finds the maximum value in a range of numbers
function max(range) {
    return Math.max(...range.map(val => parseFloat(val) || -Infinity));
}

// COUNT - Counts the number of numeric values in a range
function count(range) {
    return range.filter(val => !isNaN(val)).length;
}

// PRODUCT - Multiplies a range of numbers
function product(range) {
    return range.reduce((acc, val) => acc * (parseFloat(val) || 1), 1);
}

// SQRT - Calculates the square root of a number
function sqrt(value) {
    return Math.sqrt(parseFloat(value) || 0);
}

// POWER - Raises a number to a specific power
function power(base, exponent) {
    return Math.pow(parseFloat(base) || 0, parseFloat(exponent) || 0);
}

// ROUND - Rounds a number to a specified number of decimal places
function round(value, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(parseFloat(value) * factor) / factor;
}

// ABS - Returns the absolute value of a number
function abs(value) {
    return Math.abs(parseFloat(value) || 0);
}

// Apply Formula to the spreadsheet based on the function requested
function applyFormula() {
    const formula = document.getElementById('formulaBar').value.trim();
    const match = formula.match(/^=([A-Za-z]+)\(([^)]+)\)$/);
    if (match) {
        const functionName = match[1].toUpperCase(); // Function name (SUM, AVERAGE, etc.)
        const rangeStr = match[2].trim(); // The range or arguments
        const values = parseRange(rangeStr); // Parse the range or individual values
        let result = null;

        // Apply the corresponding mathematical function
        switch (functionName) {
            case 'SUM':
                result = sum(values);
                break;
            case 'AVERAGE':
                result = average(values);
                break;
            case 'MIN':
                result = min(values);
                break;
            case 'MAX':
                result = max(values);
                break;
            case 'COUNT':
                result = count(values);
                break;
            case 'PRODUCT':
                result = product(values);
                break;
            case 'SQRT':
                result = sqrt(values[0]);
                break;
            case 'POWER':
                result = power(values[0], values[1]);
                break;
            case 'ROUND':
                result = round(values[0], values[1]);
                break;
            case 'ABS':
                result = abs(values[0]);
                break;
            default:
                result = 'Invalid Function';
                break;
        }

        // Set the result in the formula bar
        document.getElementById('formulaBar').value = result;
    } else {
        document.getElementById('formulaBar').value = 'Invalid Formula';
    }
}

// Parse the range (e.g., A1:B10 or 5, 7, 3)
function parseRange(rangeStr) {
    const values = rangeStr.split(',').map(val => val.trim());
    return values;
}
// Create a chart based on the selected data from the spreadsheet
function createChart() {
    const spreadsheet = document.getElementById('spreadsheet');
    const rows = spreadsheet.querySelectorAll('.row');
    
    // Prepare labels and data arrays for chart
    const labels = [];
    const data = [];

    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('.cell');
        if (index === 0) return; // Skip header row

        // First cell is the label (row label)
        labels.push(cells[0].textContent);

        // Collect the data from the first column (you can modify this logic to handle more columns)
        const rowData = [];
        for (let i = 1; i < cells.length; i++) {
            rowData.push(parseFloat(cells[i].textContent) || 0);
        }
        data.push(rowData);
    });

    // Define the chart data
    const chartData = {
        labels: labels,
        datasets: data.map((rowData, index) => ({
            label: `Row ${index + 1}`,
            data: rowData,
            borderColor: randomColor(),
            fill: false,
        }))
    };

    // Create the chart
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    new Chart(ctx, {
        type: 'line', // Type of chart (line, bar, pie, etc.)
        data: chartData,
        options: {
            responsive: true,
            scales: {
                x: { 
                    beginAtZero: true 
                },
                y: { 
                    beginAtZero: true
                }
            }
        }
    });
}

// Utility function to generate random colors for the chart
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const ctx = document.getElementById('chartCanvas') || (() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'chartCanvas';
    document.body.appendChild(canvas);
    return canvas.getContext('2d');
})();

// Destroy any existing chart instance to avoid duplication
if (window.myChart) {
    window.myChart.destroy();
}

// Create a new Chart.js instance
window.myChart = new Chart(ctx, {
    type: 'line', // You can change this to 'bar', 'pie', etc.
    data: chartData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    },
});


// Helper function to generate a random color for datasets
function randomColor() {
const r = Math.floor(Math.random() * 255);
const g = Math.floor(Math.random() * 255);
const b = Math.floor(Math.random() * 255);
return `rgb(${r}, ${g}, ${b})`;
}
function shareSpreadsheet() {
    const shareData = {
      title: 'My Spreadsheet',
      text: 'Check out this spreadsheet I created!',
      url: window.location.href, // Share the current page's URL
    };
  
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Spreadsheet shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  }
  