import { useApp } from "../context/AppContext";
import ConversationList from "../components/messages/ConversationList";
import ChatWindow from "../components/messages/ChatWindow";
import Spinner from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";

export default function Messages() {
  const { conversationsLoading, conversationsError } = useApp();

  if (conversationsLoading) return <Spinner label="Chargement des discussions..." />;
  if (conversationsError) return <ErrorState message={conversationsError} />;

  return (
    <div className="flex h-[calc(100vh-3rem)] -m-6 bg-white rounded-none border border-gray-200 overflow-hidden">
      <ConversationList />
      <ChatWindow />
    </div>
  );
}
