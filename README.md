# inst377-final-project

# German Vocabulary Lookup and Tracking App

## Project Description
This project is a full-stack German vocabulary lookup and tracking web application. The purpose of the project is to demonstrate how a frontend web application can interact with a backend server, external APIs, and a database in a deployed environment.

Users can enter German words, attempt to retrieve a definition from an external language API, and save those words to a database. Saved vocabulary is displayed on the home page along with a dynamic chart and an interactive map. The project emphasizes system integration and architecture rather than linguistic completeness.

---

## Target Browsers
This application is designed to run in modern desktop web browsers, including:
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)

The project is not optimized for mobile browsers (iOS or Android) and is intended primarily for desktop use.

---

## Developer Manual
The Developer Manual is included below and is also mirrored in the `/docs` directory for maintainability and future development.

**Developer Manual Location:**  
`/docs/developer-manual.md`

---

# Developer Manual

## Intended Audience
This document is intended for future developers who may take over this project. Readers are expected to have general knowledge of web applications, JavaScript, APIs, and databases, but no prior familiarity with this specific system.

The goal of this manual is to allow a new developer to set up the application locally, understand the system architecture, and continue development.

---

## System Overview
The system consists of:
- A static frontend built with HTML, CSS, and JavaScript
- A backend implemented using Node.js serverless functions deployed on Vercel
- A Supabase (PostgreSQL) database for persistent storage
- An external API (Wiktionary) for German vocabulary lookups

---

## Installation and Dependencies

### Required Tools
- Node.js (v18 or later)
- A Supabase account
- A Vercel account

### Dependencies
The application uses the following dependency:
- `@supabase/supabase-js`

Dependencies are defined in `package.json`.

---

## Local Setup Instructions

1. Clone the repository:

2. Navigate into the project directory:

3. Install dependencies:

4. Create a Supabase project and add a table named `words` with the following schema:
- `id` (auto-generated primary key)
- `word` (text)

5. Configure environment variables in Vercel:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

---

## Running the Application

### Backend
The backend runs as serverless functions on Vercel. No local server execution is required for normal use.

To run locally, a developer may use Vercel’s CLI tools, but this is optional and not required for basic testing.

### Frontend
The frontend is static and served automatically through Vercel once deployed. Pages can also be opened directly in the browser for basic UI testing.

---

## Testing
No automated tests are included in this project. Testing was conducted manually by:
- Verifying API endpoints in the browser
- Confirming database writes and reads
- Confirming frontend updates after data changes

---

## Server API Documentation

### GET `/api/lookup`
Attempts to retrieve a definition for a German word using the Wiktionary API.

**Query Parameters**
- `lemma` (string): The German word to look up

**Response**
- `lemma` (string)
- `extract` (string)

---

### GET `/api/words`
Retrieves all saved words from the Supabase database.

**Response**
- Array of saved word objects

---

### POST `/api/words`
Saves a new German word to the Supabase database.

**Request Body**
- `word` (string)

---

## Known Bugs and Limitations
Some German Wiktionary entries return empty definitions due to the heavy use of templates and complex formatting in Wiktionary pages. The lookup endpoint successfully communicates with the external API and returns a valid response, but certain entries may not display a definition.

This limitation does not affect backend stability, database persistence, or frontend functionality.

---

## Roadmap for Future Development
- Improve definition extraction for Wiktionary entries
- Add part-of-speech categorization for saved words
- Add user accounts and authentication
- Expand chart functionality to show word categories
- Improve mobile responsiveness

---
