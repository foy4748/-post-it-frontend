import { Suspense } from "react";
import LoginPageView from "./components/LoginPageView";

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginPageView />
    </Suspense>
  );
}
