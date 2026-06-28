// More Destinations Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const moreDestinationBtn = document.querySelector('.popular .btn-primary');
    const destinationsModal = document.createElement('div');
    destinationsModal.className = 'destinations-modal';
    document.body.appendChild(destinationsModal);

    // All destinations data (excluding the 3 shown on main page)
    const allDestinations = [
        {
            title: "Bali",
            country: "Indonesia",
            image: "./assets/images/gallery-1.jpg",
            description: "Famous for its beaches, temples, and affordable luxury resorts."
        },
        {
            title: "Paris",
            country: "France",
            image: "./assets/images/gallery-2.jpg",
            description: "The city of love, iconic Eiffel Tower, art, fashion, and fine cuisine."
        },
        {
            title: "Male",
            country: "Maldives",
            image: "./assets/images/gallery-3.jpg",
            description: "Overwater bungalows, crystal-clear water, perfect for honeymooners."
        },
        {
            title: "Tokyo",
            country: "Japan",
            image: "./assets/images/gallery-4.jpg",
            description: "Blend of tradition and tech, anime culture, cherry blossoms, and sushi."
        },
        {
            title: "Swiss Alps",
            country: "Switzerland",
            image: "./assets/images/gallery-5.jpg",
            description: "Snow-covered Alps, scenic train rides, chocolates, and skiing."
        },
        {
            title: "Santorini",
            country: "Greece",
            image: "./assets/images/packege-1.jpg",
            description: "Whitewashed buildings with blue domes, cliffside views, sunsets."
        },
        {
            title: "New York City",
            country: "USA",
            image: "./assets/images/packege-2.jpg",
            description: "The city that never sleeps – Broadway, Times Square, Central Park."
        },
        {
            title: "Rome",
            country: "Italy",
            image: "./assets/images/packege-3.jpg",
            description: "Historical ruins like the Colosseum, Vatican City, and pasta!"
        },
        {
            title: "Sydney",
            country: "Australia",
            image: "./assets/images/gallery-1.jpg",
            description: "Opera House, Harbour Bridge, beautiful beaches and marine life."
        }
    ];

    // Create modal content
    destinationsModal.innerHTML = `
        <div class="destinations-content">
            <div class="destinations-header">
                <div class="header-left">
                    <button class="back-btn">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                        Back
                    </button>
                    <h2>All Popular Destinations</h2>
                </div>
                <button class="close-destinations">&times;</button>
            </div>
            <div class="destinations-grid">
                ${allDestinations.map(dest => `
                    <div class="popular-card">
                        <figure class="card-img">
                            <img src="${dest.image}" alt="${dest.title}, ${dest.country}" loading="lazy">
                        </figure>
                        <div class="card-content">
                            <div class="card-rating">
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                                <ion-icon name="star"></ion-icon>
                            </div>
                            <p class="card-subtitle">
                                <a href="#">${dest.country}</a>
                            </p>
                            <h3 class="h3 card-title">
                                <a href="#">${dest.title}</a>
                            </h3>
                            <p class="card-text">
                                ${dest.description}
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        .destinations-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            overflow-y: auto;
        }

        .destinations-content {
            background-color: var(--white);
            width: 90%;
            max-width: 1200px;
            margin: 20px auto;
            border-radius: 15px;
            padding: 20px;
        }

        .destinations-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--gainsboro);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .back-btn {
            display: flex;
            align-items: center;
            gap: 5px;
            background: none;
            border: none;
            color: var(--space-cadet);
            font-size: 1rem;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        .back-btn:hover {
            background-color: var(--gainsboro);
        }

        .back-btn ion-icon {
            font-size: 1.2rem;
        }

        .destinations-header h2 {
            color: var(--space-cadet);
            font-size: 2rem;
            font-weight: 600;
            margin: 0;
        }

        .close-destinations {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--space-cadet);
        }

        .destinations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            padding: 20px;
        }

        .destinations-grid .popular-card {
            margin: 0;
        }

        @media (max-width: 768px) {
            .destinations-content {
                width: 95%;
                margin: 10px auto;
            }

            .destinations-grid {
                grid-template-columns: 1fr;
                padding: 10px;
            }

            .destinations-header h2 {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(styles);

    // Event Listeners
    moreDestinationBtn.addEventListener('click', () => {
        destinationsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    const closeBtn = destinationsModal.querySelector('.close-destinations');
    const backBtn = destinationsModal.querySelector('.back-btn');
    
    closeBtn.addEventListener('click', closeModal);
    backBtn.addEventListener('click', closeModal);

    destinationsModal.addEventListener('click', (e) => {
        if (e.target === destinationsModal) {
            closeModal();
        }
    });

    function closeModal() {
        destinationsModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && destinationsModal.style.display === 'block') {
            closeModal();
        }
    });
}); 