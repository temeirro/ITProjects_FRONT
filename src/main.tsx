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
import * as Sentry from "@sentry/react";
// Ініціалізація PostHog
posthog.init('phc_ubJ5aBQmxgLdpj9t7q8tMP5RyijPTFRNDUezKUV6ZPXS', {
    api_host: '/ingest',    
    ui_host: 'https://eu.i.posthog.com', // Додаємо це, щоб посилання в панель працювали коректно
    autocapture: true,
})

Sentry.init({
  dsn: "https://7783c6dc4e80198ddd91e8f787d325a4@o4511349497987072.ingest.de.sentry.io/4511349510438992", 
  
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Моніторинг продуктивності: записуємо 100% транзакцій під час розробки
  tracesSampleRate: 1.0, 

  // Важливо вказувати середовище, щоб розділяти локальні баги від реальних [cite: 1047]
  environment: "development", 
  
  // Налаштування для запису відео сесій (як у PostHog, але для багів)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

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
