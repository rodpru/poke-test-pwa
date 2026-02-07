'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className="rounded-full bg-red-100 p-4 mb-6 inline-flex">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Algo deu errado
            </h2>
            
            <p className="text-gray-500 mb-6">
              Ocorreu um erro inesperado ao carregar esta página. 
              Tente recarregar ou voltar para a página inicial.
            </p>

            {this.state.error && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left overflow-auto">
                <p className="text-sm font-mono text-red-600 break-all">
                  {this.state.error.message}
                </p>
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <pre className="mt-2 text-xs text-gray-500 overflow-auto max-h-32">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={this.handleReset}
                variant="outline"
                className="flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tentar novamente
              </Button>
              
              <Button 
                onClick={this.handleReload}
                className="flex items-center justify-center bg-red-500 hover:bg-red-600"
              >
                Recarregar página
              </Button>
            </div>

            <div className="mt-6">
              <a 
                href="/"
                className="text-red-500 hover:text-red-600 text-sm underline"
              >
                Voltar para a página inicial
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
