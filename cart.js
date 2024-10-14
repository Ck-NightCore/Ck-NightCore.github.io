window.onload = function() {
    const cartItems = JSON.parse(localStorage.getItem('nikeCart')) || [];
    const cartDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');
    const payButton = document.getElementById('pay-button');
    const qrCodeCanvas = document.getElementById('qr-code');
    const qr = new QRious({
        element: qrCodeCanvas,
        size: 200,
    });

    let totalAmount = 0; // Variable to hold total amount

    function updateCart() {
        cartDiv.innerHTML = ''; // Clear current cart items
        totalAmount = 0; // Reset total amount
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>ราคา: ${item.price} บาท</p>
                    <p>ที่อยู่: ${item.address}</p>
                </div>
                <button class="remove-button" data-index="${index}">ลบ</button>
            `;
            cartDiv.appendChild(cartItem);

            totalAmount += item.price; // Add the price to total amount
        });

        totalPriceDiv.innerHTML = cartItems.length === 0 ? '' : `ยอดรวม: ${totalAmount} บาท`; // Display total price
        payButton.style.display = cartItems.length === 0 ? 'none' : 'block'; // Show/hide payment button
        document.getElementById('item-count').innerText = `จำนวนสินค้าทั้งหมด: ${cartItems.length} ชิ้น`; // Display item count
    }

    updateCart(); // Initial cart update

    payButton.onclick = function() {
        const paymentLink = `https://paymentgateway.ktb.co.th/payment?qrcode=${totalAmount}`; // URL ของระบบชำระเงินของกรุงไทย
        qr.set({
            value: paymentLink // Set QR code to the payment URL
        });
        qrCodeCanvas.style.display = 'block'; // Show QR code
    };

    cartDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.dataset.index; // Get the index of the item to remove
            cartItems.splice(index, 1); // Remove the item from cartItems
            localStorage.setItem('nikeCart', JSON.stringify(cartItems)); // Update localStorage
            updateCart(); // Update cart display
        }
    });
};
