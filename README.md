# Stockmind

Smart stock management application by chattypixel.

## Features

- Intelligent dashboard with stock overview
- Stock management with CRUD operations
- AI-powered chat for insights using Ollama (qwen3-coder:latest) or Gemini API
- Upload XLSX files for data import
- Minimalistic and premium design with purple accents

## Prerequisites

- Node.js
- Ollama installed and running with qwen3-coder:latest model
- For Gemini API: Google API key

## Installation

1. Clone the repository
2. Run `npm install`
3. Start Ollama and pull the model: `ollama pull qwen3-coder:latest`
4. Run `npm run dev` for development

## Usage

- Dashboard: View stock overview and AI insights
- Stock Management: Add, edit, delete stock items
- AI Chat: Ask questions about your stock data
- Upload Data: Import stock data from XLSX files

## Technologies

- Electron for desktop app
- React for UI
- Ollama for local AI
- Google Gemini API for cloud AI
- XLSX for file parsing