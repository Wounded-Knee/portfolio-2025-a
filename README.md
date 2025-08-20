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

### 📊 Data Management

All professional data for the portfolio is stored in JSON files within the `src/data/` directory. This approach allows for easy content management and updates without modifying the core application code.

#### JSON Data Files

- **`projects.json`** - Portfolio projects and case studies
  - Contains project details including title, description, technologies used, live URLs, GitHub links, and featured status
  - Each project is linked to a client via `clientId`
  - Includes image references and categorization (frontend, fullstack, etc.)

- **`experiences.json`** - Work experience and employment history
  - Job titles, company information, time periods, and role descriptions
  - Technology stacks used in each position
  - Remote work status and location information
  - Linked to clients via `clientId`

- **`clients.json`** - Company and client information
  - Company names, logos, and website URLs
  - Client categorization and relationship details
  - Used to populate project and experience sections

- **`technologies.json`** - Technical skills and proficiency levels
  - Technology names, logos, and official documentation URLs
  - Proficiency levels (0-100 scale) for skill assessment
  - Used across projects, experiences, and skills sections

- **`testimonials.json`** - Client and colleague testimonials
  - Quote content, author information, and professional titles
  - Company affiliations and testimonial photos
  - Featured status for priority display

- **`certifications.json`** - Professional certifications and achievements
  - Certification names, issuing organizations, and dates
  - Credential IDs and verification URLs
  - Expiration dates and renewal information

### Data Structure Benefits

- **Separation of Concerns**: Content is separated from presentation logic
- **Easy Updates**: Modify JSON files to update portfolio content without touching code
- **Version Control**: Track content changes separately from application changes
- **Reusability**: Data can be easily exported or imported for other applications
- **Consistency**: Centralized data ensures consistency across all portfolio sections

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

For questions or support, please reach out to Joel Kramer at jpkramer707_github@mm.st
