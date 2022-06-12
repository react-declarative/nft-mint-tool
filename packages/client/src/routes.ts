import { ISwitchItem } from "react-declarative";

import ConnectPage from "./pages/ConnectPage";
import PermissionPage from "./pages/PermissionPage";
import NoMetamaskPage from "./pages/NoMetamaskPage";
import NotDeployedPage from "./pages/NotDeployedPage";
import ErrorPage from "./pages/ErrorPage";
import MintPage from "./pages/MintPage";
import AfterMintPage from "./pages/AfterMintPage";

import ioc from "./lib/ioc";

const routes: ISwitchItem[] = [
    {
        path: '/',
        prefetch: () => ioc.assetService.prefetch(),
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
        path: '/aftermint-page',
        element: AfterMintPage,
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
    {
        path: '/error-page',
        element: ErrorPage,
    },
];

export default routes;
