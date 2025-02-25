# [Demo](https://youtu.be/gaooEZ5BSvI)

# Real-Time Experiment Monitoring Tool

This project is a real-time monitoring dashboard for A/B experiments at Evolv AI.

It includes a backend API (built with Node.js (TypeScript), Express, and Socket.IO) and a frontend (built with React and
TypeScript) to display live experiment metrics, trends, and logs.

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:

```bash
cd api
```

2. Install dependencies:

```bash
npm install
```

3. Configure the environment by editing the `config` file if necessary.

4. Start the backend server:

```bash
npm run start
```

### Frontend Setup

1. Navigate to the frontend folder

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure the environment by creating a .env file if needed. For example, set the backend API URL and Socket.IO URL

```bash
REACT_APP_API_URL=http://localhost:4000
REACT_APP_SOCKET_URL=http://localhost:4000
```

4. Start the frontend development server:

```bash
npm run start
```

### Architecture Decisions

#### Real-Time Updates:

The backend uses Socket.IO to push live experiment updates and logs to the frontend.
This ensures that the dashboard reflects the most current state without requiring constant polling.

#### REST Endpoints:

In addition to WebSockets, RESTful endpoints are provided for retrieving detailed metrics and submitting logs.
This separation allows for on-demand data retrieval and future integration with analytics or user-generated logging.

#### React & TypeScript:

The frontend is built with React and TypeScript to ensure a modular, scalable, and type-safe user interface.
The dashboard uses react-grid-layout for a responsive, drag-and-drop layout.

#### Modular Components:

Key UI elements (e.g., Header, MetricsCard, Charts, LogPanel) are built as reusable components.
This modularity facilitates maintenance, testing, and future enhancements.

### Suggestions for Future Improvements

#### Enhanced Analytics: Implement additional metrics endpoints (e.g., detailed session analytics, segmentation by user demographics) to provide deeper insights.

#### User Authentication: Add authentication and role-based access to secure the dashboard and allow personalized views for different users.

#### Database Integration: Due to time constrains, the data coming from the backend are dummy data and are not stored anywhere. Store it in a Database for persistence

#### Persistent User Settings: Integrate a backend database to persist user-specific layout and filtering preferences rather than using local storage.

#### Improved UI/UX:Enhance the design for better mobile responsiveness, accessibility, and user interactions.

#### Scalability Enhancements: Refactor the data simulation and updates to work with real experimental data and scale to multiple experiments concurrently.
