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
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-white text-stone-900 my-12 rounded-lg border border-stone-200 shadow-sm max-w-xl mx-auto font-sans">
          <div className="w-12 h-12 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-xl mb-4">
            <FaExclamationTriangle />
          </div>
          <h2 className="text-xl font-bold font-serif text-stone-900 mb-2">
            Something went wrong while rendering this section
          </h2>
          <p className="text-xs text-stone-600 mb-6 max-w-md">
            {this.state.error?.message || 'An unexpected error occurred. Please click below to refresh the page.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B8860B] hover:bg-[#9A7009] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <FaRedo className="text-xs" /> Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
