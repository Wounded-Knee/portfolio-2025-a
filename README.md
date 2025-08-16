# Joel Kramer - Portfolio Website

A modern, responsive portfolio website for Joel Kramer, a Senior Full-Stack Software Engineer with a focus on frontend development.

## 🚀 Features

- **Fully Responsive**: Optimized for all device sizes and resolutions
- **Modern Design**: Clean, professional design with smooth animations
- **Dark Mode Support**: Built-in dark/light theme support
- **Static Export**: Optimized for static hosting
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Performance**: Fast loading with optimized images and code splitting

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Deployment**: Static export ready

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles and CSS variables
├── components/
│   ├── Navigation.tsx     # Responsive navigation
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Experience.tsx    # Work experience timeline
│   ├── Skills.tsx        # Skills and technologies
│   ├── Projects.tsx      # Portfolio projects
│   └── Contact.tsx       # Contact form and info
├── lib/                  # Utility functions
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-2025-a
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To build the static site:

```bash
npm run build
```

The static files will be generated in the `out/` directory, ready for deployment to any static hosting service.

## 🎨 Customization

### Personal Information

Update the following files to customize the portfolio:

- `src/app/layout.tsx` - Update metadata and title
- `src/components/Hero.tsx` - Update name and title
- `src/components/About.tsx` - Update personal description
- `src/components/Experience.tsx` - Update work experience
- `src/components/Skills.tsx` - Update skills and proficiency levels
- `src/components/Projects.tsx` - Update portfolio projects
- `src/components/Contact.tsx` - Update contact information

### Styling

The project uses Tailwind CSS with custom CSS variables for theming. Main styling files:

- `src/app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration

### Colors and Theme

The portfolio uses a blue-based color scheme that can be customized by updating the CSS variables in `globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Blue */
  --background: 0 0% 100%;      /* White */
  --foreground: 222.2 84% 4.9%; /* Dark gray */
}
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Static Hosting

This project is configured for static export. Build the project and deploy the `out/` directory to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any other static hosting provider

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Deployment

```bash
npm run build
# Upload the contents of the 'out' directory to your hosting provider
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please reach out to Joel Kramer at joel.kramer@example.com
