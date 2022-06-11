import { ISwitchItem } from "react-declarative";

import ConnectPage from "./pages/ConnectPage";
import PermissionPage from "./pages/PermissionPage";
import NoMetamaskPage from "./pages/NoMetamaskPage";
import NotDeployedPage from "./pages/NotDeployedPage";
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
        prefetch: () => ioc.ethersService.prefetch(),
        redirect: () => {
            let isOk = true;
            isOk = isOk && ioc.ethersService.isMetamaskAvailable;
            isOk = isOk && ioc.ethersService.isProviderConnected;
            isOk = isOk && ioc.ethersService.isAccountEnabled;
            if (isOk) {
                return '/mint-page';
            }
            return null;
        },
    },
    {
        path: '/mint-page',
        element: MintPage,
        prefetch: () => ioc.contractService.prefetch(),
        redirect: () => {
            if (!ioc.contractService.isContractConnected) {
                return '/notdeployed-page';
            }
            return null;
        },
    },
    {
        path: '/permission-page',
        element: PermissionPage,
    },
    {
        path: '/nometamask-page',
        element: NoMetamaskPage,
    },
    {
        path: '/notdeployed-page',
        element: NotDeployedPage,
    },
];

export default routes;
