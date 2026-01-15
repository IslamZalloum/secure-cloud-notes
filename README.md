# Secure Cloud Notes

A secure cloud-based note-taking application built using Firebase.

## Features
- User authentication using Firebase Authentication
- Cloud-based note storage using Firestore
- User-specific access control
- Secure backend enforcement using Firestore Security Rules

## Security Testing
The application was tested against:
- Access without login
- Unauthorized reading of other users’ data
- UID spoofing (fake ownership)
- Unauthorized delete operations

All attacks were successfully blocked after applying Firestore Security Rules.

## Technologies Used
- HTML, CSS, JavaScript
- Firebase Authentication
- Cloud Firestore
