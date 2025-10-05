# Gurkha Preparation Tracker

A comprehensive 3D interactive web application designed to help aspiring Gurkha soldiers track their preparation journey. Built with React, Three.js, and modern web technologies.

## 🎯 Features

### Core Functionality
- **3D Interactive Journey Map**: Navigate through your preparation milestones in a beautiful 3D environment
- **Progress Tracking**: Monitor your completion status across all preparation phases
- **Task Management**: Detailed checklists for each milestone with real-time progress updates
- **Resource Library**: Access study materials, test papers, and preparation guides
- **Timeline View**: Visual timeline of your preparation journey
- **Physical Training Tracker**: Monitor fitness goals and training progress

### Advanced Features
- **Fullscreen Mode**: Toggle between normal and fullscreen viewing modes
- **PDF Viewer**: Built-in PDF viewer with page navigation, zoom controls, and fullscreen support
- **Responsive Design**: Optimized for desktop and mobile devices
- **Performance Mode**: Low-performance mode for older devices
- **Data Export/Import**: Save and restore your progress
- **Keyboard Navigation**: Full keyboard accessibility support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Roshanshrestha1/Army.git
   cd Army
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/
│   ├── 3D/                 # 3D scene components
│   │   ├── CameraController.jsx
│   │   ├── JourneyMap3D.jsx
│   │   ├── MilestoneMarker.jsx
│   │   ├── Scene3D.jsx
│   │   └── Terrain.jsx
│   ├── UI/                 # User interface components
│   │   ├── FlippingBookViewer.jsx
│   │   ├── Navigation.jsx
│   │   ├── SidePanel.jsx
│   │   └── StatusBar.jsx
│   ├── Views/              # Main view components
│   │   ├── AboutView.jsx
│   │   ├── ChecklistView.jsx
│   │   ├── DetailedTestPrepView.jsx
│   │   ├── HomeView.jsx
│   │   ├── PhysicalTrainingView.jsx
│   │   ├── ProgressView.jsx
│   │   ├── ResourcesView.jsx
│   │   ├── RoadmapHomeView.jsx
│   │   ├── TestPapersView.jsx
│   │   └── TimelineView.jsx
│   └── Onboarding.jsx
├── hooks/                  # Custom React hooks
│   └── useKeyboardNavigation.js
├── store/                  # State management
│   ├── useAppStore.js
│   └── useAuthStore.js
├── utils/                  # Utility functions
│   └── apiClient.js
├── App.jsx                 # Main application component
├── index.css              # Global styles
└── main.jsx               # Application entry point
```

## 🎮 Usage

### Navigation
- **Desktop**: Use the left sidebar to navigate between different views
- **Mobile**: Tap the menu button in the top-left corner
- **Keyboard**: Use Tab to navigate, Enter to select, Escape to close modals

### Fullscreen Mode
- Click the maximize/minimize button in the navigation header
- In PDF viewer, click the fullscreen button in the top-right corner
- Press Escape to exit fullscreen mode

### PDF Viewer
- **Navigation**: Use arrow buttons or page numbers to navigate
- **Zoom**: Use zoom in/out buttons or reset zoom
- **Fullscreen**: Click the maximize button for fullscreen viewing
- **Download**: Click the download button to save PDFs locally

### Progress Tracking
- Mark tasks as complete by clicking the circle icons
- View overall progress in the status bar
- Export your progress data for backup
- Import previously saved progress data

## 🛠️ Technologies Used

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Three.js**: 3D graphics and WebGL rendering
- **React Three Fiber**: React renderer for Three.js
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library

### State Management
- **Zustand**: Lightweight state management
- **Persist Middleware**: Data persistence across sessions

### Build Tools
- **Vite**: Fast build tool and development server
- **PostCSS**: CSS processing
- **Autoprefixer**: Automatic vendor prefixing

## 🎨 Customization

### Styling
The application uses Tailwind CSS with custom color schemes. You can modify colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'army': {
        400: '#your-color',
        500: '#your-color',
        // ... more shades
      }
    }
  }
}
```

### Adding New Milestones
Edit the `initialMilestones` array in `src/store/useAppStore.js`:

```javascript
{
  id: 'your-milestone',
  name: 'Your Milestone',
  nepaliName: 'तपाईंको माइलस्टोन',
  position: [x, y, z], // 3D coordinates
  description: 'Description of your milestone',
  status: 'pending',
  tasks: [
    { id: 'task-1', text: 'Your task', completed: false }
  ],
  resources: [
    { type: 'link', title: 'Resource Title', url: '#' }
  ],
  timeline: { month: 1, year: 2024 }
}
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Gurkha soldiers for their service and inspiration
- Three.js community for excellent 3D web graphics
- React team for the amazing framework
- All contributors and supporters

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Roshanshrestha1/Army/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🔄 Changelog

### Version 1.0.0
- Initial release
- 3D interactive journey map
- Progress tracking system
- PDF viewer with fullscreen support
- Responsive design
- Fullscreen mode toggle
- Data export/import functionality

---

**Made with ❤️ for aspiring Gurkha soldiers**
