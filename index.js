fetch("./data.json").then(res => (
    res.json()
)).then(data => {
    handleData(data);
})

let cartCount = 0;

//get dom elements
const productContainer = document.querySelector("#products-continer");
const searchInput = document.querySelector("#search");
const checkboxes = document.querySelectorAll(".check");
const filterCountiner = document.querySelector("#filter");
const cartCounter = document.querySelector("#cart-count");

const totalPrice = document.querySelector("#totalPrice");

const productElements = [];

let cartItem = JSON.parse(localStorage.getItem("carts")) || [];

cartCounter.innerText = cartItem.length;


function handleData(data) {

    data.forEach(product => {

        const prodactElemnt = CreatProductElement(product);
        productContainer.appendChild(prodactElemnt);
        productElements.push(prodactElemnt);

    })
}

function CreatProductElement(product) {
    const productElemnt = document.createElement("div");

    if (cartItem.includes(JSON.stringify(product.id))) {


        productElemnt.innerHTML = `
        <div
        class="bg-gray-100 cursor-pointer hover:scale-[1.03] transition-all relative rounded-xl overflow-hidden"
        data-category = "${product.category}"
        data-name = "${product.name}"
        >
    
    
        <div class="w-full aspect-w-16 aspect-h-8 lg:h-80">
            <img src="${product.url}" class="h-full w-full object-contain"
                alt="tshirt" />
        </div>
    
    
        <div class="text-center bg-gray-800 p-6">
            <h3 class="text-lg font-bold">
            ${product.name}
            </h3>
            <h4 class="text-lg text-gray-200 font-bold mt-2">${product.oldprice}
                <strike class="text-gray-400 ml-2 font-meduim">${product.price}da</strike>
    
            </h4>
    
            <button
            data-id = "${product.id}"
            class="added status w-full flex items-center justify-center gap-3 bg-red-400 mt-4 px-6 py-2 text-base text-gray-800 font-semibold rounded-xl"
            type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
            <path
                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                data-original="#000000"></path>
        </svg>
        remove from cart
        </button>
        
    
        </div>
    
    
    </div>
        `;

    }

    else {
        productElemnt.innerHTML = `
    <div
    class="bg-gray-100 cursor-pointer hover:scale-[1.03] transition-all relative rounded-xl overflow-hidden"
    data-category = "${product.category}"
    data-name = "${product.name}"
    >


    <div class="w-full aspect-w-16 aspect-h-8 lg:h-80">
        <img src="${product.url}" class="h-full w-full object-contain"
            alt="tshirt" />
    </div>


    <div class="text-center bg-gray-800 p-6">
        <h3 class="text-lg font-bold">
        ${product.name}
        </h3>
        <h4 class="text-lg text-gray-200 font-bold mt-2">${product.oldprice}
            <strike class="text-gray-400 ml-2 font-meduim">${product.price}da</strike>

        </h4>

        <button
        data-id = "${product.id}"
        class="status w-full flex items-center justify-center gap-3 bg-yellow-400 mt-4 px-6 py-2 text-base text-gray-800 font-semibold rounded-xl"
        type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
            <path
                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                data-original="#000000"></path>
        </svg>
        add to cart
    </button>
    

    </div>


</div>
    `;

    }

    productElemnt.querySelector(".status").addEventListener('click', updateCart);

    return productElemnt;

}


function updateCart(e) {
    const btn = e.target;
    //console.log(btn.dataset.id);

    if (btn.classList.contains('added')) {

        btn.classList.remove('bg-red-400');
        btn.classList.add('bg-yellow-400');

        btn.classList.remove('added');
        btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
            <path
                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                data-original="#000000"></path>
        </svg>
        add to cart
        `

        //  cartCount--;
        cartItem = cartItem.filter(itm => itm !== btn.dataset.id);

        localStorage.setItem('carts', JSON.stringify(cartItem));


    } else {
        btn.classList.remove('bg-yellow-400');
        btn.classList.add('bg-red-400');
        btn.classList.add('added');

        btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
            <path
                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                data-original="#000000"></path>
        </svg>
        remove from cart
        `
        //  cartCount++;
        cartItem.push(btn.dataset.id);
        localStorage.setItem('carts', JSON.stringify(cartItem));


    }

    console.log(cartItem);

    cartCounter.innerText = cartItem.length;
}






filterCountiner.addEventListener('change', filterProduct)
searchInput.addEventListener('input', filterProduct)

function filterProduct() {
    const searshItem = searchInput.value;
    console.log(searshItem);



    const selectore = Array.from(checkboxes)
        .filter(check => check.checked)
        .map(check => check.id)

    productElements.forEach(element => {
        const category = element.firstElementChild.dataset.category;
        const categoryFilter = selectore.length === 0 || selectore.includes(category);
        const searchFilter = element.firstElementChild.dataset.name.includes(searshItem);

        if (categoryFilter && searchFilter) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }

    })

}