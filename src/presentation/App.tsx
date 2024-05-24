import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "~/application/store";
import "~/presentation/styles/css/index.css";
import { ErrorBoundary } from "~/presentation/ErrorBoundary";
import { Home } from "~/presentation/pages/Home/Home";
import { NotificationOutlet } from "~/presentation/shared/NotificationOutlet/NotificationOutlet";

export function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div />}>
        <Provider store={store}>
          <Home />
          <NotificationOutlet />
        </Provider>
      </Suspense>
    </ErrorBoundary>
  );
}
