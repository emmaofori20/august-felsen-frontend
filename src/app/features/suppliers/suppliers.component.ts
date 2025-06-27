import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Supplier {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  rating: number;
  yearsInBusiness: number;
  specialties: string[];
  productsCount: number;
}

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SuppliersComponent implements OnInit {
  rfqForm: FormGroup;
  searchControl: any;
  filterCategory: any;
  categories = ['Building Materials', 'Tools & Equipment', 'Electrical Supplies', 'Plumbing Supplies', 'HVAC Equipment', 'Safety Equipment', 'Concrete & Masonry', 'Steel & Metal', 'Lumber & Wood', 'Roofing Materials'];
  
  suppliers: Supplier[] = [
    {
      id: 1,
      name: 'SteelCo Industries',
      category: 'Steel & Metal',
      description: 'Leading supplier of structural steel, rebar, and metal fabrication services. Serving the construction industry for over 25 years with quality products and reliable delivery.',
      location: 'Houston, TX',
      rating: 4.8,
      yearsInBusiness: 25,
      specialties: ['Structural Steel', 'Rebar', 'Metal Fabrication', 'Custom Cutting'],
      productsCount: 150
    },
    {
      id: 2,
      name: 'Concrete Solutions Plus',
      category: 'Concrete & Masonry',
      description: 'Specialized concrete supplier offering ready-mix concrete, precast products, and masonry supplies. Quality materials for commercial and residential projects.',
      location: 'Dallas, TX',
      rating: 4.6,
      yearsInBusiness: 18,
      specialties: ['Ready-Mix Concrete', 'Precast Products', 'Masonry Blocks', 'Concrete Additives'],
      productsCount: 85
    },
    {
      id: 3,
      name: 'PowerTools Pro',
      category: 'Tools & Equipment',
      description: 'Comprehensive tool and equipment supplier for construction professionals. From hand tools to heavy machinery, we have everything you need for your projects.',
      location: 'Austin, TX',
      rating: 4.9,
      yearsInBusiness: 12,
      specialties: ['Power Tools', 'Hand Tools', 'Heavy Equipment', 'Safety Gear'],
      productsCount: 300
    },
    {
      id: 4,
      name: 'Electrical Supply Co.',
      category: 'Electrical Supplies',
      description: 'Full-service electrical supply company providing wiring, fixtures, panels, and electrical equipment for commercial and industrial applications.',
      location: 'San Antonio, TX',
      rating: 4.7,
      yearsInBusiness: 20,
      specialties: ['Electrical Wiring', 'Lighting Fixtures', 'Circuit Breakers', 'Industrial Equipment'],
      productsCount: 200
    },
    {
      id: 5,
      name: 'Safety First Equipment',
      category: 'Safety Equipment',
      description: 'Dedicated to providing high-quality safety equipment and PPE for construction sites. Ensuring worker safety with certified products and expert consultation.',
      location: 'Fort Worth, TX',
      rating: 4.5,
      yearsInBusiness: 15,
      specialties: ['Hard Hats', 'Safety Vests', 'Fall Protection', 'Respiratory Equipment'],
      productsCount: 120
    },
    {
      id: 6,
      name: 'Lumber & More',
      category: 'Lumber & Wood',
      description: 'Premium lumber and wood products supplier. From framing lumber to specialty woods, we provide quality materials for all your construction needs.',
      location: 'El Paso, TX',
      rating: 4.4,
      yearsInBusiness: 22,
      specialties: ['Framing Lumber', 'Plywood', 'Hardwood', 'Treated Wood'],
      productsCount: 95
    }
  ];

  filteredSuppliers: Supplier[] = [];

  constructor(private fb: FormBuilder) {
    this.rfqForm = this.fb.group({
      product: ['', Validators.required],
      quantity: [''],
      specifications: [''],
      delivery: [''],
      timeline: [''],
      contact: ['']
    });
    
    this.searchControl = this.fb.control('');
    this.filterCategory = this.fb.control('');
  }

  ngOnInit() {
    this.filteredSuppliers = [...this.suppliers];
    
    // Set up search functionality
    this.searchControl.valueChanges.subscribe(() => {
      this.filterSuppliers();
    });
    
    // Set up category filter
    this.filterCategory.valueChanges.subscribe(() => {
      this.filterSuppliers();
    });
  }

  filterSuppliers() {
    let filtered = [...this.suppliers];
    
    // Filter by category
    const selectedCategory = this.filterCategory.value;
    if (selectedCategory) {
      filtered = filtered.filter(supplier => supplier.category === selectedCategory);
    }
    
    // Filter by search term
    const searchTerm = this.searchControl.value?.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm) ||
        supplier.description.toLowerCase().includes(searchTerm) ||
        supplier.location.toLowerCase().includes(searchTerm) ||
        supplier.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
      );
    }
    
    this.filteredSuppliers = filtered;
  }

  submitRFQ() {
    if (this.rfqForm.valid) {
      // In a real app, this would send the RFQ to suppliers
      alert('RFQ submitted successfully! Suppliers will contact you soon.');
      this.rfqForm.reset();
    }
  }

  viewCatalog(supplier: Supplier) {
    // In a real app, this would open a catalog modal or navigate to catalog page
    alert(`Viewing catalog for: ${supplier.name}`);
  }

  contactSupplier(supplier: Supplier) {
    // In a real app, this would open contact form or initiate communication
    alert(`Contacting: ${supplier.name}`);
  }
} 