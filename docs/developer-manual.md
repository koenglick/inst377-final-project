# Developer Manual - German Vocabulary Lookup App

## Audience
This document is written for future developers who may take over this project. Readers are expected to understand basic web development concepts such as HTML, CSS, JavaScript, APIs, and databases, but are not expected to have prior knowledge of this specific system.

The purpose of this manual is to explain how to set up, run, and continue developing the application.

---

## System Overview
The application is a full-stack web system consisting of:
- A static frontend built with HTML, CSS, and JavaScript
- A backend using Node.js serverless functions deployed on Vercel
- A Supabase (PostgreSQL) database for persistent storage
- An external API (Wiktionary) used for German vocabulary lookup

The frontend communicates only with the backend. The backend is responsible for database access and external API calls.

---

## Installation and Dependencies

### Required Software
- Node.js (version 18 or later)
- A Supabase account
- A Vercel account

### Project Dependencies
Dependencies are defined in `package.json`. The primary dependency is:
- `@supabase/supabase-js`

Install dependencies by running:


---

## Database Setup (Supabase)

### Supabase Project
1. Create a new project in Supabase
2. Create a table named `words`

### Table Schema
Table: `words`
- `id` - auto-generated primary key
- `word` - text value representing a saved German word

### Security Policies
Row Level Security (RLS) must be enabled with policies allowing:
- SELECT access for all users
- INSERT access for all users

This setup is appropriate for a course project without authentication.

---

## Environment Variables
The following environment variables must be set in Vercel:

- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anon public key

These variables are required for backend database access.

---

## Running the Application

### Backend
The backend is implemented using Vercel serverless functions. No separate server process is required.

After deployment to Vercel, backend endpoints are available under:
- `/api/lookup`
- `/api/words`

### Frontend
The frontend is served as static files through Vercel. Pages are accessible through the deployed site URL.

---

## Testing
No automated tests are included in this project.

Manual testing steps include:
- Accessing `/api/words` in the browser to confirm database connectivity
- Using the vocabulary lookup page to trigger backend requests
- Confirming that saved words appear on the home page
- Confirming that the chart updates when words are added

---

## Server API Documentation

### GET `/api/lookup`
Attempts to retrieve a definition for a German word using the Wiktionary API.

Query Parameters:
- `lemma` (string): German word to look up

Response:
- `lemma` (string)
- `extract` (string)

---

### GET `/api/words`
Retrieves all saved words from the Supabase database.

Response:
- JSON array of word objects

---

### POST `/api/words`
Saves a new word to the Supabase database.

Request Body:
- `word` (string)

---

## Known Bugs and Limitations
Some German Wiktionary entries return empty definitions due to complex formatting and heavy use of templates within Wiktionary pages. While the backend successfully communicates with the external API and returns valid responses, certain entries may not display definitions.

This limitation does not affect database functionality, endpoint availability, or application stability.

---

## Roadmap for Future Development
- Improve extraction of definitions from Wiktionary pages
- Add part-of-speech classification for saved words
- Introduce user authentication and personalized word lists
- Improve mobile responsiveness
- Add automated tests for backend endpoints

---

## Handoff Notes
Future developers should be able to continue development by extending backend endpoints, refining external API parsing logic, and enhancing frontend visualization components without needing to change the overall system architecture.
