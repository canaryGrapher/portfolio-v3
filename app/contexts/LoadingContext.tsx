"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addLoadingTask: (taskId: string) => void;
  removeLoadingTask: (taskId: string) => void;
  isTaskLoading: (taskId: string) => boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loadingTasks, setLoadingTasks] = useState<Set<string>>(new Set());

  const setLoading = useCallback((loading: boolean) => {
    if (loading) {
      setLoadingTasks(new Set(['global']));
    } else {
      setLoadingTasks(new Set());
    }
  }, []);

  const addLoadingTask = useCallback((taskId: string) => {
    setLoadingTasks(prev => new Set([...prev, taskId]));
    
    // Safety timeout: remove task after 3 seconds maximum
    setTimeout(() => {
      setLoadingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }, 3000);
  }, []);

  const removeLoadingTask = useCallback((taskId: string) => {
    setLoadingTasks(prev => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
  }, []);

  const isTaskLoading = useCallback((taskId: string) => {
    return loadingTasks.has(taskId);
  }, [loadingTasks]);

  const isLoading = loadingTasks.size > 0;

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading,
        addLoadingTask,
        removeLoadingTask,
        isTaskLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
