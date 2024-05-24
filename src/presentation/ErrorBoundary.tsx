import { Component, PropsWithChildren } from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: unknown, _errorInfo: unknown) {
    // reportCriticalAppError({
    //   error,
    //   errorInfo,
    // });
  }

  render() {
    if (this.state.hasError) {
      return <div>App Error</div>;
    }

    return this.props.children;
  }
}
