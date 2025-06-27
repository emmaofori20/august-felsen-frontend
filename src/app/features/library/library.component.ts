import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: Date;
  readTime: number;
  views: number;
  tags: string[];
}

interface Resource {
  id: number;
  title: string;
  type: string;
  url: string;
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LibraryComponent implements OnInit {
  searchControl = new FormControl('');
  categories = ['Construction Management', 'Safety Standards', 'Building Codes', 'Project Planning', 'Quality Control', 'Sustainability', 'Technology', 'Industry News'];
  selectedCategory = '';
  sortOrder: 'newest' | 'oldest' = 'newest';
  currentPage = 1;
  totalPages = 3;
  itemsPerPage = 6;
  
  popularTags = ['Safety', 'Concrete', 'Steel', 'Electrical', 'Plumbing', 'HVAC', 'Green Building', 'BIM', 'Project Management', 'Quality Assurance'];
  
  articles: Article[] = [
    {
      id: 1,
      title: 'Modern Concrete Mixing Techniques for Enhanced Durability',
      excerpt: 'Explore advanced concrete mixing methods that improve strength, durability, and sustainability in modern construction projects.',
      content: 'Full article content would go here...',
      author: 'Dr. Sarah Johnson',
      category: 'Construction Management',
      date: new Date('2024-01-15'),
      readTime: 8,
      views: 1247,
      tags: ['Concrete', 'Durability', 'Mixing Techniques']
    },
    {
      id: 2,
      title: 'OSHA Safety Standards: A Complete Guide for Construction Sites',
      excerpt: 'Comprehensive overview of OSHA safety requirements and best practices for maintaining safe construction environments.',
      content: 'Full article content would go here...',
      author: 'Mike Chen',
      category: 'Safety Standards',
      date: new Date('2024-01-14'),
      readTime: 12,
      views: 2156,
      tags: ['Safety', 'OSHA', 'Compliance']
    },
    {
      id: 3,
      title: 'Building Information Modeling (BIM) in Modern Construction',
      excerpt: 'How BIM technology is revolutionizing project planning, coordination, and execution in the construction industry.',
      content: 'Full article content would go here...',
      author: 'Lisa Rodriguez',
      category: 'Technology',
      date: new Date('2024-01-13'),
      readTime: 10,
      views: 1893,
      tags: ['BIM', 'Technology', 'Project Planning']
    },
    {
      id: 4,
      title: 'Sustainable Building Materials: Eco-Friendly Construction Solutions',
      excerpt: 'Discover innovative sustainable materials and construction methods that reduce environmental impact.',
      content: 'Full article content would go here...',
      author: 'David Wilson',
      category: 'Sustainability',
      date: new Date('2024-01-12'),
      readTime: 7,
      views: 1567,
      tags: ['Sustainability', 'Green Building', 'Materials']
    },
    {
      id: 5,
      title: 'Quality Control Procedures for Structural Steel Construction',
      excerpt: 'Essential quality control measures and inspection procedures for structural steel projects.',
      content: 'Full article content would go here...',
      author: 'Robert Martinez',
      category: 'Quality Control',
      date: new Date('2024-01-11'),
      readTime: 9,
      views: 1342,
      tags: ['Steel', 'Quality Control', 'Inspection']
    },
    {
      id: 6,
      title: 'Electrical Code Updates: What Contractors Need to Know',
      excerpt: 'Latest updates to electrical building codes and their implications for construction projects.',
      content: 'Full article content would go here...',
      author: 'Jennifer Lee',
      category: 'Building Codes',
      date: new Date('2024-01-10'),
      readTime: 6,
      views: 987,
      tags: ['Electrical', 'Building Codes', 'Compliance']
    }
  ];

  downloadableResources: Resource[] = [
    {
      id: 1,
      title: 'Construction Safety Checklist',
      type: 'PDF',
      url: '/assets/resources/safety-checklist.pdf'
    },
    {
      id: 2,
      title: 'Project Planning Template',
      type: 'Excel',
      url: '/assets/resources/project-template.xlsx'
    },
    {
      id: 3,
      title: 'Quality Control Standards',
      type: 'PDF',
      url: '/assets/resources/quality-standards.pdf'
    },
    {
      id: 4,
      title: 'Building Code Reference Guide',
      type: 'PDF',
      url: '/assets/resources/building-codes.pdf'
    }
  ];

  filteredArticles: Article[] = [];

  constructor() {}

  ngOnInit() {
    this.filterArticles();
    
    // Set up search functionality
    this.searchControl.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.filterArticles();
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.currentPage = 1;
    this.filterArticles();
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'newest' ? 'oldest' : 'newest';
    this.filterArticles();
  }

  filterArticles() {
    let filtered = [...this.articles];
    
    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(article => article.category === this.selectedCategory);
    }
    
    // Filter by search term
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.author.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Sort articles
    filtered.sort((a, b) => {
      if (this.sortOrder === 'newest') {
        return b.date.getTime() - a.date.getTime();
      } else {
        return a.date.getTime() - b.date.getTime();
      }
    });
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredArticles = filtered.slice(startIndex, endIndex);
    
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterArticles();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterArticles();
    }
  }

  readArticle(article: Article) {
    // In a real app, this would navigate to the full article page
    alert(`Reading article: ${article.title}`);
  }

  bookmarkArticle(article: Article) {
    // In a real app, this would add to user's bookmarks
    alert(`Bookmarked: ${article.title}`);
  }

  downloadResource(resource: Resource) {
    // In a real app, this would trigger a download
    alert(`Downloading: ${resource.title}`);
  }
} 