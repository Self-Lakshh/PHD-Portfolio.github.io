const publicationsContainer = document.getElementById('publicationsContainer');
const searchInput = document.getElementById('searchInput');

let selectedType = 'all'; // Default type filter

// Load all publication JSON files
async function loadPublications() {
    try {
        const response = await fetch('./../publications/index.json');
        const files = await response.json();

        const publications = [];
        for (const file of files) {
            const pubResponse = await fetch(`./../publications/${file}`);
            const publication = await pubResponse.json();
            publications.push(publication);
        }

        publications.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderPublications(publications);
        setupFilters(publications);
    } catch (error) {
        console.error('Error loading publications:', error);
    }
}

// Render publication cards
function renderPublications(publications) {
    publicationsContainer.innerHTML = '';
    publications.forEach(pub => {
        const card = document.createElement('div');
        card.classList.add('col-md-6', 'publication');
        card.setAttribute('data-title', pub.title.toLowerCase());
        card.setAttribute('data-description', pub.description.toLowerCase());

        card.innerHTML = `
            <div class="card shadow-sm d-flex flex-row align-items-center" data-aos="fade-up" 
                 style="height: 200px; border-radius: 10px;">
                <img src="${pub.image}" alt="${pub.title}" 
                     class="card-img-left border border-end img-fluid m-2" 
                     style="width: 120px; height: 150px; object-fit: cover;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title" style="font-weight: 600;">${pub.title}</h6>
                        <p class="card-text" style="
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 0.9rem;
                        ">${pub.description}</p>
                    </div>
                    <div class="d-flex justify-content-between pt-2">
                        <a href="${pub.readMoreLink}" target="_blank" class="btn btn-link p-0">Read More</a>
                        <p class="text-muted mb-1 pe-1">${pub.type}</p>
                    </div>
                </div>
            </div>
        `;
        publicationsContainer.appendChild(card);
    });
}

// Apply both search + filter
function applyFilters(publications) {
    const query = searchInput.value.toLowerCase();

    const filtered = publications.filter(pub => {
        const matchesSearch = pub.title.toLowerCase().includes(query) ||
                              pub.description.toLowerCase().includes(query) 
                              || pub.type.toLowerCase().includes(query);
                              
        const matchesType = selectedType === 'all' || pub.type.toLowerCase() === selectedType;
        return matchesSearch && matchesType;
    });

    renderPublications(filtered);
}

// Setup filter and search event listeners
function setupFilters(publications) {
    searchInput.addEventListener('input', () => applyFilters(publications));

    document.querySelectorAll('[data-filter]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            // Remove 'active' from all items
            document.querySelectorAll('[data-filter]').forEach(i => i.classList.remove('active'));
            // Mark this item active
            this.classList.add('active');
            // Update dropdown button text (optional)
            document.getElementById('filterDropdown').textContent = this.textContent.trim();
            // Set selected type
            selectedType = this.getAttribute('data-filter').toLowerCase();
            applyFilters(publications);
        });
    });
}

loadPublications();
