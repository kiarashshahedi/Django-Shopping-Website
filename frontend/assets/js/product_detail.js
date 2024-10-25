document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`http://localhost:8000/products/api/products/${productId}/`)
        .then(response => response.json())
        .then(product => {
            const productDetail = document.getElementById('product-detail');
            const detailHtml = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;
            productDetail.innerHTML = detailHtml;
        })
        .catch(error => console.error('Error:', error));
});

function addToCart(productId) {
    // Implement Add to Cart functionality using API
}
