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

export interface Group {
    id: string;
    batchName: string;
    ageDays: number;
    count: number;
    mortality: number;
    status: GroupStatus;
    house: string;
    section: string;
    breed: string;
    hatchDate: string;
    active: number;
    mortalityTotal: number;
    feedIntake: number;
    waterIntake: number;
    lastVaccination: string;
    nextVaccination: string;
    activeSymptoms: string;
    healthAlert: string;
    dailyLogs: DailyLog[];
    vaccinations: Vaccination[];
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

export interface Message {
    id: number;
    sender: string;
    time: string;
    avatar?: string;
    text?: string;
    image?: string;
    isMe: boolean;
    type: "text" | "image" | "automated";
    title?: string;
    subtitle?: string;
    actionLabel?: string;
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
