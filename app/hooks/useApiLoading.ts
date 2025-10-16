"use client";

import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";

export const useApiLoading = (apiCall: () => Promise<any>, dependencies: any[] = []) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const { addLoadingTask, removeLoadingTask } = useLoading();
  const taskId = `api-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        addLoadingTask(taskId);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        removeLoadingTask(taskId);
      }
    };

    fetchData();
  }, dependencies);

  return { data, error, isLoading: useLoading().isTaskLoading(taskId) };
};

export const useAsyncLoading = (asyncFunction: () => Promise<any>, dependencies: any[] = []) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { addLoadingTask, removeLoadingTask } = useLoading();
  const taskId = `async-${Math.random().toString(36).substr(2, 9)}`;

  const execute = async () => {
    try {
      setIsLoading(true);
      addLoadingTask(taskId);
      setError(null);
      const result = await asyncFunction();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
      removeLoadingTask(taskId);
    }
  };

  useEffect(() => {
    if (dependencies.length > 0) {
      execute();
    }
  }, dependencies);

  return { execute, isLoading, error };
};
