import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type {
    Conversation,
    CurrentUser,
    DashboardStats,
    Group,
    Message,
    NewGroupInput,
    Technician,
} from "../types";
import { statsApi, userApi } from "../api/misc";
import { messagingApi } from "../api/messaging";
import { groupsApi } from "../api/groups";

interface AppContextValue {
    // Groups
    groups: Group[];
    groupsLoading: boolean;
    groupsError: string | null;
    refreshGroups: () => void;
    addGroup: (input: NewGroupInput) => Promise<Group>;
    addGroupLoading: boolean;
    addGroupError: string | null;

    // Dashboard stats
    totalBirds: number;
    stats: DashboardStats | null;
    statsLoading: boolean;

    // Messaging
    conversations: Conversation[];
    technicians: Technician[];
    conversationsLoading: boolean;
    conversationsError: string | null;
    activeConversation: number | null;
    setActiveConversation: (id: number) => void;
    messagesByConversation: Record<number, Message[]>;
    messagesLoading: boolean;
    sendMessage: (conversationId: number, text: string) => Promise<void>;

    // UI state
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    notifications: number;

    // Current user
    currentUser: CurrentUser | null;
    currentUserLoading: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    // ---- Groups ----
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupsLoading, setGroupsLoading] = useState(true);
    const [groupsError, setGroupsError] = useState<string | null>(null);
    const [addGroupLoading, setAddGroupLoading] = useState(false);
    const [addGroupError, setAddGroupError] = useState<string | null>(null);

    const fetchGroups = useCallback(() => {
        const controller = new AbortController();
        setGroupsLoading(true);
        setGroupsError(null);
        groupsApi
            .list(controller.signal)
            .then(setGroups)
            .catch((err) => {
                if (err?.name !== "AbortError") {
                    setGroupsError(err?.message || "Impossible de charger les groupes.");
                }
            })
            .finally(() => setGroupsLoading(false));
        return () => controller.abort();
    }, []);

    useEffect(() => fetchGroups(), [fetchGroups]);

    useEffect(() => console.log("GROUPES", groups), [groups]);

    const addGroup = useCallback(async (input: NewGroupInput) => {
        setAddGroupLoading(true);
        setAddGroupError(null);
        try {
            const created = await groupsApi.create(input);
            setGroups((prev) => [...prev, created]);
            return created;
        } catch (err: any) {
            setAddGroupError(err?.message || "Impossible de créer le groupe.");
            throw err;
        } finally {
            setAddGroupLoading(false);
        }
    }, []);

    const totalBirds = useMemo(() => groups.reduce((sum, g) => sum + g.count, 0), [groups]);

    // ---- Dashboard stats ----
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        setStatsLoading(true);
        statsApi
            .getOverview(controller.signal)
            .then(setStats)
            .catch(() => setStats(null))
            .finally(() => setStatsLoading(false));
        return () => controller.abort();
    }, []);

    // ---- Messaging ----
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [conversationsLoading, setConversationsLoading] = useState(true);
    const [conversationsError, setConversationsError] = useState<string | null>(null);
    const [activeConversation, setActiveConversation] = useState<number | null>(null);
    const [messagesByConversation, setMessagesByConversation] = useState<Record<number, Message[]>>(
        {},
    );
    const [messagesLoading, setMessagesLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setConversationsLoading(true);
        setConversationsError(null);
        Promise.all([
            messagingApi.listConversations(controller.signal),
            messagingApi.listTechnicians(controller.signal),
        ])
            .then(([convs, techs]) => {
                setConversations(convs);
                setTechnicians(techs);
                if (convs.length > 0) setActiveConversation((prev) => prev ?? convs[0].id);
            })
            .catch((err) => {
                if (err?.name !== "AbortError") {
                    setConversationsError(err?.message || "Impossible de charger les discussions.");
                }
            })
            .finally(() => setConversationsLoading(false));
        return () => controller.abort();
    }, []);

    // Lazily fetch messages whenever the active conversation changes,
    // and cache them so switching back doesn't re-fetch.
    useEffect(() => {
        if (activeConversation == null) return;
        if (messagesByConversation[activeConversation]) return;

        const controller = new AbortController();
        setMessagesLoading(true);
        messagingApi
            .getMessages(activeConversation, controller.signal)
            .then((msgs) => {
                setMessagesByConversation((prev) => ({ ...prev, [activeConversation]: msgs }));
            })
            .catch((err) => {
                if (err?.name !== "AbortError") {
                    console.error("Failed to load messages", err);
                }
            })
            .finally(() => setMessagesLoading(false));
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeConversation]);

    const sendMessage = useCallback(async (conversationId: number, text: string) => {
        const created = await messagingApi.sendMessage(conversationId, text);
        setMessagesByConversation((prev) => ({
            ...prev,
            [conversationId]: [...(prev[conversationId] || []), created],
        }));
    }, []);

    // ---- UI state ----
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications] = useState(0);

    // ---- Current user ----
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [currentUserLoading, setCurrentUserLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        setCurrentUserLoading(true);
        userApi
            .getCurrentUser(controller.signal)
            .then(setCurrentUser)
            .catch(() => setCurrentUser(null))
            .finally(() => setCurrentUserLoading(false));
        return () => controller.abort();
    }, []);

    const value: AppContextValue = {
        groups,
        groupsLoading,
        groupsError,
        refreshGroups: fetchGroups,
        addGroup,
        addGroupLoading,
        addGroupError,

        totalBirds,
        stats,
        statsLoading,

        conversations,
        technicians,
        conversationsLoading,
        conversationsError,
        activeConversation,
        setActiveConversation,
        messagesByConversation,
        messagesLoading,
        sendMessage,

        searchQuery,
        setSearchQuery,
        notifications,

        currentUser,
        currentUserLoading,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within an AppProvider");
    return ctx;
};
