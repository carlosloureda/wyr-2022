import React from "react";

function ErrorFallback({ error }) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    if (error) {
      return this.props.FallbackComponent ? (
        <this.props.FallbackComponent error={error} />
      ) : (
        <ErrorFallback error={error} />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
