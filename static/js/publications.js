let currentPublication = 1;

document.getElementById('prev-publication').addEventListener('click', () => {
    if (currentPublication > 1) {
        document.getElementById(`publication-${currentPublication}`).style.display = 'none';
        currentPublication--;
        document.getElementById(`publication-${currentPublication}`).style.display = 'flex';
    }
});

document.getElementById('next-publication').addEventListener('click', () => {
    if (currentPublication < 1) { // Update when more publications are added
        document.getElementById(`publication-${currentPublication}`).style.display = 'none';
        currentPublication++;
        document.getElementById(`publication-${currentPublication}`).style.display = 'flex';
    }
});
