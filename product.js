// ฟังก์ชันดึงข้อมูลภาพสินค้าจาก URL
function getImageFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const img = urlParams.get('img');
    return img ? img : 'default-image.png'; // ใช้รูปภาพดีฟอลต์ถ้าไม่มี
}

// ฟังก์ชันดึงข้อมูลสินค้าจาก URL
function getProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'ชื่อสินค้า';
    const price = urlParams.get('price') || '0';
    return { name, price };
}

// ฟังก์ชันเพิ่มสินค้าไปยังตะกร้า
function addToCart() {
    const productImage = document.querySelector('.product-image img').src;
    const productAddress = document.querySelector('.product-info input').value;
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name') || "สินค้า"; // ใช้ชื่อที่ดึงมาจาก URL
    const productPrice = parseInt(urlParams.get('price')) || 0; // ใช้ราคาที่ดึงมาจาก URL

    if (productAddress) {
        const product = {
            name: productName,
            img: productImage,
            price: productPrice,
            address: productAddress
        };

        // ดึงข้อมูลตะกร้าจาก LocalStorage (หรือสร้างใหม่ถ้าไม่มี)
        let cart = JSON.parse(localStorage.getItem('nikeCart')) || [];
        cart.push(product); // เพิ่มสินค้าเข้าไปในตะกร้า
        localStorage.setItem('nikeCart', JSON.stringify(cart)); // เก็บตะกร้าลงใน LocalStorage

        alert("สินค้าถูกเพิ่มลงในตะกร้าแล้ว!");

        // เพิ่มเอฟเฟกต์การเด้งให้กับตะกร้า
        const cartIcon = document.querySelector('.search-cart .cart');
        cartIcon.classList.add('animate');

        // ลบคลาส animate หลังจากการเคลื่อนไหวเสร็จสิ้น
        setTimeout(() => {
            cartIcon.classList.remove('animate');
        }, 500); // ให้เวลาประมาณ 500ms (เวลาของ animation)

        // ล้างช่องกรอกที่อยู่หลังจากเพิ่มสินค้า
        document.querySelector('.product-info input').value = '';
    } else {
        alert("กรุณากรอกรายละเอียดที่อยู่ลูกค้าก่อน!");
    }
}

// ฟังก์ชันแสดงการแจ้งเตือนการสั่งซื้อเสร็จสิ้น
function completeOrder() {
    const productAddress = document.querySelector('.product-info input').value;

    if (productAddress) {
        alert("การสั่งซื้อเสร็จสิ้น! ขอบคุณสำหรับการสั่งซื้อ");
        // ล้างช่องกรอกที่อยู่หลังจากสั่งซื้อ
        document.querySelector('.product-info input').value = '';
    } else {
        alert("กรุณากรอกรายละเอียดที่อยู่ลูกค้าก่อนสั่งซื้อ!");
    }
}

// ฟังก์ชันสำหรับแสดงข้อมูลสินค้า
function displayProductDetails() {
    const productImage = document.querySelector('.product-image img');
    const productNameElement = document.querySelector('.product-name');
    const productPriceElement = document.querySelector('.product-price');

    // ตั้งค่ารูปสินค้า
    productImage.src = getImageFromUrl();

    // ตั้งค่ารายละเอียดสินค้า (ชื่อและราคา)
    const { name, price } = getProductDetails();
    productNameElement.textContent = name;
    productPriceElement.textContent = `ราคา: ${price} บาท`;
}

window.onload = function() {
    displayProductDetails(); // แสดงรายละเอียดสินค้าเมื่อโหลดหน้า
};
