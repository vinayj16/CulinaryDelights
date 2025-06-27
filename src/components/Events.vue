<template>
  <div class="events-container">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="skeleton-loader" v-for="n in 3" :key="'skeleton-'+n">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <i class="material-icons error-icon">error_outline</i>
      <h2>Oops! Something went wrong</h2>
      <p>{{ error }}</p>
      <button @click="fetchEvents" class="btn-primary">
        <i class="material-icons">refresh</i> Try Again
      </button>
    </div>

    <!-- Main Content -->
    <template v-else>
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="title" data-aos="fade-up">Upcoming Events</h1>
          <p class="subtitle" data-aos="fade-up" data-aos-delay="100">
            Experience unforgettable culinary journeys at our exclusive events
          </p>
          
          <!-- Search and Filter -->
          <div class="search-filter-container" data-aos="fade-up" data-aos-delay="200">
            <div class="search-box">
              <i class="material-icons">search</i>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search events..."
                @input="handleSearch"
                aria-label="Search events"
              >
            </div>
            
            <div class="filter-group">
              <button 
                v-for="category in eventCategories" 
                :key="category.id"
                @click="setActiveCategory(category.id)"
                :class="{ active: activeCategory === category.id }"
                class="filter-btn"
                :aria-pressed="activeCategory === category.id"
              >
                <i class="material-icons">{{ category.icon }}</i>
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div class="container">
        <!-- Event Count and Sort -->
        <div class="events-header">
          <p class="events-count">
            Showing {{ filteredEvents.length }} {{ filteredEvents.length === 1 ? 'event' : 'events' }}
            <span v-if="searchQuery"> for "{{ searchQuery }}"</span>
          </p>
          <div class="sort-options">
            <label for="sortBy">Sort by:</label>
            <select id="sortBy" v-model="sortBy" @change="sortEvents" aria-label="Sort events">
              <option value="date-asc">Date (Earliest First)</option>
              <option value="date-desc">Date (Latest First)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>

        <!-- Events Grid -->
        <div class="events-grid">
          <div 
            v-for="(event, index) in paginatedEvents" 
            :key="event.id"
            class="event-card"
            :class="{ 'featured': event.featured }"
            data-aos="fade-up"
            :data-aos-delay="100 * (index % 3)"
            :aria-labelledby="'event-title-'+event.id"
          >
            <div class="event-image">
              <img 
                :src="event.image" 
                :alt="event.title" 
                loading="lazy"
                @error="handleImageError"
              />
              <div v-if="event.featured" class="featured-badge">
                <i class="material-icons">star</i> Featured
              </div>
              <div v-if="isUpcoming(event.date)" class="countdown-badge">
                <i class="material-icons">access_time</i>
                <span>{{ formatCountdown(event.date) }}</span>
              </div>
            </div>
            <div class="event-details">
              <div class="event-date">
                <span class="day">{{ formatDay(event.date) }}</span>
                <span class="month">{{ formatMonth(event.date) }}</span>
              </div>
              <div class="event-header">
                <h3 :id="'event-title-'+event.id" class="event-title">{{ event.title }}</h3>
                <span class="event-category" :style="{ backgroundColor: getCategoryColor(event.category) }">
                  {{ getCategoryName(event.category) }}
                </span>
              </div>
              <div class="event-meta">
                <span class="meta-item">
                  <i class="material-icons" aria-hidden="true">schedule</i>
                  <span>{{ formatTime(event.time) }}</span>
                </span>
                <span class="meta-item">
                  <i class="material-icons" aria-hidden="true">location_on</i>
                  <span>{{ event.location }}</span>
                </span>
                <span v-if="event.capacity" class="meta-item">
                  <i class="material-icons" aria-hidden="true">people</i>
                  <span>{{ event.registered }}/{{ event.capacity }} spots</span>
                </span>
              </div>
              <p class="event-description">{{ truncateText(event.description, 150) }}</p>
              <div class="event-actions">
                <button 
                  class="btn-primary"
                  @click="registerForEvent(event.id)"
                  :disabled="event.registered || (event.capacity && event.registered >= event.capacity)"
                  :aria-label="`Register for ${event.title}`"
                >
                  <template v-if="event.registered">
                    <i class="material-icons">check_circle</i> Registered
                  </template>
                  <template v-else-if="event.capacity && event.registered >= event.capacity">
                    <i class="material-icons">sold_out</i> Sold Out
                  </template>
                  <template v-else>
                    <i class="material-icons">event_available</i> Register Now
                  </template>
                </button>
                <div class="share-dropdown">
                  <button 
                    class="btn-icon" 
                    @click="toggleShareMenu(event.id)"
                    :aria-expanded="activeShareMenu === event.id"
                    aria-label="Share event"
                  >
                    <i class="material-icons">share</i>
                  </button>
                  <div v-if="activeShareMenu === event.id" class="share-options">
                    <button @click="shareEvent(event, 'facebook')" aria-label="Share on Facebook">
                      <i class="fab fa-facebook"></i>
                    </button>
                    <button @click="shareEvent(event, 'twitter')" aria-label="Share on Twitter">
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button @click="shareEvent(event, 'linkedin')" aria-label="Share on LinkedIn">
                      <i class="fab fa-linkedin"></i>
                    </button>
                    <button @click="copyEventLink(event)" aria-label="Copy event link">
                      <i class="material-icons">link</i>
                    </button>
                  </div>
                </div>
                <button 
                  class="btn-icon" 
                  @click="toggleEventSave(event.id)"
                  :aria-label="isEventSaved(event.id) ? 'Remove from saved' : 'Save event'"
                >
                  <i class="material-icons">
                    {{ isEventSaved(event.id) ? 'bookmark' : 'bookmark_border' }}
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredEvents.length === 0" class="no-results">
          <i class="material-icons">event_busy</i>
          <h3>No events found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button @click="resetFilters" class="btn-outline">
            <i class="material-icons">refresh</i> Reset Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="pagination-btn"
            :class="{ disabled: currentPage === 1 }"
            aria-label="Previous page"
          >
            <i class="material-icons">chevron_left</i>
          </button>
          
          <div class="page-numbers">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="goToPage(page)"
              :class="{ active: currentPage === page }"
              class="page-btn"
              :aria-label="`Go to page ${page}`"
              :aria-current="currentPage === page ? 'page' : null"
            >
              {{ page }}
            </button>
            <span v-if="showEllipsis" class="ellipsis">...</span>
          </div>
          
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="pagination-btn"
            :class="{ disabled: currentPage === totalPages }"
            aria-label="Next page"
          >
            <i class="material-icons">chevron_right</i>
          </button>
        </div>
      </div>
    </template>

    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop" 
      @click="scrollToTop" 
      class="back-to-top"
      aria-label="Back to top"
    >
      <i class="material-icons">keyboard_arrow_up</i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Events',
  data() {
    return {
      // State
      isLoading: true,
      error: null,
      events: [],
      savedEvents: new Set(),
      activeShareMenu: null,
      searchQuery: '',
      activeCategory: 'all',
      sortBy: 'date-asc',
      currentPage: 1,
      itemsPerPage: 6,
      showBackToTop: false,
      
      // Event categories
      eventCategories: [
        { id: 'all', name: 'All Events', icon: 'event' },
        { id: 'tasting', name: 'Tastings', icon: 'wine_bar' },
        { id: 'cooking', name: 'Cooking Classes', icon: 'restaurant' },
        { id: 'dinner', name: 'Dinner Events', icon: 'dinner_dining' },
        { id: 'mixology', name: 'Mixology', icon: 'local_bar' },
        { id: 'seasonal', name: 'Seasonal', icon: 'ac_unit' }
      ],
      
      // Sample events data (in a real app, this would come from an API)
      sampleEvents: [
        {
          id: 1,
          title: 'Wine Tasting Night',
          description: 'An evening of fine wines paired with artisanal cheeses and gourmet bites. Join our sommelier as we explore the rich flavors and aromas of carefully selected vintages from around the world.',
          date: '2023-12-15',
          time: '19:00',
          location: 'Main Dining Hall',
          category: 'tasting',
          image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          featured: true,
          registered: false,
          capacity: 30,
          registeredCount: 18,
          price: 75,
          priceNote: 'per person',
          tags: ['wine', 'tasting', 'cheese']
        },
        {
          id: 2,
          title: 'Chef\'s Table Experience',
          description: 'An exclusive multi-course tasting menu prepared by our head chef. Limited to just 12 guests for an intimate dining experience.',
          date: '2023-12-20',
          time: '18:30',
          location: 'Chef\'s Table',
          category: 'dinner',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          featured: false,
          registered: false,
          capacity: 12,
          registeredCount: 8,
          price: 150,
          priceNote: 'with wine pairing',
          tags: ['fine dining', 'chef', 'tasting menu']
        },
        {
          id: 3,
          title: 'Mixology Masterclass',
          description: 'Learn to craft signature cocktails with our expert mixologists. Includes hands-on instruction and tasting of 4 different cocktails.',
          date: '2024-01-05',
          time: '17:00',
          location: 'The Bar',
          category: 'mixology',
          image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          featured: false,
          registered: false,
          capacity: 15,
          registeredCount: 12,
          price: 65,
          priceNote: 'includes 4 cocktails',
          tags: ['cocktails', 'bartending', 'spirits']
        },
        {
          id: 4,
          title: 'Pasta Making Workshop',
          description: 'Master the art of fresh pasta making with our Italian chef. You\'ll learn to make 3 different types of pasta from scratch.',
          date: '2024-01-12',
          time: '15:00',
          location: 'Cooking Studio',
          category: 'cooking',
          image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          featured: true,
          registered: false,
          capacity: 10,
          registeredCount: 6,
          price: 85,
          priceNote: 'includes meal',
          tags: ['pasta', 'cooking', 'italian']
        },
        {
          id: 5,
          title: 'Chocolate & Wine Pairing',
          description: 'Discover the perfect harmony of fine chocolates and premium wines in this guided tasting experience.',
          date: '2024-01-18',
          time: '19:30',
          location: 'Private Dining Room',
          category: 'tasting',
          image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          featured: false,
          registered: false,
          capacity: 20,
          registeredCount: 14,
          price: 55,
          priceNote: 'per person',
          tags: ['chocolate', 'wine', 'dessert']
        },
        {
          id: 6,
          title: 'Farm to Table Dinner',
          description: 'Celebrate the season with a 5-course dinner featuring the freshest local ingredients from our partner farms.',
          date: '2024-01-25',
          time: '19:00',
          location: 'Garden Terrace',
          category: 'dinner',
          image: 'https://images.unsplash.com/photo-1504674900247-087c5d9ae2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
          featured: true,
          registered: false,
          capacity: 25,
          registeredCount: 9,
          price: 95,
          priceNote: 'with drink pairings',
          tags: ['seasonal', 'local', 'farm to table']
        }
      ]
    };
  },
  computed: {
    filteredEvents() {
      let result = [...this.events];
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(event => 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.tags?.some(tag => tag.includes(query))
        );
      }
      
      // Filter by category
      if (this.activeCategory !== 'all') {
        result = result.filter(event => event.category === this.activeCategory);
      }
      
      // Sort events
      return this.sortEventsList(result);
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredEvents.slice(0, end);
    },
    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    },
    visiblePages() {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(startPage + maxVisiblePages - 1, this.totalPages);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      return pages;
    },
    showEllipsis() {
      return this.totalPages > this.visiblePages.length;
    },
    hasMoreEvents() {
      return this.paginatedEvents.length < this.filteredEvents.length;
    }
  },
  watch: {
    filteredEvents() {
      this.currentPage = 1; // Reset to first page when filters change
    }
  },
  created() {
    this.fetchEvents();
    this.loadSavedEvents();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async fetchEvents() {
      this.isLoading = true;
      this.error = null;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.events = [...this.sampleEvents];
      } catch (err) {
        console.error('Error fetching events:', err);
        this.error = 'Failed to load events. Please try again later.';
      } finally {
        this.isLoading = false;
      }
    },
    
    loadSavedEvents() {
      const saved = JSON.parse(localStorage.getItem('savedEvents') || '[]');
      this.savedEvents = new Set(saved);
    },
    
    formatDay(dateString) {
      const date = new Date(dateString);
      return date.getDate();
    },
    
    formatMonth(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('default', { month: 'short' });
    },
    
    formatFullDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    
    formatTime(timeString) {
      // Convert 24h to 12h format
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price);
    },
    
    truncateText(text, maxLength) {
      if (!text) return '';
      return text.length > maxLength 
        ? text.substring(0, maxLength) + '...' 
        : text;
    },
    
    isUpcoming(dateString) {
      const eventDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    },
    
    formatCountdown(dateString) {
      const eventDate = new Date(dateString);
      const today = new Date();
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return 'Past Event';
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Tomorrow';
      if (diffDays < 7) return `In ${diffDays} days`;
      if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
      return `In ${Math.floor(diffDays / 30)} months`;
    },
    
    getCategoryColor(category) {
      const colors = {
        tasting: '#8B5CF6',
        cooking: '#10B981',
        dinner: '#F59E0B',
        mixology: '#3B82F6',
        seasonal: '#EC4899'
      };
      return colors[category] || '#6B7280';
    },
    
    getCategoryName(categoryId) {
      const category = this.eventCategories.find(cat => cat.id === categoryId);
      return category ? category.name : categoryId;
    },
    
    sortEventsList(events) {
      const sorted = [...events];
      const [sortBy, order] = this.sortBy.split('-');
      
      return sorted.sort((a, b) => {
        let comparison = 0;
        
        if (sortBy === 'date') {
          comparison = new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        }
        
        return order === 'desc' ? -comparison : comparison;
      });
    },
    
    handleSearch() {
      // Debounce search to improve performance
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1;
      }, 300);
    },
    
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId;
      this.currentPage = 1;
    },
    
    sortEvents() {
      this.currentPage = 1;
    },
    
    resetFilters() {
      this.searchQuery = '';
      this.activeCategory = 'all';
      this.sortBy = 'date-asc';
      this.currentPage = 1;
    },
    
    registerForEvent(eventId) {
      const event = this.events.find(e => e.id === eventId);
      if (event) {
        if (event.registered) return;
        
        // In a real app, you would make an API call here
        event.registered = true;
        event.registeredCount += 1;
        
        this.$toast?.success(`Successfully registered for ${event.title}!`);
      }
    },
    
    toggleEventSave(eventId) {
      if (this.savedEvents.has(eventId)) {
        this.savedEvents.delete(eventId);
      } else {
        this.savedEvents.add(eventId);
      }
      
      // Save to localStorage
      localStorage.setItem('savedEvents', JSON.stringify([...this.savedEvents]));
    },
    
    isEventSaved(eventId) {
      return this.savedEvents.has(eventId);
    },
    
    toggleShareMenu(eventId) {
      this.activeShareMenu = this.activeShareMenu === eventId ? null : eventId;
    },
    
    shareEvent(event, platform) {
      const eventUrl = `${window.location.origin}/events/${event.id}`;
      const text = `Check out this event: ${event.title}`;
      
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(eventUrl)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`, '_blank');
          break;
      }
      
      this.activeShareMenu = null;
    },
    
    async copyEventLink(event) {
      const eventUrl = `${window.location.origin}/events/${event.id}`;
      try {
        await navigator.clipboard.writeText(eventUrl);
        this.$toast?.success('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
        this.$toast?.error('Failed to copy link');
      }
      this.activeShareMenu = null;
    },
    
    handleImageError(event) {
      // Fallback image in case the main image fails to load
      event.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
    },
    
    // Pagination methods
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
    },
    
    goToPage(page) {
      this.currentPage = page;
      this.scrollToTop();
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    
    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
      
      // Lazy load more events when scrolling near bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        this.loadMoreEvents();
      }
    },
    
    loadMoreEvents() {
      if (this.isLoadingMore || !this.hasMoreEvents) return;
      
      this.isLoadingMore = true;
      
      // Simulate API call to load more events
      setTimeout(() => {
        // In a real app, you would fetch the next page of events from the API
        this.isLoadingMore = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
.events-container {
  min-height: 100vh;
  background: var(--light-bg);
  color: var(--text-color);
}

.hero-section {
  background: var(--primary-gradient);
  color: white;
  padding: 6rem 1rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80') center/cover;
  opacity: 0.1;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.event-card {
  background: var(--glass-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.event-card.featured {
  grid-column: 1 / -1;
  flex-direction: row;
}

.event-card.featured .event-image {
  flex: 1;
  max-width: 50%;
}

.event-card.featured .event-details {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.event-card.featured .event-image {
  height: auto;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.event-details {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: var(--primary-gradient);
  color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  float: left;
  margin-right: 1rem;
}

.event-card.featured .event-date {
  position: absolute;
  top: 1rem;
  left: 1rem;
  margin: 0;
  width: 70px;
  height: 70px;
}

.day {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.month {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.event-title {
  font-size: 1.5rem;
  margin: 0.5rem 0 1rem;
  color: var(--heading-color);
  font-weight: 700;
  clear: both;
}

.event-card.featured .event-title {
  font-size: 2rem;
  margin-top: 1.5rem;
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.material-icons {
  font-size: 1rem;
  color: var(--accent-color);
}

.event-description {
  color: var(--text-color-secondary);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.btn-primary {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  align-self: flex-start;
  margin-top: auto;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  background: var(--accent-color);
  filter: brightness(1.1);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .event-card.featured {
    flex-direction: column;
  }
  
  .event-card.featured .event-image {
    max-width: 100%;
    height: 250px;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .event-card.featured .event-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
}
</style>