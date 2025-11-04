import NotificationBell from "@/components/NotificationBell";
import TestNotificationButtons from "./components/TestNotificationButtons";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <NotificationBell />
      <TestNotificationButtons />
    </div>
  );
}
