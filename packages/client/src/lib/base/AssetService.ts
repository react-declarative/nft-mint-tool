import { singleshot } from 'react-declarative';
import { makeAutoObservable } from "mobx";

const toBlob = (src: string) => new Promise<Blob>((res) => {
    const img = document.createElement('img');
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    img.onload = ({ target }: any) => {
        c.width = target.naturalWidth;
        c.height = target.naturalHeight;
        ctx!.drawImage(target, 0, 0);
        c.toBlob((b) => res(b!), "image/png", 1.0);
    };
    img.crossOrigin = "";
    img.src = src;
});

export class AssetService {

    private _cacheMap = new Map<string, string>();
    
    constructor() {
        makeAutoObservable(this);
    };

    private downloadImage = async (src: string) => {
        const blob = await toBlob(src);
        const key = URL.createObjectURL(blob);
        this._cacheMap.set(src, key);
    };

    public src = (key: string) => {
        return this._cacheMap.get(key) || key;
    };

    prefetch = singleshot(async () => {
        console.log("AssetService prefetch started");
        try {
            await Promise.all([
                // this.downloadImage('/logo.png'),
                this.downloadImage('/preview.png'),
            ]);
        } catch (e) {
            console.warn('AssetService prefetch failed', e);
        }
    });

};

export default AssetService;
