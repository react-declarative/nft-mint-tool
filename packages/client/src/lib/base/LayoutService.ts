import { makeAutoObservable } from 'mobx';

export class LayoutService {

    private _loading = 0;

    get hasLoader() {
        return !!this._loading;
    };

    constructor() {
        makeAutoObservable(this);
    }

    setLoader = (loading: boolean) => {
        this._loading = Math.max(this._loading + (loading ? 1 : -1), 0);
    };

}

export default LayoutService;
