import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  budget: string;
  location: string;
  date: Date;
  deadline: Date;
  bids: number;
  postedBy: string;
}

@Component({
  selector: 'app-job-bidding',
  templateUrl: './job-bidding.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgIf]
})
export class JobBiddingComponent implements OnInit {
  jobForm: FormGroup;
  searchControl: any;
  filterCategory: any;
  categories = ['Residential Construction', 'Commercial Construction', 'Infrastructure', 'Renovation', 'Electrical', 'Plumbing', 'HVAC', 'Landscaping', 'Demolition', 'Foundation Work'];
  
  jobs: Job[] = [
    {
      id: 1,
      title: 'Commercial Office Building Foundation',
      description: 'Need foundation work for a 3-story commercial office building. Site is cleared and ready for construction. Looking for experienced contractor with commercial foundation experience.',
      category: 'Foundation Work',
      budget: '$25K - $50K',
      location: 'Austin, TX',
      date: new Date('2024-01-15'),
      deadline: new Date('2024-02-15'),
      bids: 8,
      postedBy: 'ABC Development Corp'
    },
    {
      id: 2,
      title: 'Residential Kitchen Renovation',
      description: 'Complete kitchen renovation including cabinets, countertops, flooring, and appliances. 200 sq ft space. Looking for quality workmanship and attention to detail.',
      category: 'Renovation',
      budget: '$10K - $25K',
      location: 'Dallas, TX',
      date: new Date('2024-01-14'),
      deadline: new Date('2024-02-10'),
      bids: 12,
      postedBy: 'Homeowner'
    },
    {
      id: 3,
      title: 'Highway Bridge Maintenance',
      description: 'Annual maintenance and inspection of 2-lane highway bridge. Includes structural assessment, concrete repairs, and safety upgrades. DOT certified contractors only.',
      category: 'Infrastructure',
      budget: '$50K+',
      location: 'Houston, TX',
      date: new Date('2024-01-13'),
      deadline: new Date('2024-03-01'),
      bids: 5,
      postedBy: 'Texas DOT'
    },
    {
      id: 4,
      title: 'Electrical Panel Upgrade',
      description: 'Upgrade residential electrical panel from 100A to 200A service. House built in 1980s. Need licensed electrician with experience in panel upgrades.',
      category: 'Electrical',
      budget: '$5K - $10K',
      location: 'San Antonio, TX',
      date: new Date('2024-01-12'),
      deadline: new Date('2024-02-20'),
      bids: 15,
      postedBy: 'Property Manager'
    },
    {
      id: 5,
      title: 'Landscaping and Irrigation System',
      description: 'Complete landscaping project for new residential development. 50 homes, each with front and back yard landscaping including irrigation systems, trees, and hardscaping.',
      category: 'Landscaping',
      budget: '$25K - $50K',
      location: 'Fort Worth, TX',
      date: new Date('2024-01-11'),
      deadline: new Date('2024-03-15'),
      bids: 6,
      postedBy: 'Greenfield Development'
    }
  ];

  filteredJobs: Job[] = [];

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      budget: ['', Validators.required],
      location: ['', Validators.required],
      deadline: ['', Validators.required]
    });
    
    this.searchControl = this.fb.control('');
    this.filterCategory = this.fb.control('');
  }

  ngOnInit() {
    this.filteredJobs = [...this.jobs];
    
    // Set up search functionality
    this.searchControl.valueChanges.subscribe(() => {
      this.filterJobs();
    });
    
    // Set up category filter
    this.filterCategory.valueChanges.subscribe(() => {
      this.filterJobs();
    });
  }

  filterJobs() {
    let filtered = [...this.jobs];
    
    // Filter by category
    const selectedCategory = this.filterCategory.value;
    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }
    
    // Filter by search term
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm) ||
        job.postedBy.toLowerCase().includes(searchTerm)
      );
    }
    
    this.filteredJobs = filtered;
  }

  postJob() {
    if (this.jobForm.valid) {
      const newJob: Job = {
        id: this.jobs.length + 1,
        title: this.jobForm.value.title,
        description: this.jobForm.value.description,
        category: this.jobForm.value.category,
        budget: this.jobForm.value.budget,
        location: this.jobForm.value.location,
        date: new Date(),
        deadline: new Date(this.jobForm.value.deadline),
        bids: 0,
        postedBy: 'Current User' // In a real app, this would come from auth service
      };
      
      this.jobs.unshift(newJob);
      this.filterJobs();
      this.jobForm.reset();
    }
  }

  viewBids(job: Job) {
    // In a real app, this would open a modal or navigate to a bids page
    alert(`Viewing ${job.bids} bids for: ${job.title}`);
  }

  submitBid(job: Job) {
    // In a real app, this would open a bid submission form
    alert(`Submitting bid for: ${job.title}`);
  }
} 