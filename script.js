function showSection(sectionId, clickedLink) {
    // Hide all sections
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('marketplace').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('product-details').style.display = 'none';
    
    // Ensure 'view all trends' section is hidden when navigating away from the dashboard
    document.getElementById('all-products').style.display = 'none'; // Hide All Products (view all trends)

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';

    // Remove 'active' class from all links and add to clicked link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');

    // Handle visibility for the carousel, special offer heading, and top trends
    const carouselSection = document.getElementById('carousel-section'); 
    const specialOfferHeading = document.querySelector('section[aria-label="Special Offers"] h2'); 
    const topTrendsSection = document.querySelector('.top-trends-section'); 

    // Show or hide sections based on the selected section
    if (sectionId === 'dashboard') {
        carouselSection.style.display = 'block';  // Show carousel on Dashboard
        if (specialOfferHeading) specialOfferHeading.style.display = 'block'; // Show special offer heading if exists
        if (topTrendsSection) topTrendsSection.style.display = 'block'; // Show Top Trends on Dashboard
    } else if (sectionId === 'marketplace') {
        if (carouselSection) carouselSection.style.display = 'none';  // Hide carousel on Marketplace
        if (specialOfferHeading) specialOfferHeading.style.display = 'none'; // Hide special offer heading
        if (topTrendsSection) topTrendsSection.style.display = 'none'; // Hide Top Trends on Marketplace
    }else if (sectionId === 'cart') {
        if (carouselSection) carouselSection.style.display = 'none';  // Hide carousel on Marketplace
        if (specialOfferHeading) specialOfferHeading.style.display = 'none'; // Hide special offer heading
        if (topTrendsSection) topTrendsSection.style.display = 'none'; // Hide Top Trends on Marketplace
       
        if (cart && cart.length > 0) {
            document.getElementById('empty-cart-message').style.display = 'none'; // Hide empty cart message
            document.getElementById('cart-items').style.display = 'block'; // Hide empty cart message
        
        } else {
            document.getElementById('empty-cart-message').style.display = 'block'; // Show empty cart message
        }
        
       
        document.getElementById('cart-content').style.display = 'block';
        
    } else {
        if (carouselSection) carouselSection.style.display = 'none';  // Hide carousel on other sections
        if (specialOfferHeading) specialOfferHeading.style.display = 'none'; // Hide special offer heading
        if (topTrendsSection) topTrendsSection.style.display = 'none'; // Hide Top Trends on other sections
    }
}



