import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ConfigProvider, notification} from "antd";

const root = ReactDOM.createRoot(document.getElementById('root'));
notification.config({
    placement: "topRight",
    maxCount: 1
    }
)
root.render(
<React.StrictMode>
    <ConfigProvider >

        <App />

    </ConfigProvider>
</React.StrictMode>
);
