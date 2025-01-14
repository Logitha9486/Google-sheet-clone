Web Application Mimicking Google Sheets
Table of Contents
Introduction
Features
Installation
Usage
Technology Stack
Data Structures and Design
Challenges Faced
Future Enhancements
Introduction
This project is a web application designed to replicate the user interface and core functionalities of Google Sheets. It includes features like mathematical operations, data quality functions, and basic spreadsheet interactions. The goal was to build a user-friendly, responsive, and functional application for data manipulation and visualization.

Features
Core Features
Spreadsheet Interface:

Toolbar, formula bar, and cell grid.
Drag-and-drop functionality for content and formulas.
Add, delete, and resize rows/columns.
Cell formatting: bold, italics, font size, and colors.
Mathematical Functions:

SUM: Add values in a range.
AVERAGE: Calculate the average.
MAX: Find the maximum value.
MIN: Find the minimum value.
COUNT: Count numerical entries.
Data Quality Functions:

TRIM: Removes whitespace.
UPPER & LOWER: Change text case.
REMOVE_DUPLICATES: Eliminate duplicate rows.
FIND_AND_REPLACE: Locate and replace text in a range.
Bonus Features
Save and load spreadsheets locally.
Basic data visualization (e.g., bar charts, pie charts).
Advanced cell referencing (relative and absolute).
Installation
Prerequisites
Node.js and npm installed.
Modern web browser.
Setup
Clone the repository:
bash
Copy code
git clone <repository-url>  
cd <project-folder>  
Install dependencies:
bash
Copy code
npm install  
Start the development server:
bash
Copy code
npm start  
Open the application in your browser:
arduino
Copy code
http://localhost:3000  
Usage
Open the app in your browser.
Interact with the spreadsheet:
Enter data into cells.
Use the toolbar for formatting.
Try mathematical and data quality functions in the formula bar (e.g., =SUM(A1:A5)).
Save or load spreadsheets using the file menu.
Technology Stack
Frontend:

HTML, CSS, JavaScript
Libraries: Handsontable or Spreadsheet.js
Charting: Chart.js
Backend:

Node.js for server logic.
Optional: Express.js for routing.
Database:

SQLite (lightweight database for saving data locally).
Data Structures and Design
2D Array: Represents the spreadsheet grid, where each element corresponds to a cell.
HashMap/Dictionary: Tracks dependencies between cells (for formula calculations).
Queue: Ensures orderly updates of dependent cells.
JSON: Used for saving and loading spreadsheets.
Challenges Faced
Ensuring live updates for dependent cells when formulas change.
Implementing drag-and-drop functionality while maintaining data integrity.
Handling large datasets efficiently.
Future Enhancements
Add real-time collaboration features.
Improve data visualization with advanced charting options.
Expand formula support (e.g., IF, VLOOKUP).
Optimize performance for larger spreadsheets.
