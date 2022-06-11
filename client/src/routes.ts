import { ISwitchItem } from "react-declarative";

import ConnectPage from "./pages/ConnectPage";
import PermissionPage from "./pages/PermissionPage";
import NoMetamaskPage from "./pages/NoMetamaskPage";
import MintPage from "./pages/MintPage";

import ioc from "./lib/ioc";

const routes: ISwitchItem[] = [
    {
        path: '/',
        redirect: '/connect-page',
    },
    {
        path: '/connect-page',
        element: ConnectPage,
        prefetch: () => ioc.web3Service.prefetch(),
        redirect: () => {
            let isOk = true;
            isOk = isOk && ioc.web3Service.isWeb3Available;
            isOk = isOk && ioc.web3Service.isWeb3Connected;
            isOk = isOk && ioc.web3Service.isAccountEnabled;
            if (isOk) {
                return '/mint-page';
            }
            return null;
        },
    },
    {
        path: '/mint-page',
        prefetch: () => ioc.contractService.prefetch(),
        element: MintPage,
    },
    {
        path: '/permission-page',
        element: PermissionPage,
    },
    {
        path: '/nometamask-page',
        element: NoMetamaskPage,
    },
];

export default routes;
