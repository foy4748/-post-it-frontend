"use client";

import { sendNotification } from "@/utilities/notificationServer";

function TestNotificationButtons() {
  const handleClick = async () => {
    await sendNotification({ title: "Test", userId: "test" });
  };
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default TestNotificationButtons;
