let imageCount = 0;
let currentPage = 1;
let imagesPerPage = 5;
let totalPages = 1;
let images = [];

function addImage() {
    imageCount++;
    const img = document.createElement('img');
    img.src = `https://picsum.photos/100?random=${Math.floor(Math.random() * 100)}`;
    img.alt = `Image ${imageCount}`;
    img.onclick = () => openFullscreen(img.src);
    img.draggable = true;
    img.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.src);
    });
    images.push(img);
    displayImages();
    updatePageCounter();
    updateArrows();
}

function displayImages() {
    const imageContainer = document.querySelector('.image-container');
    imageContainer.innerHTML = ''; 
    
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = Math.min(startIndex + imagesPerPage, images.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        imageContainer.appendChild(images[i]);
    }
    

    imageContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    imageContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const src = e.dataTransfer.getData('text');
        const draggedImg = images.find((img) => img.src === src);
        const dropTarget = e.target;
        
        if (dropTarget.tagName === 'IMG') {
            const dropTargetIndex = images.indexOf(dropTarget);
            const draggedIndex = images.indexOf(draggedImg);
            images.splice(draggedIndex, 1);
            images.splice(dropTargetIndex, 0, draggedImg);
            displayImages();
        }
    });
}

function updatePageCounter() {
    const pageCounter = document.getElementById('page-counter');
    totalPages = Math.ceil(images.length / imagesPerPage);
    pageCounter.innerText = `${currentPage}/${totalPages}`;
}

function updateArrows() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    leftArrow.style.display = currentPage > 1 ? 'block' : 'none';
    rightArrow.style.display = currentPage < totalPages ? 'block' : 'none';
}

function slideLeft() {
    if (currentPage > 1) {
        currentPage--;
        displayImages();
        updatePageCounter();
        updateArrows();
    }
}

function slideRight() {
    if (currentPage < totalPages) {
        currentPage++;
        displayImages();
        updatePageCounter();
        updateArrows();
    }
}

function openFullscreen(src) {
    const fullscreen = document.getElementById('fullscreen');
    const fullscreenImg = document.getElementById('fullscreen-img');
    
    fullscreenImg.src = src;
    fullscreen.style.display = 'flex';
}

function closeFullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
}

updatePageCounter();
updateArrows();