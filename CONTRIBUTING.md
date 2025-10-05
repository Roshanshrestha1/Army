# Contributing to Gurkha Preparation Tracker

Thank you for your interest in contributing to the Gurkha Preparation Tracker! This guide will help you get started with contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Git
- Basic knowledge of React, Three.js, and web development

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/gurkha-preparation-tracker.git
   cd gurkha-preparation-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 How to Contribute

### Types of Contributions

#### 🐛 Bug Reports
- Use the GitHub issue template
- Include steps to reproduce
- Provide browser/device information
- Include screenshots if applicable

#### ✨ Feature Requests
- Check existing issues first
- Provide clear description and use case
- Consider implementation complexity
- Include mockups or examples if helpful

#### 🔧 Code Contributions
- Follow the coding standards
- Write meaningful commit messages
- Add tests for new features
- Update documentation

#### 📚 Documentation
- Fix typos and improve clarity
- Add examples and tutorials
- Update API documentation
- Translate content to Nepali

### Adding New Milestones

To add a new milestone to the preparation journey:

1. **Update the store** (`src/store/useAppStore.js`):
   ```javascript
   const newMilestone = {
     id: 'unique-milestone-id',
     name: 'Milestone Name',
     nepaliName: 'माइलस्टोन नाम',
     position: [x, y, z], // 3D coordinates for placement
     description: 'Detailed description of what this milestone involves',
     status: 'pending', // pending, in-progress, completed
     tasks: [
       {
         id: 'task-id',
         text: 'Task description',
         completed: false
       }
     ],
     resources: [
       {
         type: 'link', // link, pdf, video
         title: 'Resource Title',
         url: 'https://example.com'
       }
     ],
     timeline: {
       month: 6, // 1-12
       year: 2024
     }
   }
   ```

2. **Add to milestones array** in the `initialMilestones` constant

3. **Position in 3D space**:
   - Consider visual flow and logical progression
   - Ensure markers don't overlap
   - Test camera transitions between milestones

4. **Test the milestone**:
   - Verify it appears in all views
   - Check 3D positioning and interactions
   - Ensure tasks and resources work correctly

### Adding New Resources

To add study materials and resources:

1. **Update ResourcesView.jsx** (`src/components/Views/ResourcesView.jsx`):
   ```javascript
   const newResource = {
     id: 'resource-id',
     title: 'Resource Title',
     nepaliTitle: 'स्रोत शीर्षक',
     category: 'study', // study, fitness, application, inspiration
     type: 'pdf', // pdf, video, link
     description: 'Brief description of the resource',
     url: 'https://example.com',
     milestone: 'milestone-id' // Which milestone this relates to
   }
   ```

2. **Add to allResources array**

3. **Test resource functionality**:
   - Verify it appears in filtered views
   - Check download/watch/visit buttons work
   - Ensure proper categorization

### Customizing 3D Elements

#### Adding Custom Models
1. **Prepare your model**:
   - Use low-poly geometry for performance
   - Export as GLTF/GLB format
   - Optimize textures and materials

2. **Import in MilestoneMarker.jsx**:
   ```javascript
   import { useGLTF } from '@react-three/drei'
   
   function CustomModel({ modelPath }) {
     const { scene } = useGLTF(modelPath)
     return <primitive object={scene} />
   }
   ```

3. **Replace default sphere** with your custom model

#### Modifying Terrain
Edit `src/components/3D/Terrain.jsx`:
- Adjust geometry parameters for different terrain shapes
- Modify material properties for different looks
- Add texture maps for more detail

### Styling and Theming

#### Color Customization
Update `tailwind.config.js`:
```javascript
colors: {
  navy: {
    // Your custom navy blue shades
  },
  army: {
    // Your custom army green shades
  },
  accent: {
    // Your custom accent colors
  }
}
```

#### Component Styling
- Use Tailwind utility classes
- Follow the existing design patterns
- Maintain consistency with the design system
- Test on different screen sizes

### Adding New Views

