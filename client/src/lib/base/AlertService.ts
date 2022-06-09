import { makeAutoObservable } from "mobx";

import randomString from "../../utils/randomString";

interface IAlert {
    key: string;
    message: string;
}

export class AlertService {
    
    alerts: IAlert[] = [];

    get current() {
        if (this.alerts.length) {
            return this.alerts[0];
        } else {
            return null;
        }
    };
    
    constructor() {
        makeAutoObservable(this);
    }
    
    hideCurrent = () => {
        if (this.alerts.length > 0) {
            this.alerts.shift();
        }
    };

    notify = (message: string) => {
        this.hideCurrent();
        this.alerts.push({
            key: randomString(),
            message, 
        });
    };

}

export default AlertService;
