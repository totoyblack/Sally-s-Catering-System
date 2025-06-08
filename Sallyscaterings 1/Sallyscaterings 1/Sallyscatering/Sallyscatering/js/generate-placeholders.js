// List of Filipino dishes
const dishes = [
    'lumpia',
    'tokwa-baboy',
    'ensalada',
    'kinilaw',
    'lechon',
    'kare-kare',
    'adobo',
    'sinigang',
    'leche-flan',
    'halo-halo',
    'buko-pandan',
    'turon'
];

// Function to create a placeholder image
function createPlaceholderImage(dishName) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = '#333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dishName.toUpperCase(), canvas.width/2, canvas.height/2);

    // Save as image
    const link = document.createElement('a');
    link.download = `${dishName}.jpg`;
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
}

// Generate placeholders for all dishes
dishes.forEach(dish => createPlaceholderImage(dish)); 