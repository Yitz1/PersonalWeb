# Portfolio Terminal Site

## Overview

This is a single-page web application that mimics the look and feel of a 1990s financial terminal, serving as a personal portfolio website. The application is built using vanilla HTML, CSS, and JavaScript with real-time market data integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (July 14, 2025)

- Removed all Bloomberg branding and references
- Updated terminal name to "Portfolio Terminal"
- Implemented real-time UTC clock display
- Added live market data integration with Alpha Vantage API
- Removed quick links sidebar section
- Updated personal information:
  - Name changed from Yitz to Isaac Friedman
  - Added email: iyfrdmn@gmail.com
  - Updated background to include Jerusalem studies, Bar-Ilan MBA, Miami residence

## System Architecture

### Frontend Architecture
- **Single-page application** built with vanilla web technologies
- **No build process** - runs directly in the browser
- **Responsive design** with CSS Grid for layout management
- **Terminal-style interface** with monospace fonts and dark theme

### Technology Stack
- HTML5 for structure
- CSS3 for styling (including CSS Grid and Flexbox)
- Vanilla JavaScript for interactivity
- Python HTTP server for configuration and API key management
- Alpha Vantage API for real-time market data
- IBM Plex Mono font for authentic terminal appearance

## Key Components

### User Interface Components
1. **Status Bar** - Fixed top bar with terminal logo, live market ticker, and real-time UTC clock
2. **Command Interface** - Input field with autocomplete for terminal-style commands
3. **Content Area** - Main display area for command results
4. **Help Panel** - Right sidebar with command help information
5. **Function Key Bar** - Bottom navigation with F-key shortcuts

### JavaScript Controller
- **BloombergTerminal class** - Main application controller
- **Command system** - Maps commands to actions (display content or open links)
- **Autocomplete system** - Provides real-time command suggestions
- **Clock and ticker** - Live updating time and market data simulation

### Command System
The application supports the following commands:
- `YITZ` - Display about me information
- `SUB` - Open Substack profile
- `TWIT` - Open Twitter profile
- `STRA` - Open Strava profile
- `LINK` - Open LinkedIn profile
- `READ` - Open Goodreads currently reading shelf
- `HELP` - Display help information

## Data Flow

1. **User Input** - Commands entered via text input or function key clicks
2. **Command Processing** - JavaScript maps commands to predefined actions
3. **Content Display** - Either renders content in the main area or opens external links
4. **Real-time Updates** - Clock updates every second, ticker scrolls continuously

## External Dependencies

### Fonts
- **Google Fonts** - IBM Plex Mono for authentic terminal typography
- **Fallbacks** - Source Code Pro and generic monospace fonts

### External Links
- Substack: https://yitz.substack.com/
- Twitter: https://twitter.com/yitzzzzz
- Strava: https://www.strava.com/athletes/114904137
- LinkedIn: https://www.linkedin.com/in/isaac-friedman-983948202/
- Goodreads: Custom profile URL for currently reading shelf

### Assets
- Terminal logo SVG with "T" branding
- Live market data from Alpha Vantage API
- Real-time UTC clock display

## Deployment Strategy

### Python Server
- **Custom Python HTTP server** - Handles configuration and API key injection
- **Environment variable integration** - Securely exposes API keys to client
- **Static file serving** - Serves HTML, CSS, JS, and assets

### Browser Compatibility
- **Modern browsers** - Uses CSS Grid and ES6 classes
- **Progressive enhancement** - Degrades gracefully on older browsers
- **Mobile responsive** - Viewport meta tag and responsive CSS

### Performance Considerations
- **Minimal dependencies** - Only Google Fonts external dependency
- **Inline functionality** - All JavaScript and CSS in dedicated files
- **Efficient animations** - CSS transforms for smooth ticker animation

### Security
- **Client-side only** - No server-side vulnerabilities
- **External links** - Open in new tabs with appropriate attributes
- **No user data storage** - Stateless application with no persistence

## Development Notes

The application uses a clean separation of concerns:
- HTML provides semantic structure
- CSS handles all styling and layout
- JavaScript manages interactivity and dynamic content

The terminal aesthetic is achieved through:
- Dark color scheme (`#000814` background, `#32FF32` text)
- Orange accent color (`#F7A600`) for branding
- Monospace typography for authentic terminal feel
- Command-line interface metaphor for navigation