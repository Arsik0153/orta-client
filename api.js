class Api {
    constructor(notifier) {
        this.notifier = notifier;
        this.api = axios.create({
            baseURL: "http://adiltao7.beget.tech/api/v1",
            timeout: 1000,
        });
    }

    getItems = async () => {
        const { data } = await this.api.get("/products");
        this.notifier.notify(data.data);
    };
}
