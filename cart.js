
let cartItem = JSON.parse(localStorage.getItem("carts")) || [];

let shopingPrice = "400";
let tax = "0";


fetch("./data.json").then(res => (
    res.json()
)).then(data => {
    // const filteredData = data.filter(product => cartItems.includes(product.id));

    hendelDataCart(data.filter(product => cartItem.includes(JSON.stringify(product.id))));
})




let totalprice = 0;

let priceFinnal = (+tax) + (+shopingPrice);


const totalPrice = document.querySelector("#totalPrice");

const priceE = document.querySelector("#price");

const shopingPriceE = document.querySelector("#shopingPrice");
shopingPriceE.innerText = shopingPrice + "da";

const taxPrice = document.querySelector("#taxPrice");
taxPrice.innerText = tax + "da";



const contentItemCart = document.querySelector(".cart-content");


function hendelDataCart(data) {

    data.forEach(product => {
        const productElement = CreatElemntCart(product);
        contentItemCart.appendChild(productElement);
    })




}


function CreatElemntCart(product) {
    const newElemnt = document.createElement("div");
    newElemnt.classList.add("grid", "sm:grid-cols-3", "items-center", "gap-4", "pr");

    newElemnt.innerHTML = `
     <div class="sm:col-span-2 flex items-center gap-4">
    <div class="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
        <img src='${product.url}'
            class="w-full h-full object-contain" />
    </div>

    <div>
        <h3 class="text-base font-bold text-gray-200">${product.name}</h3>
        <h6 class="text-xs text-red-500 cursor-pointer mt-0.5" id="removed">Remove</h6>

        <div class="flex gap-4 mt-4">
            
            <div class="relative group">
                <button id="dropdownButton" type="button"
                    class="flex items-center px-2.5 py-1.5 border border-gray-600 text-gray-200 text-xs outline-none bg-transparent rounded-md">
                    XL
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-2.5 fill-gray-500 inline ml-2.5" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            clip-rule="evenodd" data-original="#000000" />
                    </svg>
                </button>

                <ul id="talleSelected"
                    class='group-hover:block hidden absolute rounded-md min-w-[80px] bg-gray-900 shadow-lg z-[1000]'>
                    <li
                        class='py-2 px-4 hover:bg-gray-800 text-gray-200 text-xs cursor-pointer'>
                        SM</li>
                    <li
                        class='py-2 px-4 hover:bg-gray-800 text-gray-200 text-xs cursor-pointer'>
                        MD</li>
                    <li
                        class='py-2 px-4 hover:bg-gray-800 text-gray-200 text-xs cursor-pointer'>
                        XL</li>
                    <li
                        class='py-2 px-4 hover:bg-gray-800 text-gray-200 text-xs cursor-pointer'>
                        XXL</li>
                </ul>
            </div>



            <div>
                <button type="button"
                    class="flex items-center px-2.5 py-1.5 border border-gray-600 text-gray-200 text-xs outline-none bg-transparent rounded-md">

                    <svg id="removeItem" xmlns="http://www.w3.org/2000/svg"
                        class="w-2.5 fill-current" viewBox="0 0 124 124">
                        <path
                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            data-original="#000000"></path>
                    </svg>

                    <span id="contentItem" class="mx-2.5">1</span>

                    <svg id="addItem" xmlns="http://www.w3.org/2000/svg"
                        class="w-2.5 fill-current" viewBox="0 0 42 42">
                        <path
                            d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                            data-original="#000000"></path>
                    </svg>

                </button>

            </div>


        </div>
    </div>
</div>


<div class="ml-auto">
    <h4 id="contentItemPrive" class="text-lg font-bold text-gray-200">${product.price}da</h4>
</div>


    `

    let content = 1;


    totalprice += +product.price;
    totalPrice.innerText = totalprice + "da";

    priceFinnal += (+product.price);
    priceE.innerText = priceFinnal + "da";

    const contentItemPrive = newElemnt.querySelector("#contentItemPrive")
    const contentItem = newElemnt.querySelector("#contentItem");
    const addItem = newElemnt.querySelector("#addItem");
    const removeItem = newElemnt.querySelector("#removeItem");

    // const pr = newElemnt.querySelector(".pr")

    const removed = newElemnt.querySelector("#removed")

    addItem.addEventListener('click', addItemTo);
    removeItem.addEventListener('click', removeItemTo);


    removed.addEventListener('click', () => {

        cartItem = cartItem.filter(itm => itm != product.id);
        console.log(cartItem);

        localStorage.setItem('carts', JSON.stringify(cartItem));

        contentItemCart.removeChild(newElemnt);


    });



    const listItems = newElemnt.querySelectorAll('#talleSelected li');
    const dropdownButton = newElemnt.querySelector('#dropdownButton');

    listItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove the 'selected' class from all items
            listItems.forEach(li => li.classList.remove('selected'));

            // Add the 'selected' class to the clicked item
            this.classList.add('selected');

            // Update the button text with the selected item text
            dropdownButton.firstChild.textContent = this.textContent.trim();
        });
    });


    function removeItemTo() {
        totalprice -= content > 1 ? (+product.price) : 0;
        totalPrice.innerText = totalprice + "da";

        priceFinnal -= content > 1 ? (+product.price) : 0;
        priceE.innerText = priceFinnal + "da";



        contentItem.innerText = content > 1 ? --content : content;
        contentItemPrive.innerText = content * product.price + "da";


    }


    function addItemTo() {
        totalprice += (+product.price);

        contentItem.innerText = ++content;
        contentItemPrive.innerText = content * product.price + "da";

        totalPrice.innerText = totalprice + "da";


        priceFinnal += (+product.price);
        priceE.innerText = priceFinnal + "da";

    }





    return newElemnt;
}