1. **Create the view component** (`src/components/Views/NewView.jsx`):
   ```javascript
   import React from 'react'
   import { motion } from 'framer-motion'
   
   function NewView() {
     return (
       <div className="h-screen w-full overflow-y-auto pt-20 pb-6">
         <div className="max-w-6xl mx-auto px-6">
           {/* Your view content */}
         </div>
       </div>
     )
   }
   
   export default NewView
   ```

2. **Add to navigation** (`src/components/UI/Navigation.jsx`):
   ```javascript
   const navigationItems = [
     // ... existing items
     { id: 'new-view', label: 'New View', icon: YourIcon, nepaliLabel: 'नयाँ दृश्य' }
   ]
   ```

3. **Update App.jsx** to include the new view in the render function

4. **Add keyboard shortcut** in `useKeyboardNavigation.js`

## 🎨 Design Guidelines

### Visual Design
- **Consistency**: Follow existing patterns and components
- **Accessibility**: Ensure proper contrast ratios and focus states
- **Responsiveness**: Test on mobile, tablet, and desktop
- **Performance**: Optimize for smooth 60fps animations

### Code Style
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Comments**: Add meaningful comments for complex logic
- **Naming**: Use descriptive variable and function names

### Component Structure
```javascript
// 1. Imports
import React from 'react'
import { motion } from 'framer-motion'

// 2. Component definition
function ComponentName({ prop1, prop2 }) {
  // 3. Hooks
  const [state, setState] = useState()
  
  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  }
  
  // 5. Render
  return (
    <div>
      {/* JSX content */}
    </div>
  )
}

// 6. Export
export default ComponentName
```

## 🧪 Testing

### Manual Testing
- Test all interactive elements
- Verify responsive design on different devices
- Check accessibility with keyboard navigation
- Test data persistence and export/import

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Testing
- Check bundle size impact
- Test on low-end devices
- Verify 3D performance
- Monitor memory usage

## 📝 Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(milestones): add new SEE preparation milestone
fix(3d): resolve camera transition glitch
docs(readme): update installation instructions
style(ui): improve button hover states
```

## 🔄 Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines
3. **Test thoroughly** on multiple devices/browsers
4. **Update documentation** if needed
5. **Create a pull request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - Testing instructions

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Accessibility improvement

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested keyboard navigation
- [ ] Tested screen reader

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🐛 Reporting Issues

### Bug Reports
Use the bug report template and include:
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Environment details** (browser, OS, device)
- **Screenshots or videos**

### Feature Requests
Include:
- **Use case description**
- **Proposed solution**
- **Alternative solutions considered**
- **Additional context**

## 🌍 Internationalization

### Adding Nepali Translations
1. **Update component text**:
   ```javascript
   const text = {
     en: 'English text',
     ne: 'नेपाली पाठ'
   }
   ```

2. **Use language context**:
   ```javascript
   const { language } = useLanguage()
   return <span>{text[language]}</span>
   ```

3. **Test with different languages**

## 📚 Resources

### Learning Resources
- [React Documentation](https://react.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Project-Specific
- [3D Scene Architecture](README.md#3d-scene-architecture)
- [State Management](src/store/useAppStore.js)
- [Component Guidelines](CONTRIBUTING.md#design-guidelines)

## 💬 Community

### Getting Help
- **GitHub Discussions**: For questions and general discussion
- **GitHub Issues**: For bug reports and feature requests
- **Discord**: For real-time chat (link in README)

### Code of Conduct
- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Follow the project's mission

## 🎯 Roadmap

### Upcoming Features
- [ ] Multi-language support
- [ ] Advanced 3D models
- [ ] Progress analytics
- [ ] Community features
- [ ] Mobile app version

### Contribution Opportunities
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] New milestone content
- [ ] Resource library expansion
- [ ] Documentation improvements

---

Thank you for contributing to the Gurkha Preparation Tracker! Your efforts help make this tool more valuable for aspiring Gurkha soldiers. 🙏