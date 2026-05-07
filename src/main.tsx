import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./components/store";
import {getLocalStorage} from "./components/utils/storage/localStorageUtils.ts";
import {isTokenActive} from "./components/utils/storage/isTokenActive.ts";
import {autoLogin} from "./components/store/accounts/accounts.slice.ts";
import http_common from "./http_common.ts";

// Ініціалізація PostHog
posthog.init('phc_ubJ5aBQmxgLdpj9t7q8tMP5RyijPTFRNDUezKUV6ZPXS', {
    api_host: 'https://eu.posthog.com', 
    autocapture: true, // Дозволяє автоматично відстежувати кліки та перегляди сторінок
})

const token = getLocalStorage('authToken');
if (typeof token === 'string') {
    if (isTokenActive(token)) {
        store.dispatch(autoLogin(token));
        http_common.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)
