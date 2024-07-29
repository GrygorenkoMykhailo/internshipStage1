import React, { useEffect } from "react";
import axios from "axios";

export const ActivityTrackerComponent: React.FC = React.memo(() => {

    const sendActivity = (type: string, data: object) => {
        axios.post(import.meta.env.VITE_BASE_URL + '/userAction', {
            type, 
            time: Date.now(),
            data,
        });
    }

    useEffect(() => {  
        const loadEventCallback = () => {
            sendActivity('page_view', { url: window.location.href });
        }

        const clickEventCallback = (e: MouseEvent) => {
            sendActivity('click', { x: e.clientX, y: e.clientY });
        }
        
        const scrollEventCallback = () => {
            sendActivity('scroll', { scroll: window.scrollY });
        }

        window.addEventListener('load', loadEventCallback);

        window.addEventListener('click', clickEventCallback);

        window.addEventListener('scroll', scrollEventCallback);
    }, []);
    return null;
})