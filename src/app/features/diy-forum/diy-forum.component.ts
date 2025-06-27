import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  date: Date;
  replies: number;
  likes: number;
}

@Component({
  selector: 'app-diy-forum',
  templateUrl: './diy-forum.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,DatePipe]
})
export class DiyForumComponent implements OnInit {
  postForm: FormGroup;
  searchControl: any;
  categories = ['General DIY', 'Electrical', 'Plumbing', 'Carpentry', 'Masonry', 'Painting', 'Landscaping', 'Tools & Equipment'];
  selectedCategory = '';
  
  posts: ForumPost[] = [
    {
      id: 1,
      title: 'Best practices for concrete mixing ratios',
      content: 'I\'m working on a small patio project and need advice on the proper concrete mixing ratios for outdoor use. What mix should I use for durability?',
      author: 'Mike Johnson',
      category: 'Masonry',
      date: new Date('2024-01-15'),
      replies: 8,
      likes: 12
    },
    {
      id: 2,
      title: 'Electrical safety tips for DIY projects',
      content: 'Planning to install some new outlets in my garage. What are the essential safety precautions I should take before starting?',
      author: 'Sarah Williams',
      category: 'Electrical',
      date: new Date('2024-01-14'),
      replies: 15,
      likes: 23
    },
    {
      id: 3,
      title: 'Choosing the right paint for bathroom walls',
      content: 'Need recommendations for moisture-resistant paint that will hold up well in a humid bathroom environment.',
      author: 'David Chen',
      category: 'Painting',
      date: new Date('2024-01-13'),
      replies: 6,
      likes: 9
    },
    {
      id: 4,
      title: 'DIY deck building - foundation questions',
      content: 'Building a wooden deck and unsure about the proper foundation requirements. Should I use concrete footings or can I use deck blocks?',
      author: 'Lisa Rodriguez',
      category: 'Carpentry',
      date: new Date('2024-01-12'),
      replies: 11,
      likes: 18
    }
  ];

  filteredPosts: ForumPost[] = [];

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.searchControl = this.fb.control('');
  }

  ngOnInit() {
    this.filteredPosts = [...this.posts];
    
    // Set up search functionality
    this.searchControl.valueChanges.subscribe((searchTerm: string) => {
      this.filterPosts();
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.filterPosts();
  }

  filterPosts() {
    let filtered = [...this.posts];
    
    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(post => post.category === this.selectedCategory);
    }
    
    // Filter by search term
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.toLowerCase().includes(searchTerm)
      );
    }
    
    this.filteredPosts = filtered;
  }

  addPost() {
    if (this.postForm.valid) {
      const newPost: ForumPost = {
        id: this.posts.length + 1,
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        author: 'Current User', // In a real app, this would come from auth service
        category: this.postForm.value.category,
        date: new Date(),
        replies: 0,
        likes: 0
      };
      
      this.posts.unshift(newPost);
      this.filterPosts();
      this.postForm.reset();
    }
  }
} 