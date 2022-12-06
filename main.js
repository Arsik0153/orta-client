class Shop {
    constructor(cart) {
        this.items = [];
        this.cart = cart;
        this.category = "hoodie"; // hoodie | tshirt | sweetshirt
        this.listContainer = document.querySelector("#listContainer");
        this.tabs = Array.from(document.querySelectorAll(".tab"));
        this.tabs.map((tab) =>
            tab.addEventListener("click", this.handleTabClick)
        );
    }

    renderList = () => {
        // filter by category
        const filteredItems = this.items.filter(
            (item) =>
                item.data.category_id ===
                this.getCategoryIdByString(this.category) + 1
        );
        // render to DOM
        this.listContainer.innerHTML = filteredItems.reduce(
            (previous, current) =>
                previous +
                this.renderCardTemplate(
                    current.data.id,
                    current.data.title,
                    numberWithSpaces(10000)
                ),
            ""
        );
    };

    renderCardTemplate = (id, title, price) => {
        return `
        <div class="card" data-item-id="${id}">
            <img src="images/tshirt.png" alt="${title}" />
            <h4 class="title">${title}</h4>
            <h5 class="price">${price} тг</h5>
        </div>
        `;
    };

    setItems = (items) => {
        this.items = items;
        this.renderList();
        this.cart.attachListeners();
    };

    getItems = () => {
        return this.items;
    };

    getCategoryIdByString = (str) => {
        const categories = ["hoodie", "tshirt", "sweetshirt"];
        return categories.indexOf(str);
    };

    getStringByCategoryId = (id) => {
        const categories = ["hoodie", "tshirt", "sweetshirt"];
        return categories[id];
    };

    handleTabClick = (e) => {
        this.tabs.map((tab) => tab.classList.remove("active"));
        e.target.classList.add("active");
        this.category = this.getStringByCategoryId(this.tabs.indexOf(e.target));
        this.renderList();
        this.cart.attachListeners();
    };
}

// Initialize

const observer = new EventObserver();
const api = new Api(observer);
const cart = new Cart();
const shop = new Shop(cart);

observer.subscribe(shop.setItems);

api.getItems();

/* UTILS */

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
