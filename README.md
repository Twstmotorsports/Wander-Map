# Wander Map

Wander Map is a travel planner for creating trip plans and simple travel guides.  
You can:

- Plan trips with dates, destinations, and activities
- Create and edit travel guides with notes and photos
- See your own trips/guides only (per-user data)
- View a real map and mock directions / hotel search
- Manage your profile (name, avatar) and log in/out

Built with **Expo + React Native + Firebase**.

---

## Features

- **Email authentication**
  - Sign up / log in with email + password
  - Auth state persists across app restarts
  - Log out from the Profile screen

- **Per-user trips and guides**
  - Trips and guides are tied to your Firebase user ID
  - Each user only sees their own data
  - Real-time updates from Firestore (no manual refresh)

- **Trip planning**
  - Destination, country, start/end dates
  - Activities list
  - Form validation and inline error messages

- **Travel guides**
  - Title, location, free-form content
  - Optional photo URLs
  - Real-time list and edit flow

- **Profile**
  - Shows logged-in email
  - Editable display name
  - Profile photo from:
    - Camera
    - Photo library
    - Manual URL
  - “Profile settings” panel with save + feedback
  - Share profile via the OS share sheet

- **Explore / Map screen**
  - Real `react-native-maps` map (pan & zoom)
  - Simple “From / To” mock route summary
  - Basic mock hotel search section
  - Search within your own trips & guides

- **UI / Theming**
  - Orange & white theme (`#F97316`)
  - Reusable styles for forms, lists, nav bar
  - Add-choice card and home hero sections

---

## Tech Stack

- **Core**
  - [Expo](https://expo.dev/)
  - React Native
  - TypeScript

- **Data & Auth**
  - Firebase Authentication
  - Cloud Firestore

- **Maps & Media**
  - `react-native-maps`
  - `expo-image-picker`

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or Yarn
- Expo CLI (`npx expo` works without a global install)
- A Firebase project (for Auth + Firestore)

### Install dependencies

From the project root:

npm install 

## License

MIT © Twstmotorsports

## Contact

email: jsperdido20@gmail.com

Maintainer: Twstmotorsports
- Repo: https://github.com/Twstmotorsports/Wander-Map





