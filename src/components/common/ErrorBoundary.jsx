import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-stone-950 text-stone-100 my-12 rounded-3xl border border-stone-800 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-3xl mb-4 border border-red-500/40">
            <FaExclamationTriangle />
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-100 mb-2">Something went wrong</h2>
          <p className="text-xs text-stone-400 mb-6 max-w-md">
            {this.state.error?.message || "An unexpected error occurred while loading this section."}
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A227] text-stone-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <FaRedo /> Reset & Reload Website
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
