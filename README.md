# <img src="https://github.com/siddiq0611/git_repo/blob/main/logo.png" alt="Book Icon" width="32"/> Kalpkatha
<h3> A Next.js-powered frontend that connects to a FastAPI backend service, providing an elegant dark-themed interface for generating creative stories from user prompts. Enter your idea, and watch as AI weaves it into a captivating narrative with rich details and structured storytelling. </h3>

<img src="https://github.com/siddiq0611/git_repo/blob/main/kalpkatha.png"
     alt="Kalpkatha Logo"
     width="720"
     align="center"
     />

## 🌐 Live Application
The application is hosted and running.  
You can access the page at: [kalpkatha](https://kalpkatha.vercel.app/)

## 🧠 Features
- ✨ AI-powered story generation using backend API
- 🎨 Dark-themed responsive UI built with Next.js and Tailwind CSS
- 🧩 Component-based architecture with React
- 📱 Mobile-friendly design that works across devices
- 🔄 Seamless API integration with loading states
- 📖 Beautifully formatted story display

## 📂 Project Structure
```bash
story-generator-frontend/
├── .env.local          # Environment configuration
├── .gitignore          # Git ignore file
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── public/             # Static assets
│   ├── favicon.ico     # Site favicon
│   └── logo.svg        # Site logo
└── src/
    ├── components/     # Reusable UI components
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── LoadingSpinner.tsx
    │   └── StoryForm.tsx
    ├── pages/          # Application pages
    │   ├── _app.tsx    # App wrapper
    │   ├── _document.tsx # Document setup
    │   ├── index.tsx   # Homepage
    │   └── api/        # API routes
    │       └── proxy.ts # Backend proxy
    ├── styles/         # CSS styles
    │   ├── globals.css
    │   └── Home.module.css
    └── types/          # TypeScript type definitions
        └── index.ts    # Type definitions
```

## ⚙️ Local Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Frontend Setup

1. Clone the Repository
```bash
git clone https://github.com/siddiq0611/kalpkatha_frontend.git
cd kalpkatha_frontend
```

2. Install Dependencies
```bash
npm install
# or
yarn install
```

3. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
BACKEND_API_URL=http://your-backend-url:port
```

4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser



## 🧪 API Integration

The frontend communicates with the backend through a proxy API route to avoid CORS issues:

### Generate Story
**Frontend Endpoint**: `POST /api/proxy`

**Request**:
```json
{
  "prompt": "Once upon a time in a cyberpunk future..."
}
```

**Response**:
```json
{
  "prompt_used": "Once upon a time in a cyberpunk future...",
  "story": "In the neon-drenched streets of Neo Tokyo, where holographic ads painted the night sky..."
}
```

This proxy forwards requests to the backend's `/api/generate-story` endpoint.

## 🛠 Technologies Used
- **Next.js & React** - Frontend framework
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **FastAPI** - Backend service (separate repository)

## 🔐 Security Notes
- The API proxy helps secure your backend by hiding the actual endpoint from client browsers
- Environment variables keep sensitive information out of your codebase
- Production deployments should use HTTPS for secure communication

## 📌 To-Do / Enhancements
- [ ] Add user accounts for saving favorite stories
- [ ] Implement story customization options (length, genre, style)
- [ ] Add social sharing capabilities
- [ ] Implement story history with localStorage
- [ ] Create a story gallery of public submissions

## 📜 License
MIT License © siddiq0611

## 🙌 Acknowledgements
- Thanks to [NextJS](https://nextjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- Inspired by a love for storytelling, coding, and imagination.

### Inspired by a love for storytelling, coding, and imagination.
