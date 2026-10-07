# Cleratian Combined School Portal

A combined school portal and student management system where staff/students can:

- Add, search, update, and delete student records
- View semester results
- Book hostel accommodation
- Access e-learning modules
- Join online classes
- Take CBT exams
- Mark class attendance

## GitHub Repository Setup

Recommended repository name:

```text
cleratian-school-portal
```

Upload all files in this folder to your GitHub repository.

## Publish With GitHub Pages

This project includes a `docs/` folder for GitHub Pages.

In GitHub:

1. Open your repository.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select branch: `main`.
6. Select folder: `/docs`.
7. Click `Save`.

Your site will be published at a GitHub Pages URL like:

```text
https://YOUR_USERNAME.github.io/cleratian-school-portal/
```

## Run Locally With Node

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## File Structure

```text
server.js              Node local server
package.json           Project metadata and start command
public/                Node-served frontend files
docs/                  GitHub Pages frontend files
```

## Note

Student records, hostel bookings, CBT scores, and attendance logs are stored in the browser using local storage. For a real production portal, connect a backend database and real student login system.
