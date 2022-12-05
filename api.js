class Api {
    constructor(notifier) {
        this.notifier = notifier;
        this.api = axios.create({
            baseURL: "https://jsonplaceholder.typicode.com",
            timeout: 1000,
        });
    }

    getItems = async () => {
        const { data } = await this.api.get("/posts");
        this.notifier.notify(data);
    };
}
