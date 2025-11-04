// utils/notificationService.js
export async function sendNotification(notificationData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/antenna/notifications/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      },
    );

    if (!response.ok) {
      console.log(response.status);
      console.log(response.statusText);
      throw new Error("Failed to send notification");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}

// Example usage:
// await sendNotification({
//   userId: 'user-123',
//   title: 'New Message',
//   message: 'You have a new message from John',
//   type: 'info'
// });
