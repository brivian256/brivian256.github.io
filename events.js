// Events data
const events = [
    {
        id: 1,
        title: "Purpose Discovery Workshop",
        date: "2025-07-15",
        time: "10:00 AM - 3:00 PM",
        location: "YADA Experience Center, Kampala",
        description: "An intensive workshop designed to help young people uncover their unique purpose and calling.",
        topics: [
            "Self-reflection exercises",
            "Strengths and talents assessment",
            "Vision board creation",
            "Goal setting strategies"
        ],
        category: "workshop",
        registrationOpen: true
    },
    {
        id: 2,
        title: "Leadership Skills Bootcamp",
        date: "2025-08-20",
        time: "9:00 AM - 5:00 PM",
        location: "Makerere University",
        description: "A full-day intensive program focused on developing leadership skills for young changemakers.",
        topics: [
            "Leadership styles and approaches",
            "Team building and collaboration",
            "Communication and public speaking",
            "Project management basics"
        ],
        category: "bootcamp",
        registrationOpen: true
    },
    {
        id: 3,
        title: "Careers Day at Oxford High School",
        date: "2025-06-17",
        time: "9:30 AM - 4:00 PM",
        location: "Oxford High School",
        description: "A comprehensive careers day focusing on purpose discovery and life skills development for students.",
        topics: [
            "Effects of drug substance abuse and peer pressure",
            "Sexual purity",
            "Mentorship in career development",
            "Why discover your purpose"
        ],
        category: "school-program",
        registrationOpen: true
    },
    {
        id: 4,
        title: "Purpose Discovery Session at Greenhill Academy",
        date: "2025-05-30",
        time: "10:00 AM - 12:30 PM",
        location: "Greenhill Academy",
        description: "Interactive session with S3 and S4 students focusing on building confidence and discovering purpose.",
        topics: [
            "Commitment and excellence",
            "Building confidence",
            "Purpose discovery",
            "Personal development"
        ],
        category: "school-program",
        registrationOpen: false
    },
    {
        id: 5,
        title: "Purpose Discovery Sessions at Kenzie Immaculate Foundation",
        date: "2024-12-13",
        time: "Full Day Program",
        location: "Kenzie Immaculate Foundation",
        description: "5-day intensive purpose discovery program from December 9th to 13th, 2024.",
        topics: [
            "Discovering your purpose",
            "Self-awareness exercises",
            "Goal setting",
            "Personal growth strategies"
        ],
        category: "workshop",
        registrationOpen: false
    },
    {
        id: 6,
        title: "Purpose Discovery Talk at Taibah International",
        date: "2024-11-27",
        time: "Morning Session",
        location: "Taibah International",
        description: "Engaging talk focused on helping students discover their unique purpose and calling.",
        topics: [
            "Discovering your purpose",
            "Understanding your strengths",
            "Future planning",
            "Personal development"
        ],
        category: "school-program",
        registrationOpen: false
    }
];

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to check if event is upcoming
function isUpcoming(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
}

// Function to get the next upcoming event
function getNextUpcomingEvent() {
    const upcomingEvents = events.filter(event => isUpcoming(event.date));
    if (upcomingEvents.length === 0) return null;
    
    return upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
}

// Function to render featured event
function renderFeaturedEvent() {
    const featuredEvent = getNextUpcomingEvent();
    const featuredContainer = document.getElementById('featured-event');
    
    if (!featuredEvent) {
        featuredContainer.innerHTML = `
            <div class="featured-event">
                <h3>No Upcoming Events</h3>
                <p>Check back soon for new events and opportunities!</p>
            </div>
        `;
        return;
    }

    featuredContainer.innerHTML = `
        <h3>Featured Event: ${featuredEvent.title}</h3>
        <div class="event-details">
            <div class="event-detail">
                <strong>Date</strong><br>
                ${formatDate(featuredEvent.date)}
            </div>
            <div class="event-detail">
                <strong>Time</strong><br>
                ${featuredEvent.time}
            </div>
            <div class="event-detail">
                <strong>Location</strong><br>
                ${featuredEvent.location}
            </div>
        </div>
        <p>${featuredEvent.description}</p>
        <div class="event-topics">
            <h4>Topics to be discussed:</h4>
            <ul class="topics-list">
                ${featuredEvent.topics.map(topic => `<li>${topic}</li>`).join('')}
            </ul>
        </div>
        ${featuredEvent.registrationOpen ? 
            `<a href="#registration-section" class="register-btn">Register Now</a>` : 
            `<span class="registration-closed">Registration Closed</span>`
        }
    `;
}

// Function to render upcoming events
function renderUpcomingEvents() {
    const upcomingEvents = events.filter(event => isUpcoming(event.date));
    const upcomingContainer = document.getElementById('upcoming-events');
    
    if (upcomingEvents.length === 0) {
        upcomingContainer.innerHTML = `
            <div class="no-events">
                <p>No upcoming events at the moment. Check back soon!</p>
            </div>
        `;
        return;
    }

    upcomingContainer.innerHTML = upcomingEvents.map(event => `
        <div class="event-card">
            <div class="event-card-header">
                <div class="event-date">${formatDate(event.date)}</div>
            </div>
            <div class="event-card-content">
                <h4>${event.title}</h4>
                <div class="event-meta">
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                </div>
                <p>${event.description}</p>
                ${event.registrationOpen ? 
                    `<a href="#registration-section" class="register-btn">Register</a>` : 
                    `<span class="registration-closed">Registration Closed</span>`
                }
            </div>
        </div>
    `).join('');
}

// Function to render past events
function renderPastEvents() {
    const pastEvents = events.filter(event => !isUpcoming(event.date));
    const pastContainer = document.getElementById('past-events');
    
    if (pastEvents.length === 0) {
        pastContainer.innerHTML = `
            <div class="no-events">
                <p>No past events to display.</p>
            </div>
        `;
        return;
    }

    pastContainer.innerHTML = pastEvents.map(event => `
        <div class="event-card past-event">
            <div class="event-card-header">
                <div class="event-date">${formatDate(event.date)}</div>
            </div>
            <div class="event-card-content">
                <h4>${event.title}</h4>
                <div class="event-meta">
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                </div>
                <p>${event.description}</p>
                <span class="event-completed">Event Completed</span>
            </div>
        </div>
    `).join('');
}

// Function to populate event options in registration form
function populateEventOptions() {
    const eventSelect = document.getElementById('event');
    const upcomingEvents = events.filter(event => isUpcoming(event.date) && event.registrationOpen);
    
    eventSelect.innerHTML = '<option value="">Choose an event...</option>';
    
    upcomingEvents.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = `${event.title} - ${formatDate(event.date)}`;
        eventSelect.appendChild(option);
    });
}

// Function to handle registration form submission
function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const registrationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        age: formData.get('age'),
        school: formData.get('school'),
        event: formData.get('event'),
        motivation: formData.get('motivation')
    };
    
    // Here you would typically send the data to a server
    console.log('Registration data:', registrationData);
    
    // Show success message
    alert('Thank you for registering! We will contact you soon with more details.');
    
    // Reset form
    e.target.reset();
}

// Function to handle newsletter subscription
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    
    // Here you would typically send the email to a server
    console.log('Newsletter subscription:', email);
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    
    // Reset form
    e.target.reset();
}

// Initialize events page
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedEvent();
    renderUpcomingEvents();
    renderPastEvents();
    populateEventOptions();
    
    // Add event listeners
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Smooth scroll to registration section
    document.querySelectorAll('a[href="#registration-section"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.registration-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

