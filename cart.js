class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem("cart")) ?? [];
        this.floatCart = document.querySelector("#floatCart");
        this.updateFloatCart();
    }

    addItem = (item) => {
        if (this.items.includes(item)) {
            return;
        }
        this.items.push(item);
        localStorage.setItem("cart", JSON.stringify(this.items));
        this.updateFloatCart();
    };

    removeItem = (item) => {
        this.items = this.items.filter(
            (currentItem) => currentItem.id !== item.id
        );
    };

    attachListeners = () => {
        const items = Array.from(
            document.querySelectorAll("div[data-item-id]")
        );
        items.map((item) =>
            item.addEventListener("click", () => {
                this.addItem(item.getAttribute("data-item-id"));
            })
        );
    };

    updateFloatCart = () => {
        this.floatCart.innerHTML = this.items.length;
    };
}
