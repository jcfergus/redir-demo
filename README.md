# Redirect Demo App

## Overview

Stupid simple demo app that shows how authentication redirects can work within a SPA withot being visible to the user.
(Obviously this is AI-generated, but it's never gonna be production code.)   

When the react app loads, it makes a fetch request to the backend to get some data.  
The backend doesn't see an authentication token, so it redirects the request 
to the "authorize" endpoint.  The "authorize" endpoint doesn't see a meta-authentication token, so it redirects the request 
to the "superauth" endpoint, where a meta-authentication token is created and returned as a JSON fragment.  

The frontend then makes a second request to the "superauth" endpoint, which sees the meta-authentication token and redirects 
the request to the "authorize" endpoint, where the authentication token is created and returned as a JSON fragment.  

The frontend then makes a second request to the "authorize" endpoint, which sees the authentication token and redirects 
the request to the "data" endpoint, where, since the frontend now has an authentication token, the data is returned.

## Backend
- Location: /backend
- Tech: Node.js, Express
- Port: 3000
- Endpoint: /api/data


## Frontend
- Location: /frontend
- Tech: React (Vite), TypeScript
- Port: 5173 (default)

## How to Run
1. Start the Backend
Open a terminal and run:

```bash
cd backend
node server.js
```

You should see: Example app listening on port 3000

2. Start the Frontend
Open a new terminal tab/window and run:

```bash
cd frontend
npm run dev
```

You should see the Vite local URL (e.g., http://localhost:5173/).

3. Verify
Open the frontend URL in your browser. You should see "Frontend + Backend Demo" and the message fetched from the backend.
