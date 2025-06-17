/**
 * YADA-EXPERIENCE Events Page JavaScript
 * Automatically sorts events into upcoming and past categories based on date
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample events data - in a real implementation, this would come from a database
    const eventsData = [
        {
            id: 'careers-day-oxford',
            title: 'Careers Day',
            date: '2025-06-17', // YYYY-MM-DD format
            month: 'JUN',
            day: '17',
            location: 'Oxford High School',
            time: '9:30 AM - 4:00 PM',
            category: 'school',
            featured: true,
            description: 'A comprehensive careers day focused on guiding students through important life choices and purpose discovery.',
            highlights: [
                'Effects of drug substance abuse and peer pressure',
                'Sexual purity',
                'Mentorship in career development',
                'Why discover your purpose'
            ],
            capacity: 'Open to all Oxford High School students',
            image: 'images/featured-event.svg'
        },
        {
            id: 'purpose-workshop',
            title: 'Purpose Discovery Workshop',
            date: '2025-06-15', // YYYY-MM-DD format
            month: 'JUN',
            day: '15',
            location: 'YADA Center, Kampala',
            time: '9:00 AM - 4:00 PM',
            category: 'workshop',
            featured: false,
            description: 'Join us for a transformative one-day workshop designed to help you uncover your unique purpose. Through interactive activities, guided reflection, and community sharing, you\'ll begin to identify your core values, natural talents, and potential purpose paths.',
            highlights: [
                'Self-discovery assessments',
                'Guided purpose exploration',
                'Community building activities',
                'Action planning for next steps'
            ],
            price: '50,000 UGX (scholarships available)',
            capacity: 'Limited to 30 participants',
            image: 'images/featured-event.svg'
        },
        {
            id: 'leadership-bootcamp',
            title: 'Leadership Bootcamp',
            date: '2025-07-08',
            month: 'JUL',
            day: '8',
            location: 'Makerere University',
            time: '8:30 AM - 5:00 PM',
            category: 'workshop',
            featured: false,
            description: 'Develop essential leadership skills in this intensive one-day bootcamp.'
        },
        {
            id: 'career-expo',
            title: 'Career Pathways Expo',
            date: '2025-08-22',
            month: 'AUG',
            day: '22',
            location: 'Kampala Convention Center',
            time: '10:00 AM - 4:00 PM',
            category: 'community',
            featured: false,
            description: 'Explore diverse career options and connect with professionals in various fields.'
        },
        {
            id: 'school-purpose-day',
            title: 'School Purpose Day',
            date: '2025-09-05',
            month: 'SEP',
            day: '5',
            location: 'St. Mary\'s Secondary School',
            time: '9:00 AM - 3:00 PM',
            category: 'school',
            featured: false,
            description: 'A day of purpose discovery activities for secondary school students.'
        },
        {
            id: 'mentorship-matchup',
            title: 'Mentorship Matchup',
            date: '2025-10-12',
            month: 'OCT',
            day: '12',
            location: 'YADA Center, Kampala',
            time: '2:00 PM - 6:00 PM',
            category: 'workshop',
            featured: false,
            description: 'Connect with potential mentors who can guide you on your purpose journey.'
        },
        {
            id: 'youth-summit',
            title: 'Youth Purpose Summit',
            date: '2025-11-18',
            month: 'NOV',
            day: '18',
            location: 'Sheraton Kampala Hotel',
            time: '8:00 AM - 5:00 PM',
            category: 'community',
            featured: false,
            description: 'A full-day summit bringing together youth from across Uganda to explore purpose and potential.'
        },
        // Past events (for demonstration)
        {
            id: 'past-workshop-1',
            title: 'Creative Expression Workshop',
            date: '2025-01-20',
            month: 'JAN',
            day: '20',
            location: 'YADA Center, Kampala',
            time: '10:00 AM - 3:00 PM',
            category: 'workshop',
            featured: false,
            description: 'Explored how creative expression connects to purpose discovery.'
        },
        {
            id: 'past-school-1',
            title: 'Career Day at Kampala High',
            date: '2025-02-15',
            month: 'FEB',
            day: '15',
            location: 'Kampala High School',
            time: '9:00 AM - 1:00 PM',
            category: 'school',
            featured: false,
            description: 'Guided high school students through purpose-aligned career exploration.'
        },
        {
            id: 'past-community-1',
            title: 'Community Purpose Festival',
            date: '2025-03-05',
            month: 'MAR',
            day: '5',
            location: 'Centenary Park',
            time: '11:00 AM - 6:00 PM',
            category: 'community',
            featured: false,
            description: 'A celebration of purpose discovery with activities for all ages.'
        }
    ];

    // Get current date for comparison
    const currentDate = new Date();
    // Set time to beginning of day for accurate comparison
    currentDate.setHours(0, 0, 0, 0);

    // Sort events into upcoming and past
    const upcomingEvents = [];
    const pastEvents = [];
    let featuredEvent = null;

    eventsData.forEach(event => {
        const eventDate = new Date(event.date);
        
        if (eventDate >= currentDate) {
            upcomingEvents.push(event);
            // Set the first upcoming event as featured if none is explicitly marked
            if (event.featured) {
                featuredEvent = event;
            }
        } else {
            pastEvents.push(event);
        }
    });

    // If no event is marked as featured, use the first upcoming event
    if (!featuredEvent && upcomingEvents.length > 0) {
        featuredEvent = upcomingEvents[0];
    }

    // Sort upcoming events by date (closest first)
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Sort past events by date (most recent first)
    pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render featured event
    renderFeaturedEvent(featuredEvent);
    
    // Render upcoming events
    renderEvents(upcomingEvents, 'upcoming-events-grid');
    
    // Render past events
    renderEvents(pastEvents, 'past-events-grid');
    
    // Populate event select dropdown for registration
    populateEventSelect(upcomingEvents);
    
    // Initialize event filters
    initEventFilters();
});

/**
 * Renders the featured event
 */
