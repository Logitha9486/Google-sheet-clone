# **Web Application Mimicking Google Sheets**

## **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technology Stack](#technology-stack)
6. [Data Structures and Design](#data-structures-and-design)
7. [Challenges Faced](#challenges-faced)
8. [Future Enhancements](#future-enhancements)

---

## **Introduction**
This project is a web application designed to replicate the core functionalities of Google Sheets. The application provides features such as data entry, formula-based calculations, charting, and multiple sheet management. It emphasizes user-friendliness, responsiveness, and real-time data manipulation.

---

## **Features**

### **Core Features**
- **Spreadsheet Interface**:
  - Toolbar with formatting options (bold, italic, underline, text color).
  - Dynamic grid creation for rows and columns.
  - Add, delete, and resize rows/columns.
  - Formula bar for applying mathematical functions.

- **Mathematical Functions**:
  - `SUM`: Adds values in a range.
  - `AVERAGE`: Calculates the average.
  - `MAX`: Finds the maximum value.
  - `MIN`: Finds the minimum value.
  - `COUNT`: Counts numeric entries.
  - `PRODUCT`, `SQRT`, `POWER`, `ROUND`, `ABS`.

- **Data Visualization**:
  - Generate charts (line, bar, pie) using selected data.

- **Data Management**:
  - Save and load spreadsheets locally.
  - Add multiple sheets and toggle between them.

- **Sharing**:
  - Share the spreadsheet URL using the browser’s native sharing functionality.

---

## **Installation**

### **Prerequisites**
- Modern web browser (e.g., Chrome, Firefox).
- Node.js installed for advanced development (optional).

### **Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/google-sheets-clone.git
   cd google-sheets-clone
If Node.js is installed, you can set up a local server:
bash
Copy code
npx http-server .
Open the index.html file in your browser or access the local server at:
arduino
Copy code
http://localhost:8080
Usage
Start the Application:

Open the app in your browser.
The default sheet loads with an editable grid.
Spreadsheet Features:

Enter data into cells.
Use the toolbar to format cells (e.g., bold, italic, color).
Add or remove rows/columns using the toolbar buttons.
Apply Mathematical Functions:

Use the formula bar to enter formulas (e.g., =SUM(A1:A5)).
Data Visualization:

Highlight data and click "Create Chart" to generate visualizations.
Save/Load:

Save your spreadsheet locally as JSON.
Load a saved JSON file to continue editing.
Add and Switch Sheets:

Add multiple sheets and toggle between them using the sheet list.
Technology Stack
Frontend:
HTML: For structure and layout.
CSS: For styling the application:
Toolbar, spreadsheet grid, buttons, and navbar.
JavaScript: For interactivity and logic:
Dynamic grid creation.
Mathematical function calculations.
Chart generation using Chart.js.
Data Structures and Design
Key Data Structures:
2D Array:
Represents the spreadsheet grid where each cell contains data or a formula.
HashMap:
Tracks cell dependencies for formula calculations.
JSON:
Saves and loads spreadsheet data.
Challenges Faced
Live Cell Updates:

Ensuring dependent cells update automatically when values/formulas change.
Solution: Used a HashMap for tracking cell dependencies.
Drag-and-Drop:

Implementing smooth dragging of content across cells.
Solution: Used event listeners for precise handling.
Chart Generation:

Ensuring data visualization reflects selected data.
Solution: Integrated Chart.js for seamless chart creation.
Future Enhancements
Real-Time Collaboration:

Allow multiple users to edit the spreadsheet simultaneously using WebSockets.
Expanded Charting Options:

Add support for advanced chart types like scatter plots and histograms.
Enhanced Formula Support:

Include functions like IF, VLOOKUP, and conditional formatting.
Offline Support:

Enable users to work offline and sync changes later.
