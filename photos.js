const imagesFolder = 'photos'
const scrollContainer = document.getElementById('scrollContainer');

const images = [
    {
        file: '2024-canal.jpeg',
        name: 'Canal',
        date: '2024',
    },
    {
        file: '2025-cherry-blossoms.JPG',
        name: 'Cherry Blossoms',
        date: '2025',
    },
    {
        file: '2024-strawberry.JPG',
        name: 'Strawberry',
        date: '2024',
    },
    {
        file: '2025-newbury.JPG',
        name: 'Newbury',
        date: '2025',
    },
    {
        file: '2024-kyoto.JPG',
        name: 'Arashiyama',
        date: '2024',
    },
    {
        file: '2025-tree-flowers.JPG',
        name: 'Flowers',
        date: '2025',
    },
    {
        file: '2024-foliage.JPG',
        name: 'Foliage',
        date: '2024'
    }
];

async function loadImages() {
    try {
        // Create intersection observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Set the actual source
                    observer.unobserve(img); // Stop observing once loaded
                }
            });
        }, {
            root: null,
            rootMargin: '50px', // Start loading images 50px before they enter viewport
            threshold: 0
        });

        images.forEach(image => {
            const container = document.createElement('div');
            container.style.display = 'inline-block';
            container.style.textAlign = 'left';

            const imgElement = document.createElement('img');
            imgElement.dataset.src = `${imagesFolder}/${image.file}`; // Store the source in data attribute
            imgElement.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent placeholder
            imageObserver.observe(imgElement); // Start observing the image
            container.appendChild(imgElement);

            const details = document.createElement('div');
            details.style.whiteSpace = 'normal';
            details.style.marginTop = '8px';
            details.style.marginBottom = '16px';
            details.style.fontSize = '0.7em';
            details.style.maxWidth = '100%';
            details.style.overflow = 'hidden';
            details.style.textOverflow = 'ellipsis';

            if (image.link) {
                const nameLink = document.createElement('a');
                nameLink.href = image.link;
                nameLink.textContent = image.name.toUpperCase();
                nameLink.style.display = 'inline';
                details.appendChild(nameLink);
                details.appendChild(document.createTextNode(` (${image.date})`));
            } else {
                const nameText = document.createElement('div');
                nameText.textContent = `${image.name.toUpperCase()} (${image.date})`;
                details.appendChild(nameText);
            }

            container.appendChild(details);
            scrollContainer.appendChild(container);
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadImages);