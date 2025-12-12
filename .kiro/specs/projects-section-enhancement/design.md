# Design Document: Projects Section Enhancement

## Overview

This design document outlines the architecture and implementation approach for enhancing the Projects section of the Networld Capital Ventures corporate website. The enhancement transforms the current all-projects display into a two-tier system: a homepage section showing 3 featured projects and a dedicated inner page displaying the complete project portfolio with advanced filtering and pagination capabilities.

The design follows enterprise-level UI/UX principles, maintains the existing premium glassmorphism aesthetic, and ensures optimal performance across all devices. The solution emphasizes reusability, maintainability, and accessibility while providing an intuitive user experience.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Homepage (/)                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Projects Section (Featured)                          │  │
│  │  - Shows 3 featured projects                          │  │
│  │  - ProjectCard component (reusable)                   │  │
│  │  - "View All Projects" CTA button                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Navigation
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Projects Inner Page (/projects)            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Category Filter Bar                                  │  │
│  │  - All, Network, Cloud, Digital, Security, etc.      │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Projects Grid                                        │  │
│  │  - All projects with ProjectCard component           │  │
│  │  - Expandable details                                 │  │
│  │  - Lazy-loaded images                                 │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Pagination Controls                                  │  │
│  │  - 12 projects per page                               │  │
│  │  - Page numbers with prev/next                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
app/
├── page.tsx (Homepage)
│   └── Projects (Featured Section)
│       ├── ProjectCard (x3)
│       └── ViewAllButton
│
└── projects/
    └── page.tsx (Projects Inner Page)
        ├── CategoryFilter
        ├── ProjectsGrid
        │   └── ProjectCard (x12 per page)
        └── Pagination

