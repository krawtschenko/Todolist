import React from "react";
import {createRoot} from 'react-dom/client';
import "./index.css";
import {Provider} from "react-redux";
import App from "./App";
import {store} from "./state/store";

const root = createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // Provider для того щоб всі дочірні компоненти отримували store
    <Provider store={store}>
        <App/>
    </Provider>
);
