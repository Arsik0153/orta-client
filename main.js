// simple array of items
const items = Array(6)
    .fill(0)
    .map((_, index) => ({
        id: index,
        title: "Футболки SGL",
        price: 10000,
    }));

class Shop {
    constructor(items) {
        this.items = items ? items : [];
        this.listContainer = document.querySelector("#listContainer");
    }

    renderList = (data) => {
        this.listContainer.innerHTML = items.reduce(
            (previous, current) =>
                previous +
                this.renderCardTemplate(
                    current.id,
                    current.title,
                    numberWithSpaces(current.price)
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
}

// Initialize

const observer = new EventObserver();
const api = new Api(observer);
const shop = new Shop(items);

observer.subscribe(shop.renderList);

api.getItems();

/* UTILS */

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