function renderFeaturedEvent(event) {
    const featuredContainer = document.getElementById('featured-event-container');
    
    if (!event) {
        featuredContainer.innerHTML = `
            <div class="no-featured-event">
                <p>No featured events at this time. Check out our upcoming events below!</p>
            </div>
        `;
        return;
    }
    
    featuredContainer.innerHTML = `
        <div class="row">
            <div class="col col-md-6 col-sm-12">
                <div class="featured-event-image">
                    <img src="${event.image || 'images/featured-event.svg'}" alt="${event.title}" class="img-fluid">
                    <div class="event-date-badge">
                        <div class="event-month">${event.month}</div>
                        <div class="event-day">${event.day}</div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6 col-sm-12">
                <div class="featured-event-content">
                    <h3>${event.title}</h3>
                    <div class="event-meta">
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <p><i class="fas fa-clock"></i> ${event.time}</p>
                        ${event.capacity ? `<p><i class="fas fa-user-friends"></i> ${event.capacity}</p>` : ''}
                    </div>
                    <p class="event-description">${event.description}</p>
                    ${renderEventHighlights(event)}
                    <div class="event-cta">
                        <a href="#register" class="btn btn-primary">Register Now</a>
                        ${event.price ? `<p class="event-price">Registration Fee: ${event.price}</p>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders event highlights if available
 */
function renderEventHighlights(event) {
    if (!event.highlights || event.highlights.length === 0) {
        return '';
    }
    
    let highlightsHTML = `
        <div class="event-highlights">
            <h4>What to Expect:</h4>
            <ul>
    `;
    
    event.highlights.forEach(highlight => {
        highlightsHTML += `<li><i class="fas fa-check-circle"></i> ${highlight}</li>`;
    });
    
    highlightsHTML += `
            </ul>
        </div>
    `;
    
    return highlightsHTML;
}

/**
 * Renders events to the specified container
 */
function renderEvents(events, containerId) {
    const container = document.getElementById(containerId);
    const noEventsMessage = container.querySelector('.no-events-message');
    
    // Clear existing events
    Array.from(container.children).forEach(child => {
        if (!child.classList.contains('no-events-message')) {
            container.removeChild(child);
        }
    });
    
    if (events.length === 0) {
        if (noEventsMessage) {
            noEventsMessage.style.display = 'block';
        }
        return;
    }
    
    if (noEventsMessage) {
        noEventsMessage.style.display = 'none';
    }
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.dataset.category = event.category;
        
        eventCard.innerHTML = `
            <div class="event-date">
                <div class="event-month">${event.month}</div>
                <div class="event-day">${event.day}</div>
            </div>
            <div class="event-details">
                <h3 class="event-title">${event.title}</h3>
                <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <p class="event-time"><i class="fas fa-clock"></i> ${event.time}</p>
                ${containerId === 'upcoming-events-grid' 
                    ? `<a href="#register" class="btn btn-tertiary">Register</a>`
                    : `<a href="#" class="btn btn-tertiary btn-past">View Details</a>`}
            </div>
        `;
        
        container.appendChild(eventCard);
    });
    
    // Show/hide load more button for past events
    if (containerId === 'past-events-grid') {
        const loadMoreContainer = document.querySelector('.load-more-container');
        if (events.length > 3) {
            loadMoreContainer.style.display = 'block';
            
            // Initially show only first 3 past events
            Array.from(container.querySelectorAll('.event-card')).forEach((card, index) => {
                if (index >= 3) {
                    card.style.display = 'none';
                    card.classList.add('hidden-event');
                }
            });
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }
}

/**
 * Populates the event select dropdown for registration
 */
function populateEventSelect(events) {
    const eventSelect = document.getElementById('event-select');
    
    // Clear existing options except the first one
    while (eventSelect.options.length > 1) {
        eventSelect.remove(1);
    }
    
    // Add upcoming events to select
    events.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = `${event.title} (${event.month} ${event.day})`;
        eventSelect.appendChild(option);
    });
}

/**
 * Initializes event filtering functionality
 */
function initEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Apply filter to both upcoming and past events
            filterEvents('upcoming-events-grid', filter);
            filterEvents('past-events-grid', filter);
        });
    });
    
    // Initialize load more functionality
    const loadMoreButton = document.getElementById('load-more-past');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            const hiddenEvents = document.querySelectorAll('#past-events-grid .event-card.hidden-event');
            
            // Show next batch of hidden events
            for (let i = 0; i < 3 && i < hiddenEvents.length; i++) {
                hiddenEvents[i].style.display = 'block';
                hiddenEvents[i].classList.remove('hidden-event');
            }
            
            // Hide button if no more hidden events
            if (document.querySelectorAll('#past-events-grid .event-card.hidden-event').length === 0) {
                this.parentElement.style.display = 'none';
            }
        });
    }
}

/**
 * Filters events in the specified container
 */
function filterEvents(containerId, filter) {
    const eventCards = document.querySelectorAll(`#${containerId} .event-card`);
    
    eventCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Check if any visible events after filtering
    const visibleEvents = document.querySelectorAll(`#${containerId} .event-card[style="display: block"]`);
    const noEventsMessage = document.querySelector(`#${containerId} .no-events-message`);
    
    if (visibleEvents.length === 0 && noEventsMessage) {
        noEventsMessage.style.display = 'block';
    } else if (noEventsMessage) {
        noEventsMessage.style.display = 'none';
    }
}