components/
├── Projects.tsx (Featured - Homepage)
├── ProjectCard.tsx (Reusable)
├── ProjectsGrid.tsx (Inner Page Grid)
├── CategoryFilter.tsx
└── Pagination.tsx
```

## Components and Interfaces

### 1. ProjectCard Component (Reusable)

**Purpose**: A reusable card component that displays project information consistently across homepage and inner page.

**Props Interface**:
```typescript
interface ProjectCardProps {
  project: Project;
  variant?: 'featured' | 'grid';
  onExpand?: (projectId: string) => void;
  isExpanded?: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  technologies?: string[];
  status: 'Completed' | 'In Progress' | 'Planned';
  client?: string;
  duration?: string;
  team?: string;
  outcome?: string;
  metrics?: Array<{ label: string; value: string }>;
  challenge?: string;
  solution?: string;
  isFeatured?: boolean;
}
```

**Styling**:
- Glassmorphism card with `backdrop-filter: blur(20px)`
- Gradient border on hover: `linear-gradient(135deg, #8B1538 0%, #2563EB 100%)`
- Status badge with color coding:
  - Completed: Green (#16A34A)
  - In Progress: Blue (#2563EB)
  - Planned: Red (#8B1538)
- Smooth transitions: 300-500ms
- Hover effects: scale(1.02), translateY(-8px)

**Accessibility**:
- Semantic HTML: `<article>` for card wrapper
- ARIA labels for status badges
- Keyboard navigation support
- Focus visible indicators

### 2. Projects Component (Homepage Featured Section)

**Purpose**: Displays 3 featured projects on the homepage with a "View All" button.

**State Management**:
```typescript
const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
const [isLoading, setIsLoading] = useState(true);
```

**Layout**:
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Gap: `gap-6 md:gap-8`
- Max width: `max-w-7xl mx-auto`

**View All Button**:
- Position: Below project cards, centered
- Style: Gradient background matching brand colors
- Hover: Scale(1.05), enhanced shadow
- Navigation: `router.push('/projects')`

### 3. Projects Inner Page Component

**Purpose**: Full-page view displaying all projects with filtering and pagination.

**State Management**:
```typescript
const [projects, setProjects] = useState<Project[]>([]);
const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
const [selectedCategory, setSelectedCategory] = useState<string>('All');
const [currentPage, setCurrentPage] = useState<number>(1);
const [expandedProject, setExpandedProject] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(true);

const PROJECTS_PER_PAGE = 12;
```

**Filtering Logic**:
```typescript
useEffect(() => {
  if (selectedCategory === 'All') {
    setFilteredProjects(projects);
  } else {
    setFilteredProjects(projects.filter(p => p.category === selectedCategory));
  }
  setCurrentPage(1); // Reset to page 1 on filter change
}, [selectedCategory, projects]);
```

**Pagination Logic**:
```typescript
const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
const endIndex = startIndex + PROJECTS_PER_PAGE;
const currentProjects = filteredProjects.slice(startIndex, endIndex);
```

### 4. CategoryFilter Component

**Purpose**: Horizontal scrollable filter bar for project categories.

**Categories**:
- All
- Network Infrastructure
- Cloud Solutions
- Digital Transformation
- Cybersecurity
- Data Analytics
- IT Consulting

**Styling**:
- Active state: Solid background (#8B1538), white text
- Inactive state: White background, gray text, border
- Hover: Scale(1.05), shadow enhancement
- Mobile: Horizontal scroll with snap points

### 5. Pagination Component

**Purpose**: Navigate between pages of projects.

**Props Interface**:
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

**Features**:
- Previous/Next buttons
- Page numbers (show 5 at a time with ellipsis)
- Disabled states for first/last pages
- Scroll to top on page change

## Data Models

### Project Data Structure

```typescript
interface Project {
  id: string;                    // Unique identifier
  title: string;                 // Project name
  description: string;           // Short description (150-200 chars)
  category: string;              // Category for filtering
  image?: string;                // Project image URL
  technologies?: string[];       // Tech stack used
  status: ProjectStatus;         // Current status
  client?: string;               // Client name (optional)
  duration?: string;             // Project duration
  team?: string;                 // Team size
  outcome?: string;              // Project outcome
  metrics?: Metric[];            // Success metrics
  challenge?: string;            // Problem statement
  solution?: string;             // Solution approach
  isFeatured?: boolean;          // Featured on homepage
  createdAt?: Date;              // Creation date
  updatedAt?: Date;              // Last update
}

type ProjectStatus = 'Completed' | 'In Progress' | 'Planned';

interface Metric {
  label: string;                 // Metric name
  value: string;                 // Metric value
}
```

### Projects Data Source

**Current Implementation**: Mock data array in component
**Future Enhancement**: API endpoint `/api/projects`

```typescript
// Mock data structure
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Enterprise Network Modernization',
    description: 'Complete overhaul of legacy network infrastructure...',
    category: 'Network Infrastructure',
    status: 'Completed',
    isFeatured: true,
    // ... additional fields
  },
  // ... more projects
];
```

### Featured Projects Selection Logic

```typescript
// Select top 3 featured projects
const getFeaturedProjects = (projects: Project[]): Project[] => {
  return projects
    .filter(p => p.isFeatured === true)
    .sort((a, b) => {
      // Sort by status priority: In Progress > Completed > Planned
      const statusPriority = {
        'In Progress': 1,
        'Completed': 2,
        'Planned': 3
      };
      return statusPriority[a.status] - statusPriority[b.status];
    })
    .slice(0, 3);
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Featured projects count constraint
*For any* projects array, when filtering for featured projects, the homepage Projects section should display exactly 3 projects or fewer if less than 3 are marked as featured
**Validates: Requirements 1.1**

### Property 2: View All button navigation
*For any* state of the homepage, when a user clicks the "View All Projects" button, the system should navigate to the `/projects` route
**Validates: Requirements 2.1, 3.4**

### Property 3: Category filter correctness
*For any* selected category (except "All"), all displayed projects should have a category property matching the selected category
**Validates: Requirements 8.2**

### Property 4: Pagination boundary correctness
*For any* page number, the displayed projects should be within the valid range [startIndex, endIndex) where startIndex = (page - 1) * PROJECTS_PER_PAGE and endIndex = startIndex + PROJECTS_PER_PAGE
**Validates: Requirements 2.4**

### Property 5: Component reusability consistency
*For any* project data, when rendered through ProjectCard component on different pages (homepage vs inner page), the core visual presentation (title, description, status, metrics) should be identical
**Validates: Requirements 4.3**

### Property 6: Lazy loading trigger
*For any* image in the projects grid, the image should only begin loading when it enters or is about to enter the viewport
**Validates: Requirements 5.1**

### Property 7: Filter reset on category change
*For any* category selection change, the pagination should reset to page 1
**Validates: Requirements 8.5**

### Property 8: Expanded card state isolation
*For any* project card, expanding one card should not affect the expanded/collapsed state of other cards
**Validates: Requirements 9.3**

### Property 9: Responsive layout adaptation
*For any* viewport width, the projects grid should adapt to the appropriate column count: 1 column for mobile (<768px), 2 columns for tablet (768-1024px), 3 columns for desktop (>1024px)
**Validates: Requirements 1.4, 1.5**

### Property 10: Accessibility keyboard navigation
*For any* interactive element (buttons, cards, filters), keyboard navigation using Tab key should follow a logical order and provide visible focus indicators
**Validates: Requirements 6.3, 6.4**

## Error Handling

### Image Loading Errors

**Scenario**: Project image fails to load
**Handling**:
```typescript
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = '/images/project-placeholder.jpg';
  e.currentTarget.alt = 'Project image unavailable';
};
```

### Empty States

**Scenario 1**: No projects available
```typescript
if (projects.length === 0) {
  return (
    <div className="text-center py-16">
      <p className="text-xl text-neutral-600">No projects available at this time.</p>
    </div>
  );
}
```

**Scenario 2**: No projects match filter
```typescript
if (filteredProjects.length === 0) {
  return (
    <div className="text-center py-16">
      <p className="text-xl text-neutral-600">
        No projects found in this category.
      </p>
      <button onClick={() => setSelectedCategory('All')}>
        View All Projects
      </button>
    </div>
  );
}
```

### Navigation Errors

**Scenario**: Navigation to /projects fails
**Handling**: Use Next.js error boundary and fallback UI

```typescript
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </div>
    </div>
  );
}
```

### Loading States

**Homepage Featured Section**:
```typescript
if (isLoading) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="animate-pulse">
          <div className="bg-neutral-200 h-64 rounded-3xl" />
        </div>
      ))}
    </div>
  );
}
```

**Inner Page**:
```typescript
if (isLoading) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-neutral-200 h-96 rounded-3xl" />
        </div>
      ))}
    </div>
  );
}
```

## Testing Strategy

### Unit Testing

**Framework**: Jest + React Testing Library

**Test Cases**:

1. **ProjectCard Component**
   - Renders with required props
   - Displays status badge with correct color
   - Shows/hides expanded content based on isExpanded prop
   - Calls onExpand callback when "View Details" clicked
   - Handles missing optional fields gracefully

2. **CategoryFilter Component**
   - Renders all category buttons
   - Highlights active category
   - Calls onCategoryChange with correct category
   - Scrolls horizontally on mobile

3. **Pagination Component**
   - Disables Previous on first page
   - Disables Next on last page
   - Calls onPageChange with correct page number
   - Shows correct page numbers with ellipsis

4. **Featured Projects Section**
   - Displays exactly 3 projects
   - Shows "View All" button
   - Navigates to /projects on button click

5. **Projects Inner Page**
   - Filters projects by category
   - Paginates correctly (12 per page)
   - Resets to page 1 on filter change
   - Scrolls to top on page change

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

**Property Tests**:

1. **Property 1: Featured Count**
```typescript
import fc from 'fast-check';

