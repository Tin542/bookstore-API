export class ResponseData<D> {
    message: string;
    status: number;
    data: D | D[];

    constructor(message: string, status: number, data: D | D[]) {
        this.message = message;
        this.status = status;
        this.data = data;

        return this;
    }
}