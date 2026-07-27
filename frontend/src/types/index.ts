// Domain types shared across the app. These mirror the shapes returned
// by the API (see src/api/*) so components can stay strongly typed
// even though the data is now fetched dynamically instead of hardcoded.

export type GroupStatus = "Healthy" | "Alert" | "Warning" | string;

export interface DailyLog {
    day: string;
    avgWeight: string;
    mortality: number;
    feed: number;
    water: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    litQuality: string;
}

export interface Vaccination {
    day: string;
    date: string;
    treatment: string;
    status: string;
}

export interface GrowthPoint {
    day: number;
    actual: number | null;
    target: number | null;
}

export type PounderRace = "Ross 308" | "Cobb 500";
type BatchStatus = "Progress" | "Waiting" | "Finished";

export interface IGroup {
    id: number;
    name: string;
    start_date: string;
    race: PounderRace;
    count: number;
    homortality_totaluse: string;
    status: BatchStatus;
    age_days: number;
    mortality: number;
    active: number;
    daily_logs: DailyLog[];
}


export interface NewGroupInput {
    batchName: string;
    breed: string;
    count: number;
    hatchDate: string;
}

export interface Conversation {
    id: number;
    type: "group";
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
    icon: string;
    iconBg: string;
    isAlert: boolean;
    isLive: boolean;
    activeTechnicians?: number;
    participants: number;
}

export interface Technician {
    id: number;
    type: "direct";
    name: string;
    lastMessage: string;
    time: string;
    online: boolean;
    avatar: string;
}

export type ConversationTarget = Conversation | Technician;

export interface IMessage {
    id: number;
    role: string;
    content: string;
    created_at: string;
    conversation_id: string;
}

export interface CurrentUser {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

export interface DashboardStats {
    avgWeight: number;
    feedConversionRatio: number;
}
