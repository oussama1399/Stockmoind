# 🎯 Stockmind - AI-Powered Stock Management Suite

> A premium desktop stock management application with AI-driven insights, modern glassmorphism UI, and comprehensive business analytics.

[![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)](https://electronjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)](https://ollama.ai/)

## ⚡ Quick Download

**Just want to use Stockmind?** Download and run immediately - no installation required!

[![Download Portable EXE](https://img.shields.io/badge/Download-Portable%20EXE-green?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/oussama1399/Stockmoind/releases/latest/download/Stockmind.1.0.0.exe)

**🚀 One-click execution**: Download → Double-click → Use immediately!

*No installation required. Skip to [📥 Downloads](#-downloads) section below.*

> **� Pro Tip**: The portable EXE is perfect for quick demos, USB deployment, or systems where you can't install software!

## ✨ Features

### 🏪 **Advanced Stock Management**
- **Complete CRUD Operations** - Add, edit, delete, and track inventory items
- **Category-Based Organization** - Organize stock by categories for better management
- **Low Stock Alerts** - Automatic notifications for items running low
- **Price Tracking** - Monitor pricing history and trends
- **Bulk Import** - Upload Excel files for mass data import

### 👥 **Customer Relationship Management**
- **Customer Database** - Comprehensive customer information management
- **Contact Management** - Store multiple contact methods and addresses
- **Customer History** - Track all interactions and order history
- **Search & Filter** - Quickly find customers with advanced search

### 📦 **Intelligent Order Processing**
- **Smart Order Creation** - Create orders with automatic stock validation
- **Real-Time Updates** - Automatic inventory adjustments on order completion
- **Status Tracking** - Monitor order lifecycle from creation to delivery
- **Order Analytics** - Detailed insights into sales performance

### 🤖 **AI-Powered Insights**
- **Dual AI Integration** - Choose between Ollama (local) or Google Gemini (cloud)
- **Intelligent Analysis** - Get AI-driven insights about your business data
- **Natural Language Queries** - Ask questions in plain English
- **Predictive Analytics** - Receive recommendations for stock optimization
- **Real-Time Chat Interface** - Interactive AI assistant with modern UI

### 📊 **Premium Dashboard**
- **Real-Time Analytics** - Live updates on key business metrics
- **Interactive Charts** - Visual representation of sales and inventory data
- **Performance Metrics** - Track KPIs and business health indicators
- **Customizable Widgets** - Personalize your dashboard view

### 🎨 **Modern UI/UX Design**
- **Glassmorphism Effects** - Premium visual design with backdrop blur
- **Responsive Layout** - Optimized for all screen sizes
- **Dark/Light Mode Ready** - Prepared for theme switching
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Accessibility Compliant** - WCAG AA contrast ratios and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/oussama1399/Stockmoind.git
   cd Stockmoind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   # Development mode (with hot reload)
   npm run dev

   # Production desktop app
   npm start
   ```

## � Downloads

Get the latest pre-built executable for your platform:

### Windows
[![Download Windows](https://img.shields.io/badge/Download-Windows%20EXE-blue?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/oussama1399/Stockmoind/releases/latest/download/Stockmind.Setup.1.0.0.exe)

**Alternative Download Options:**
- **Portable Version** (No installation required): [Stockmind.exe](https://github.com/oussama1399/Stockmoind/releases/latest/download/Stockmind.exe)
- **Windows Installer**: [Stockmind Setup 1.0.0.exe](https://github.com/oussama1399/Stockmoind/releases/latest/download/Stockmind.Setup.1.0.0.exe)

### System Requirements
- **OS**: Windows 10/11 (64-bit)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 200MB free space
- **Internet**: Required for AI features (optional for basic functionality)

### Installation Instructions

#### For Portable EXE (Recommended):
1. **Download** `Stockmind 1.0.0.exe` from the link above
2. **Double-click** to run immediately - no installation required!
3. **First launch** may take a few seconds to initialize
4. **Ready to use** - start managing your stock right away

#### For Development:
1. Clone the repository and install dependencies
2. Run `npm run dev` for development mode
3. Or `npm start` for production desktop app

## �📋 Usage Guide

### First Time Setup
1. **Launch the application** using `npm start`
2. **Configure AI Integration** (optional):
   - Go to **Paramètres > Configuration de l'API Gemini**
   - Enter your Google Gemini API key
   - Or set up Ollama for local AI processing

3. **Import Sample Data** (optional):
   - Use the **Upload** feature to import Excel files
   - Or manually add stock items, customers, and orders

### Daily Operations
- **📊 Dashboard**: Monitor business metrics and KPIs
- **📦 Stock**: Manage inventory and track stock levels
- **👥 Customers**: Maintain customer database and relationships
- **📋 Orders**: Process orders and track fulfillment
- **🤖 AI Chat**: Get insights and recommendations from AI assistant

## 🎯 Why Choose the Portable EXE?

### ✨ Advantages of Portable Version

**🚀 Instant Usage**
- **Zero installation time** - Download and run in seconds
- **No admin rights required** - Works on restricted systems
- **No system modifications** - Leaves no traces on the host system

**📱 Portability**
- **USB-ready** - Run from any USB drive or external storage
- **Multi-device** - Use on multiple computers without reinstallation
- **Backup friendly** - Easy to backup and restore

**🔧 Maintenance Free**
- **Self-contained** - All dependencies included
- **No updates required** - Always runs the bundled version
- **No conflicts** - Won't interfere with other software

**⚡ Performance**
- **Optimized bundle** - Smaller footprint than traditional installers
- **Direct execution** - No launcher delays
- **Consistent experience** - Same performance across all systems

### 📋 Quick Start with Portable EXE

1. **Download** → `Stockmind 1.0.0.exe` (~92 MB)
2. **Double-click** → Application launches immediately
3. **Start using** → No setup wizard or configuration needed
4. **Close anytime** → Data is automatically saved

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start with hot reload
npm run build:react  # Build React app only

# Production
npm start            # Build and run desktop app
npm run dist         # Create distributable packages
npm run pack         # Create unpacked directories

# Utilities
npm run electron     # Run Electron only
npm run react        # Run React dev server only
```

### Creating Releases

To create a new release with executable files:

1. **Build the executables**
   ```bash
   npm run dist
   ```

2. **Create a GitHub Release**
   - Go to [Releases](https://github.com/oussama1399/Stockmoind/releases)
   - Click "Create a new release"
   - Upload the files from the `dist/` folder:
     - `Stockmind 1.0.0.exe` (Portable executable - **Recommended**)
     - `win-unpacked/` folder (Alternative portable version)

3. **Tag the release**
   - Use semantic versioning (e.g., `v1.0.0`)
   - Add release notes describing new features

### Project Structure

```
Stockmind/
├── main.js                 # Electron main process
├── package.json           # Dependencies and scripts
├── src/
│   ├── App.js            # Main React application
│   ├── Settings.js       # API configuration component
│   ├── UploadData.js     # Excel import functionality
│   ├── translations.js   # Multilingual support
│   ├── index.js          # React entry point
│   └── index.css         # Premium design system
├── public/
│   └── index.html        # Main HTML template
├── build/                # Built React app (generated)
└── dist/                 # Distribution files (generated)
```

### Design System

The application uses a comprehensive design system with:

- **Color Palette**: Professional B2B colors with WCAG AA compliance
- **Typography Scale**: Consistent font sizes and weights
- **Glassmorphism**: Modern visual effects with backdrop blur
- **Animation System**: Smooth transitions and micro-interactions
- **Responsive Grid**: Mobile-first responsive design

### Color System

| Element | Light Mode | Purpose |
|---------|------------|---------|
| Primary Text | `#2C3E50` | Main content and headings |
| Secondary Text | `#7F8C8D` | Metadata and labels |
| Success | `#2ECC71` | Positive actions and status |
| Warning | `#E67E22` | Caution states |
| Danger | `#E74C3C` | Error states |
| Primary Blue | `#3498DB` | Links and primary actions |
| Background | `#EAF2F8` to `#D6EAF8` | Soft gradient background |

## 🤖 AI Integration

### Google Gemini Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to **Paramètres > Configuration de l'API Gemini**
4. Start chatting with your AI assistant!

### Ollama Setup (Local AI)
1. Install [Ollama](https://ollama.ai/)
2. Pull your preferred model: `ollama pull llama2`
3. Start Ollama: `ollama serve`
4. The app will automatically detect and use local AI

### AI Features
- **Natural Language Queries** - Ask questions in plain English
- **Business Insights** - Get recommendations for inventory optimization
- **Data Analysis** - Analyze sales trends and customer behavior
- **Predictive Analytics** - Forecast demand and stock requirements

## 📊 Data Management

### Local Storage
- All data is stored locally using browser localStorage
- No internet connection required for core functionality
- Data persists between application sessions
- Automatic backup and recovery features

### Excel Import
- Support for `.xlsx` and `.xls` files
- Automatic column mapping and validation
- Bulk import with progress tracking
- Error handling and data validation

## 🏗️ Building for Distribution

### Windows
```bash
npm run dist
```
Creates `.exe` installer and portable versions

### macOS
```bash
npm run dist
```
Creates `.dmg` installer and app bundles

### Linux
```bash
npm run dist
```
Creates `.deb`, `.rpm`, and `.AppImage` packages

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
OLLAMA_BASE_URL=http://localhost:11434

# Development
NODE_ENV=development
DEBUG=true
```

### Customization
- **Themes**: Modify color variables in `src/index.css`
- **Language**: Update translations in `src/translations.js`
- **Features**: Extend functionality in `src/App.js`

## 🐛 Troubleshooting

### Common Issues

**AI Chat Not Working**
- Check internet connection for Gemini API
- Verify Ollama is running for local AI
- Confirm API keys are correctly configured

**Data Not Saving**
- Check browser localStorage permissions
- Ensure sufficient disk space
- Try clearing application data

**Performance Issues**
- Close other applications
- Check system resources
- Update to latest Node.js version

### Debug Mode
```bash
# Enable debug logging
DEBUG=true npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Maintain WCAG AA accessibility standards
- Test on multiple platforms (Windows, macOS, Linux)
- Update documentation for new features

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Electron** - Cross-platform desktop app framework
- **React** - Modern UI library
- **Google Gemini** - AI capabilities
- **Ollama** - Local AI processing
- **SheetJS** - Excel file processing

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/oussama1399/Stockmoind/issues)
- **Discussions**: [GitHub Discussions](https://github.com/oussama1399/Stockmoind/discussions)
- **Documentation**: [Wiki](https://github.com/oussama1399/Stockmoind/wiki)

---

**Built with ❤️ using Electron, React, and modern web technologies**

*Stockmind - Smart Stock Management for the Modern Business*

## Features

- 📊 **Smart Dashboard** - Real-time overview of stock, customers, and orders
- 📦 **Stock Management** - Complete CRUD operations for inventory
- 👥 **Customer Management** - Manage customer database with full details
- 📋 **Order Management** - Create and track orders with automatic stock updates
- 🤖 **AI Chat** - Get insights and recommendations using Ollama or Gemini AI
- 📤 **XLSX Import** - Upload and process Excel files for bulk data import
- 💾 **Local Storage** - All data persists locally on your machine

## Desktop Application Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stockmind
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode (with hot reload)
```bash
npm run dev
```
This will start the React development server and launch the Electron app.

#### Production Mode (Desktop App)
```bash
npm start
```
This builds the React app and runs it as a native desktop application.

### Building for Distribution

#### Build for your current platform:
```bash
npm run dist
```

#### Build React app only:
```bash
npm run build:react
```

#### Create distributable packages:
```bash
npm run dist  # Creates installers for Windows, macOS, Linux
npm run pack  # Creates unpacked directories for testing
```

## Application Structure

```
stockmind/
├── main.js              # Electron main process
├── src/
│   ├── App.js          # Main React application
│   ├── index.js        # React entry point
│   └── index.css       # Application styles
├── build/              # Built React app (generated)
├── dist/               # Distribution files (generated)
└── package.json        # Dependencies and scripts
```

## Usage

1. **Dashboard**: View overview of your stock, customers, and orders
2. **Stock**: Add, edit, or remove inventory items
3. **Customers**: Manage your customer database
4. **Orders**: Create orders and track their status
5. **AI Chat**: Get AI-powered insights about your business
6. **Upload**: Import data from Excel files

## Data Storage

All data is stored locally using the browser's localStorage API, so your information stays on your machine and doesn't require an internet connection for basic functionality.

## AI Integration

The app integrates with:
- **Ollama** (local AI) - Requires Ollama to be installed and running
- **Google Gemini** - Requires API key for cloud AI features

## Development

### Available Scripts

- `npm run dev` - Start development mode with hot reload
- `npm start` - Build and run as desktop app
- `npm run build:react` - Build React app only
- `npm run dist` - Create distributable packages
- `npm run pack` - Create unpacked distribution for testing

### Project Structure

The application is built with:
- **Electron**: Cross-platform desktop app framework
- **React**: Modern UI framework
- **Local Storage**: Data persistence
- **XLSX**: Excel file processing
- **AI Integration**: Ollama and Google Gemini support

## License

ISC License - See package.json for details

## Support

For issues or questions, please check the application logs or create an issue in the repository.

### AI Chat
- Get intelligent insights about your inventory
- Ask questions about stock levels, customer data, and sales trends
- Use either Ollama (local) or Gemini API (cloud)

### Data Import
- Upload XLSX files to bulk import stock data
- Automatic parsing with category support

## Sample Data

The application comes pre-loaded with sample data:
- 10 stock items across multiple categories
- 5 sample customers
- 3 sample orders with different statuses

## Technologies

- **Electron** for desktop application
- **React** for modern UI components
- **Ollama** for local AI processing
- **Google Gemini API** for cloud AI capabilities
- **XLSX** for Excel file processing
- **Local Storage** for data persistence

## Features Overview

### 🏪 Stock Management
- Complete CRUD operations
- Category-based organization
- Low stock alerts
- Price tracking

### 👥 Customer Management
- Customer database
- Contact information
- Address management
- Customer history tracking

### 📦 Order Management
- Order creation from stock
- Automatic inventory updates
- Status tracking
- Order history

### 🤖 AI Integration
- Local AI with Ollama
- Cloud AI with Gemini
- Intelligent insights
- Data analysis

### 📊 Dashboard
- Real-time statistics
- Performance metrics
- Sales tracking
- Inventory alerts

## Development

The application uses modern React patterns with hooks for state management and localStorage for data persistence. The UI is built with a premium design system featuring glassmorphism effects and smooth animations.