function goBackToMarketplace() {
    // Hide the product details section
    document.getElementById('product-details').style.display = 'none';
    
    // Hide the All Products (view all trends) section if visible
    document.getElementById('all-products').style.display = 'none'; 

    // Check where the user came from and navigate back to the previous section
    if (previousSection === 'marketplace') {
        // Show the marketplace section
        document.getElementById('marketplace').style.display = 'block';
    } else if (previousSection === 'all-products') {
        // Show the all-products (view all trends) section
        document.getElementById('all-products').style.display = 'block';
    } else {
        // Default to showing the dashboard if no previous section is found
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('carousel-section').style.display = 'block';  // Show the carousel again
        document.querySelector('.top-trends-section').style.display = 'block'; // Show the Top Trends section
    }
}

    // Enhanced Filter Products based on criteria
    function filterProducts(criteria, event) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const products = document.querySelectorAll('.product-item');
        products.forEach(product => {
            const productName = product.querySelector('p').textContent;
            if (criteria === 'All') {
                product.style.display = 'block'; // Show all products
            } else if (criteria === 'Crops' && ['Rice', 'Corn', 'Potato', 'Garlic', 'Onion', 'Ginger', 'Sugarcane', 'Carrot', 'Radish','Soybeans','Barley','Oats','Tomato','Cassava','Coconut','Banana','Pineapple','Mango','Calamansi','Eggplant'].includes(productName)) {
                product.style.display = 'block';
            } else if (criteria === 'Seeds' && productName.toLowerCase().includes('seeds')) {
                product.style.display = 'block';
            } else if (criteria === 'Fertilizers' && productName.toLowerCase().includes('fertilizer')) {
                product.style.display = 'block';
            } else if (criteria === 'Tools' && ['Trowel', 'Mini Hand Rake', 'Water Sprinkler','Gloves','Pruning Shears','Loopers','Spade','Rake','Hoe'].includes(productName)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Enhanced Search Bar functionality
    document.getElementById('search-bar').addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const products = document.querySelectorAll('.product-item');

        products.forEach(product => {
            const productName = product.querySelector('p').textContent.toLowerCase();
            const productDescription = product.querySelectorAll('p')[1].textContent.toLowerCase();  // Assuming second <p> is description
            const productPrice = product.querySelectorAll('p')[2]?.textContent?.toLowerCase();  // Assuming third <p> is price, if exists

            // Check if search filter matches product name, description, or price
            if (productName.includes(filter) || productDescription?.includes(filter) || productPrice?.includes(filter)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Display Product Details
    let previousSection = 'dashboard'; // Default to 'dashboard'
    function showProductDetails(productName) {
        previousSection = 'marketplace';
        const products = {
            'Rice': { img: 'Images/Dashboard imgs/1.jpg', price: '₱44/kilo', rating: 4, description: 'Rice is a staple food in many countries.' },
            'Corn': { img: 'Images/Dashboard imgs/2.jpg', price: '₱46/kilo', rating: 5, description: 'Corn is rich in vitamins and minerals.' },
            'Potato': { img: 'Images/Dashboard imgs/3.jpg', price: '₱48/kilo', rating: 4, description: 'Potatoes are versatile and nutritious.' },
            'Garlic': { img: 'Images/Dashboard imgs/4.jpg', price: '₱60/kilo', rating: 4, description: 'Garlic is a popular seasoning in many dishes worldwide.' },
            'Onion': { img: 'Images/Dashboard imgs/5.jpg', price: '₱50/kilo', rating: 5, description: 'Onions are essential in various cuisines for their flavor.' },
            'Ginger': { img: 'Images/Dashboard imgs/6.jpg', price: '₱70/kilo', rating: 4, description: 'Ginger is known for its medicinal and culinary uses.' },
            'Sugarcane': { img: 'Images/Dashboard imgs/7.jpg', price: '₱65/kilo', rating: 5, description: 'Sugarcane is used to produce sugar and other sweeteners.' },
            'Carrot': { img: 'Images/Dashboard imgs/8.jpg', price: '₱60/kilo', rating: 4, description: 'Carrots are rich in beta-carotene, which is good for eyesight.' },
            'Radish': { img: 'Images/Dashboard imgs/9.jpg', price: '₱55/kilo', rating: 4, description: 'Radish is a crunchy, edible root vegetable.' },
            'Soybeans': { img: 'Images/Dashboard imgs/9.jpg', price: '₱55/kilo', rating: 4, description: 'Radish is a crunchy, edible root vegetable.' },
            'Soybeans': { img: 'Images/Dashboard imgs/10.jpg', price: '₱44/kilo', rating: 4, description: 'Soybeans are a rich source of protein and healthy fats.' },
            'Barley': { img: 'Images/Dashboard imgs/11.jpg', price: '₱46/kilo', rating: 4, description: 'Barley is a versatile grain used in various dishes.' },
            'Oats': { img: 'Images/Dashboard imgs/12.jpg', price: '₱48/kilo', rating: 4, description: 'Oats are a great source of fiber and nutrition.' },
            'Tomato': { img: 'Images/Dashboard imgs/13.jpg', price: '₱50/kilo', rating: 5, description: 'Tomatoes are rich in vitamins and antioxidants.' },
            'Cassava': { img: 'Images/Dashboard imgs/14.jpg', price: '₱60/kilo', rating: 4, description: 'Cassava is a starchy root vegetable.' },
            'Coconut': { img: 'Images/Dashboard imgs/15.jpg', price: '₱70/kilo', rating: 5, description: 'Coconuts are used for their meat and milk.' },
            'Banana': { img: 'Images/Dashboard imgs/16.jpg', price: '₱65/kilo', rating: 4, description: 'Bananas are a popular fruit known for their potassium content.' },
            'Pineapple': { img: 'Images/Dashboard imgs/17.jpg', price: '₱60/kilo', rating: 5, description: 'Pineapples are sweet and tangy tropical fruits.' },
            'Mango': { img: 'Images/Dashboard imgs/18.jpg', price: '₱55/kilo', rating: 5, description: 'Mangoes are known as the king of fruits for their sweetness.' },
            'Calamansi': { img: 'Images/Dashboard imgs/19.jpg', price: '₱60/kilo', rating: 4, description: 'Calamansi is a small citrus fruit used in various dishes.' },
            'Eggplant': { img: 'Images/Dashboard imgs/20.jpg', price: '₱55/kilo', rating: 4, description: 'Eggplants are versatile and can be used in many recipes.' },
            'Rice seeds': { img: 'Images/Dashboard imgs/seeds.jpg', price: '₱55/kilo', rating: 4, description: 'Rice seeds for planting.' },
            'Corn seeds': { img: 'Images/Dashboard imgs/seeds2.jpg', price: '₱55/kilo', rating: 4, description: 'Corn seeds for planting.' },
            'Sunflower seeds': { img: 'Images/Dashboard imgs/seeds3.jpg', price: '₱55/kilo', rating: 4, description: 'Sunflower seeds for planting.' },
            'Tomato seeds': { img: 'Images/Dashboard imgs/seeds4.jpg', price: '₱55/250grams', rating: 4, description: 'Tomato seeds for planting.' },
            'Lettuce seeds': { img: 'Images/Dashboard imgs/seeds5.jpg', price: '₱55/250grams', rating: 4, description: 'Lettuce seeds for planting.' },
            'Carrot seeds': { img: 'Images/Dashboard imgs/seeds6.jpg', price: '₱55/250grams', rating: 4, description: 'Carrot seeds for planting.' },
            'Cucumber seeds': { img: 'Images/Dashboard imgs/seeds7.jpg', price: '₱55/250grams', rating: 4, description: 'Cucumber seeds for planting.' },
            'Pepper seeds': { img: 'Images/Dashboard imgs/seeds8.jpg', price: '₱55/250grams', rating: 4, description: 'Pepper seeds for planting.' },
            'Pumpkin seeds': { img: 'Images/Dashboard imgs/seeds9.jpg', price: '₱55/250grams', rating: 4, description: 'Pumpkin seeds for planting.' },
            'Barley seeds': { img: 'Images/Dashboard imgs/seeds10.jpg', price: '₱55/250grams', rating: 4, description: 'Barley seeds for planting.' },
            'Canola seeds': { img: 'Images/Dashboard imgs/seeds11.jpg', price: '₱55/250grams', rating: 4, description: 'Canola seeds for planting.' },
            'Pea seeds': { img: 'Images/Dashboard imgs/seeds12.jpg', price: '₱55/250grams', rating: 4, description: 'Pea seeds for planting.' },
            'Sesame seeds': { img: 'Images/Dashboard imgs/seeds13.jpg', price: '₱55/250grams', rating: 4, description: 'Sesame seeds for planting.' },
            'Broccoli seeds': { img: 'Images/Dashboard imgs/seeds14.jpg', price: '₱55/250grams', rating: 4, description: 'Broccoli seeds for planting.' },
            'Okra seeds': { img: 'Images/Dashboard imgs/seeds15.jpg', price: '₱55/250grams', rating: 4, description: 'Okra seeds for planting.' },
            'Cauliflower seeds': { img: 'Images/Dashboard imgs/seeds16.jpg', price: '₱55/250grams', rating: 4, description: 'Cauliflower seeds for planting.' },
            'Turnip seeds': { img: 'Images/Dashboard imgs/seeds17.jpg', price: '₱55/250grams', rating: 4, description: 'Turnip seeds for planting.' },
            'Melon seeds': { img: 'Images/Dashboard imgs/seeds18.jpg', price: '₱55/250grams', rating: 4, description: 'Melon seeds for planting.' },
            'Squash seeds': { img: 'Images/Dashboard imgs/seeds19.jpg', price: '₱55/250grams', rating: 4, description: 'Squash seeds for planting.' },
            'Papaya seeds': { img: 'Images/Dashboard imgs/seeds20.jpg', price: '₱55/250grams', rating: 4, description: 'Papaya seeds for planting.' },
            'Phosphorus fertilizer': { img: 'Images/Dashboard imgs/pfertilizers.jpg', price: '₱55/kilo', rating: 4, description: 'Phosphorus fertilizer.' },
            'Nitrogen fertilizer': { img: 'Images/Dashboard imgs/nfertilizers.jpg', price: '₱55/kilo', rating: 4, description: 'Nitrogen fertilizer.' },
            'Potassium fertilizer': { img: 'Images/Dashboard imgs/kfertilizers.jpg', price: '₱55/kilo', rating: 4, description: 'Potassium fertilizer.' },
            'Compost fertilizer': { img: 'Images/Dashboard imgs/fertilizers1.jpg', price: '₱55/kilo', rating: 4, description: 'Compost fertilizer.' },
            'Organic fertilizer': { img: 'Images/Dashboard imgs/fertilizers2.jpg', price: '₱55/kilo', rating: 4, description: 'Organic fertilizer.' },
            'Inorganic fertilizer': { img: 'Images/Dashboard imgs/fertilizers3.jpg', price: '₱55/kilo', rating: 4, description: 'Inorganic fertilizer.' },
            'Nitrate fertilizer': { img: 'Images/Dashboard imgs/fertilizers4.jpg', price: '₱55/kilo', rating: 4, description: 'Nitrate fertilizer.' },
            'Trowel': { img: 'Images/Dashboard imgs/tools1.jpg', price: '₱55', rating: 4, description: 'A handy tool for digging and planting.' },
            'Mini Hand Rake': { img: 'Images/Dashboard imgs/tools2.jpg', price: '₱55', rating: 4, description: 'A small rake for loosening soil and removing debris.' },
            'Water Sprinkler': { img: 'Images/Dashboard imgs/tools3.jpg', price: '₱55', rating: 4, description: 'A tool for watering plants evenly.' },
            'Gloves': { img: 'Images/Dashboard imgs/tools4.jpg', price: '₱55', rating: 4, description: 'Gardening gloves for hand protection.' },
            'Pruning Shears': { img: 'Images/Dashboard imgs/tools5.jpg', price: '₱55', rating: 4, description: 'Tool for trimming plants and branches.' },
            'Loopers': { img: 'Images/Dashboard imgs/tools6.jpg', price: '₱55', rating: 4, description: 'Ideal for cutting thicker branches.' },
            'Spade': { img: 'Images/Dashboard imgs/tools7.jpg', price: '₱55', rating: 4, description: 'A tool for digging and turning soil.' },
            'Rake': { img: 'Images/Dashboard imgs/tools8.jpg', price: '₱55', rating: 4, description: 'Used for leveling soil and gathering debris.' },
            'Hoe': { img: 'Images/Dashboard imgs/tools9.jpg', price: '₱55', rating: 4, description: 'Tool for cultivating and breaking up soil.' }
        };

        const product = products[productName];

        if (product) {
            // Set product details
            document.getElementById('product-image').src = product.img;
            document.getElementById('product-title').textContent = productName;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-description').textContent = product.description;
        
            // Check which section the user came from before showing details
            if (document.getElementById('all-products').style.display === 'block') {
                previousSection = 'all-products';  // User was in "All Products"
            } else if (document.getElementById('marketplace').style.display === 'block') {
                previousSection = 'marketplace';  // User was in "Marketplace"
            } else {
                previousSection = 'dashboard';  // User was in "Dashboard"
            }
    
            // Set the star rating
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += `<span class="star-rating ${i <= product.rating ? 'filled' : ''}">&#9733;</span>`;
            }
            document.getElementById('product-rating').innerHTML = `Ratings: ${stars}`;
            document.getElementById('product-description').textContent = product.description;
    
            // Hide marketplace and show product details
            document.getElementById('marketplace').style.display = 'none';
            document.getElementById('product-details').style.display = 'block';
            document.getElementById('topTrendsSection').style.display = 'none';
            document.getElementById('all-products').style.display = 'none';  
            // Hide carousel and top trends when viewing product details
            document.getElementById('dashboard').style.display = 'none';
            document.getElementById('all-products-section').style.display = 'none';
            document.getElementById('carousel-section').style.display = 'none';
            document.querySelector('.top-trends-section').style.display = 'none';
        }
    }
    function showTopTrendProductDetails(productName) {
        previousSection = 'dashboard';
        const products = {
            'Corn': { img: 'Images/Dashboard imgs/image1.jpg', price: '₱46/kilo', rating: 5, description: 'Corn is rich in vitamins and minerals.' },
            'Sugarcane': { img: 'Images/Dashboard imgs/image2.jpg', price: '₱65/kilo', rating: 5, description: 'Sugarcane is used to produce sugar and other sweeteners.' },
            'Rice': { img: 'Images/Dashboard imgs/image3.jpg', price: '₱44/kilo', rating: 4, description: 'Rice is a staple food in many countries.' },
            'Garlic': { img: 'Images/Dashboard imgs/4.jpg', price: '₱60/kilo', rating: 4, description: 'Garlic is a popular seasoning in many dishes worldwide.' },
        };
    
        const product = products[productName];
    
        if (product) {
            document.getElementById('product-image').src = product.img;
            document.getElementById('product-title').textContent = productName;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-rating').innerHTML = `Ratings: ${product.rating}/5`;
            document.getElementById('product-description').textContent = product.description;

            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += `<span class="star-rating ${i <= product.rating ? 'filled' : ''}">&#9733;</span>`;
            }
            document.getElementById('product-rating').innerHTML = `Ratings: ${stars}`;
    
            // Hide carousel and top trends when viewing product details
            document.getElementById('carousel-section').style.display = 'none';
            document.querySelector('.top-trends-section').style.display = 'none';
    
            // Hide dashboard and marketplace
            document.getElementById('dashboard').style.display = 'none';
            document.getElementById('marketplace').style.display = 'none';
            document.getElementById('product-details').style.display = 'block';
        }
    }
    
    // Start Cart Code
   
    

    let cart = [];

// Function to update the cart count displayed in the UI
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length; // Update the text content with the cart length
}

// Function to add the product to the cart
function addToCart() {
    // Get product details
    const productTitle = document.getElementById("product-title").innerText;
    const productPrice = document.getElementById("product-price").innerText;
    const productImage = document.getElementById("product-image").src;
    const productDescription = document.getElementById("product-description").innerText;
    
    // Function to get the filled star rating
    function getFilledStarRating() {
        // Count the filled stars
        const filledStars = document.querySelectorAll('#product-rating .filled').length; 
        return filledStars; // Returns the number of filled stars
    }

    // Get the current filled star rating
    const rating = getFilledStarRating();

    // Create a product object
    const product = {
        title: productTitle,
        price: productPrice,
        image: productImage,
        description: productDescription,
        rating: rating,
        quantity: 1 // Default quantity
    };

    // Add product to the cart array
    cart.push(product);

    // alert('Product added to cart');
    // Update the cart display
    updateCartDisplay();
    updateCartCount();
}


  
        // Function to create a cart item element
        function createCartItem(item, index) {
            // Create a cart item row element
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item-row"; // Add class for styling

            // Set the star rating for the current item
            const stars = Array.from({ length: 5 }, (_, i) => `
                <span class="star-rating ${i < item.rating ? 'filled' : ''}">&#9733;</span>
            `).join('');

     // Populate cart item HTML
            cartItem.innerHTML = `
            <input type="checkbox" class="product-checkbox" id="product-${index}">
            <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;">
            <p class="item-title">${item.title}</p>
            <p class="item-description" onclick="toggleDescription(this)">${item.description}</p>
                <div class="description-detail" style="display: none;">
                    ${item.description}
                </div>
            <p>Ratings: ${stars}</p>
            <p>${item.price}</p>
            <div class="quantity-controls">
                <button type="button" class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" readonly style="width: 50px; text-align: center;">
                <button type="button" class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <button class="profile-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            return cartItem;
        }


        function toggleDescription(element) {
            const descriptionDetail = element.nextElementSibling; // This is the div with the description
            const descriptionText = descriptionDetail.innerHTML; // Get the inner HTML (description)

            // Show the description in an alert
            alert(descriptionText);
        }
        

        // Function to update quantity
        function updateQuantity(index, change) {
            // Get the current quantity
            const quantityInput = document.getElementById(`quantity-${index}`);
            let currentQuantity = parseInt(quantityInput.value);

            // Adjust quantity based on change
            if (change === -1) {
                currentQuantity -= 1; // Decrease quantity
            } else if (change === 1) {
                currentQuantity += 1; // Increase quantity
            }

            // Check if the quantity is less than 1
            if (currentQuantity < 1) {
                // Show alert that the item will be removed
                alert("This item will be removed from the cart.");
                removeFromCart(index); // Remove the item from the cart
                return; // Exit the function
            }

            // Update the input value
            quantityInput.value = currentQuantity;

            // Update the cart object
            cart[index].quantity = currentQuantity;

            // Call updateCartDisplay() to refresh the display
            updateCartDisplay();

           

        }



        // Function to update cart display (remains the same)
        function updateCartDisplay() {
            console.log(cart);

            const cartItemsContainer = document.getElementById("cart-items");
            cartItemsContainer.innerHTML = ""; // Clear previous cart items

            if (cart.length === 0) {
                document.getElementById("empty-cart-message").style.display = "block"; // Show empty cart message
                document.getElementById("checkout-btn").style.display = "none"; // Hide checkout button
            } else {
                document.getElementById("empty-cart-message").style.display = "none"; // Hide empty cart message
                document.getElementById("checkout-btn").style.display = "block"; // Show checkout button

                cart.forEach((item, index) => {
                    const cartItem = createCartItem(item, index);
                    cartItemsContainer.appendChild(cartItem);
                });
            }
        }



    // Function to remove an item from the cart
    function removeFromCart(index) {
        cart.splice(index, 1); // Remove item from cart array
        updateCartDisplay(); // Update cart display
        updateCartCount();
    }

    // Function to checkout
    function checkout() {
        const selectedProducts = cart.filter((_, index) => document.getElementById(`product-${index}`).checked);
        
        if (selectedProducts.length === 0) {
            alert("Please select at least one product to checkout.");
            return;
        }

        // Implement checkout process (e.g., proceed to payment, send data to server, etc.)
        console.log("Checkout with the following products:", selectedProducts);
        alert("Checkout successful!"); // Placeholder for a successful checkout message
        cart = []; // Clear cart after checkout
        updateCartDisplay(); // Update cart display
         updateCartCount();
    }


    // End Cart Code
    function buyNow() {
        alert('Proceeding to purchase');
        // Add functionality to handle purchase or payment redirection
    }

    // Render the Sales Chart
    function renderSalesChart() {
        const ctx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(ctx, {
            type: 'bar', 
            data: {
                labels: [
                    'Rice', 'Corn', 'Potato', 'Garlic', 'Onion', 'Ginger', 'Sugarcane', 'Carrot', 'Radish',
                    'Soybeans', 'Barley', 'Oats', 'Tomato', 'Cassava', 'Coconut', 'Banana', 'Pineapple', 'Mango', 'Calamansi', 'Eggplant'
                ],
                datasets: [
                    {
                        label: '2022',
                        data: [
                            44, 46, 48, 50, 60, 70, 65, 60, 55, 
                            44, 46, 48, 50, 60, 70, 65, 60, 55, 60, 55
                        ],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '2023',
                        data: [
                            140, 130, 160, 110, 95, 150, 170, 120, 115, 
                            140, 130, 160, 110, 95, 150, 170, 120, 115, 120, 115
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    

    // Initialize the page and render the chart on page load
    window.onload = function() {
        renderSalesChart();
    };

    let currentSlide = 0;

    function moveCarousel(direction) {
        const carousel = document.querySelector('.carousel');
        const totalItems = document.querySelectorAll('.carousel-item').length;

        currentSlide += direction;

        if (currentSlide >= totalItems) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = totalItems - 1;
        }

        // Move the carousel by 100% of the width per slide
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Automatically move to the next slide every 5 seconds
    setInterval(() => {
        moveCarousel(1); // Move to the next slide
    }, 5000); // Change 5000 to your desired interval in milliseconds

    function viewAllTrends() {
        // Hide the top trends and other dashboard sections
        document.getElementById('topTrendsSection').style.display = 'none';
        document.getElementById('carousel-section').style.display = 'none';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('all-products').style.display = 'block'; // Show All Products
    
        // Attach event listeners only once
        document.querySelectorAll('#all-products .trend-item').forEach(item => {
            item.onclick = function() {
                const productName = this.querySelector('.overlay-text').textContent; // Get product name
                showProductDetails(productName);  // Show product details
            };
        });
    }
    
    function goBackToDashboard() {
        // Show the Top Trends section again
        document.getElementById('topTrendsSection').style.display = 'block';
        document.getElementById('carousel-section').style.display = 'block';
        document.getElementById('dashboard').style.display = 'block';
        
        // Hide the All Products section
        document.getElementById('all-products').style.display = 'none';
    }

    
    function loadAllProducts() {
        const trendsGrid = document.querySelector('.trends-grid');
        trendsGrid.classList.add('all-products-view');
    }
    
