# KSM Dashboard

A comprehensive management system for the Knights of Saint Mulumba (KSM) organization.

## Features

### Authentication System
- Secure login/register with email verification
- Role-based access control
- Password reset functionality
- Protected routes with permission checking

### User Roles & Dashboards
1. **Super Admin Dashboard** - Complete system management
2. **Metro Dashboard** - Metropolitan council management
3. **Sub Council Dashboard** - Subordinate council management
4. **Zonal Dashboard** - Zone management and data sharing
5. **User Dashboard** - Personal dashboard for members

### Key Features
- Modern, responsive UI with Tailwind CSS
- TypeScript for type safety
- Axios for API communication
- Context-based state management
- Reusable components
- Environment variable configuration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp env.example .env
   ```

4. Configure your environment variables in `.env`

5. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000

# Authentication
REACT_APP_JWT_SECRET=your-jwt-secret-key
REACT_APP_TOKEN_STORAGE_KEY=ksm_auth_token

# App Configuration
REACT_APP_APP_NAME=KSM Dashboard
REACT_APP_APP_VERSION=1.0.0

# Environment
REACT_APP_ENVIRONMENT=development
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   └── layout/         # Layout components
├── contexts/           # React contexts
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## API Integration

The application uses Axios for API communication. Update the `REACT_APP_API_BASE_URL` in your environment variables to point to your backend API.

## Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software for the Knights of Saint Mulumba organization.
