# Dynamic Dashboard Application

A fully functional dynamic dashboard application built with React and Tailwind CSS for the Frontend Trainee Assignment of AccuKnox.

## 🚀 Features

### Core Functionality
- **Dynamic Widget Management**: Add, remove, and manage widgets dynamically
- **Category-based Organization**: Widgets organized into categories (CSPM, CWPP, Registry Scan)
- **JSON-driven Structure**: Dashboard configuration stored in JSON format
- **Search Functionality**: Search through all widgets by name, content, or category
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **State Management**: Efficient state management using React useReducer

### User Interface
- **Modern Design**: Clean, professional UI with hover effects and animations
- **Modal Interfaces**: User-friendly modals for adding and managing widgets
- **Real-time Updates**: Instant feedback and updates when modifying widgets
- **Accessibility**: Keyboard navigation and screen reader support
- **Form Validation**: Input validation with helpful error messages

### Technical Features
- **React 18**: Built with latest React features and hooks
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Modern icon library for UI elements
- **recharts**: for responsive and customizable charts.
- **Local State Management**: No external dependencies for state management
- **Component Architecture**: Well-structured, reusable components

## 📁 Project Structure

```
dynamic-dashboard-app/
├── public/
│   ├── index.html
│   └── icons8-dashboard-50.png
├── src/
│   ├── App.js              # Main dashboard component
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS and custom styles
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # This file
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Step-by-Step Installation

1. **Create a new React application:**
   ```bash
   npx create-react-app dynamic-dashboard-app
   cd dynamic-dashboard-app
   ```

2. **Install required dependencies:**
   ```bash
npm install lucide-react recharts
   ```

3. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```


4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎯 Assignment Requirements Fulfilled

### ✅ Core Requirements
1. **JSON-based Dashboard Structure**: Dashboard configuration stored in structured JSON format with categories and widgets
2. **Dynamic Widget Addition**: Users can add new widgets with custom names and content
3. **Dynamic Widget Removal**: Cross icon on each widget for removal, plus bulk management option
4. **Category Organization**: Widgets properly organized into categories (CSPM Executive Dashboard, CWPP Dashboard, Registry Scan)
5. **Random Text Content**: Sample widgets contain placeholder text content
6. **Widget Search**: Comprehensive search functionality across all widgets
7. **Technology Stack**: Built with React and modern development practices
8. **State Management**: Local state management using React's useReducer hook

### ✅ Additional Features
- **Form Validation**: Input validation with error messages
- **Responsive Design**: Mobile-friendly interface
- **Loading States**: Visual feedback during operations
- **Confirmation Dialogs**: User confirmation for destructive actions
- **Dashboard Statistics**: Real-time widget and category counts
- **Reset Functionality**: Option to reset dashboard to default state
- **Accessibility**: Keyboard navigation and ARIA labels

📊Chart Types Available:

Donut Charts - For Cloud Accounts, Risk Assessment, Image Security data
Bar Charts - For Namespace-specific alerts
Line Charts - For Workload alerts over time

## 🎮 Usage Guide

### Adding a New Widget
1. Click the "Add Widget" button in any category section
2. Fill in the widget name and content in the modal
3. Click "Add Widget" to create the new widget
4. The widget appears immediately in the selected category

### Removing Widgets
**Method 1 - Individual Removal:**
1. Hover over any widget
2. Click the X icon that appears in the top-right corner
3. Confirm the deletion in the popup dialog

**Method 2 - Bulk Management:**
1. Click "Manage Widgets" in the header
2. Uncheck widgets you want to remove
3. Close the management modal

### Searching Widgets
1. Click "Manage Widgets" in the header
2. Use the search bar to find widgets by name, content, or category
3. Filter by specific categories using the dropdown
4. Clear filters using the refresh button

### Dashboard Reset
1. Click the "Reset" button in the header
2. Confirm the action to restore default widgets
3. All custom widgets will be removed