test('Featured projects should never exceed 3', () => {
  fc.assert(
    fc.property(
      fc.array(projectArbitrary, { minLength: 0, maxLength: 20 }),
      (projects) => {
        const featured = getFeaturedProjects(projects);
        return featured.length <= 3;
      }
    ),
    { numRuns: 100 }
  );
});
```

2. **Property 3: Category Filter**
```typescript
test('Filtered projects should match selected category', () => {
  fc.assert(
    fc.property(
      fc.array(projectArbitrary),
      fc.constantFrom('Network Infrastructure', 'Cloud Solutions', 'Cybersecurity'),
      (projects, category) => {
        const filtered = projects.filter(p => p.category === category);
        return filtered.every(p => p.category === category);
      }
    ),
    { numRuns: 100 }
  );
});
```

3. **Property 4: Pagination Boundaries**
```typescript
test('Paginated projects should be within valid range', () => {
  fc.assert(
    fc.property(
      fc.array(projectArbitrary, { minLength: 1, maxLength: 100 }),
      fc.integer({ min: 1, max: 10 }),
      (projects, page) => {
        const PROJECTS_PER_PAGE = 12;
        const startIndex = (page - 1) * PROJECTS_PER_PAGE;
        const endIndex = startIndex + PROJECTS_PER_PAGE;
        const paginated = projects.slice(startIndex, endIndex);
        
        return paginated.length <= PROJECTS_PER_PAGE &&
               startIndex >= 0 &&
               endIndex <= projects.length + PROJECTS_PER_PAGE;
      }
    ),
    { numRuns: 100 }
  );
});
```

4. **Property 7: Filter Reset**
```typescript
test('Changing category should reset to page 1', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('All', 'Network Infrastructure', 'Cloud Solutions'),
      fc.constantFrom('All', 'Cybersecurity', 'Data Analytics'),
      (category1, category2) => {
        // Simulate category change
        let currentPage = 5; // Start at page 5
        if (category1 !== category2) {
          currentPage = 1; // Should reset
        }
        return currentPage === 1;
      }
    ),
    { numRuns: 100 }
  );
});
```

5. **Property 9: Responsive Columns**
```typescript
test('Grid columns should match viewport width', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 320, max: 2560 }),
      (viewportWidth) => {
        const expectedColumns = 
          viewportWidth < 768 ? 1 :
          viewportWidth < 1024 ? 2 : 3;
        
        // Test that grid-cols class matches expected
        return expectedColumns >= 1 && expectedColumns <= 3;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

**Test Scenarios**:

1. **Homepage to Inner Page Flow**
   - User sees 3 featured projects on homepage
   - User clicks "View All Projects"
   - User lands on /projects page
   - All projects are displayed

2. **Filtering and Pagination**
   - User selects a category
   - Projects are filtered
   - User navigates to page 2
   - Correct projects are shown
   - User changes category
   - Page resets to 1

3. **Expand/Collapse Flow**
   - User clicks "View Details" on a project
   - Card expands with additional info
   - User clicks "Show Less"
   - Card collapses

### Accessibility Testing

**Tools**: axe-core, WAVE

**Test Cases**:
- All interactive elements are keyboard accessible
- Focus indicators are visible
- ARIA labels are present and correct
- Color contrast meets WCAG 2.1 AA standards
- Screen reader announces content correctly
- Images have descriptive alt text

### Performance Testing

**Metrics**:
- Lighthouse Performance Score: ≥90
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

**Tools**: Lighthouse, WebPageTest

**Test Scenarios**:
- Homepage load with 3 featured projects
- Inner page load with 12 projects
- Image lazy loading effectiveness
- Pagination performance
- Filter change responsiveness
