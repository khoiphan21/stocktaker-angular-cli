import { ServiceResponseStatus } from './service-response-status';
export class ServiceResponse {
    status: ServiceResponseStatus;
    message: string;

    constructor(status: ServiceResponseStatus, message: string) {
        this.status = status;
        this.message = message;
    }
}
