// ChatLayout.jsx
import { matchPath, useLocation } from "react-router-dom";
import ChatWidget from "../components/chat/ChatWidget";

const HIDDEN_ROUTES = ["/groups/:id"]; // routes où le chat ne doit pas apparaître

export default function Layout({ children }) {
    const location = useLocation();
    const shouldHideChat = HIDDEN_ROUTES.some((pattern) => matchPath(pattern, location.pathname));
    return (
        <>
            {children}
            {!shouldHideChat && <ChatWidget />}
        </>
    );
}
