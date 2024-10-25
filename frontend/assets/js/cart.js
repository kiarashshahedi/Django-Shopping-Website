document.addEventListener('DOMContentLoaded', () => {
    fetchCartItems();
});

function fetchCartItems() {
    const accessToken = localStorage.getItem('accessToken');

    fetch('http://localhost:8000/orders/api/cart/', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';
        data.forEach(item => {
            const cartItem = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${item.product.name}</h5>
                        <p class="card-text">Quantity: ${item.quantity}</p>
                        <button class="btn btn-danger" onclick="removeCartItem(${item.id})">Remove</button>
                    </div>
                </div>
            `;
            cartItems.innerHTML += cartItem;
        });
    })
    .catch(error => console.error('Error:', error));
}

function removeCartItem(cartItemId) {
    const accessToken = localStorage.getItem('accessToken');

    fetch(`http://localhost:8000/orders/api/cart/${cartItemId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (response.ok) {
            fetchCartItems();
        } else {
            document.getElementById('cartMessage').innerText = 'Failed to remove item.';
        }
    })
    .catch(error => console.error('Error:', error));
}
