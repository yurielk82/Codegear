"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * useLocalStorage - LocalStorage와 동기화되는 상태 관리 훅
 * 
 * @param key - LocalStorage 키
 * @param initialValue - 초기값
 * @returns [storedValue, setValue, removeValue] - 저장된 값, 설정 함수, 삭제 함수
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // 초기값을 가져오는 함수
  const readValue = useCallback((): T => {
    // SSR 환경에서는 초기값 반환
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // 상태 초기화
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // 클라이언트에서 LocalStorage 값으로 초기화
  useEffect(() => {
    setStoredValue(readValue());
    setIsInitialized(true);
  }, [readValue]);

  // 값 설정 함수
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // 함수형 업데이트 지원
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        
        // 상태 업데이트
        setStoredValue(valueToStore);
        
        // LocalStorage에 저장
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          
          // 다른 탭/창에 변경 알림
          window.dispatchEvent(
            new StorageEvent("storage", {
              key,
              newValue: JSON.stringify(valueToStore),
            })
          );
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // 값 삭제 함수
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [initialValue, key]);

  // 다른 탭에서의 변경 감지
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue) as T);
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [isInitialized ? storedValue : initialValue, setValue, removeValue];
}

/**
 * useTableState - 테이블 컬럼 상태 관리 전용 훅
 * 컬럼 순서와 너비를 LocalStorage에 저장
 */
export interface TableColumnState {
  order: string[];
  widths: Record<string, number>;
}

export function useTableState(
  tableId: string,
  defaultColumns: { id: string; width: number }[]
) {
  const defaultState: TableColumnState = {
    order: defaultColumns.map((col) => col.id),
    widths: defaultColumns.reduce(
      (acc, col) => ({ ...acc, [col.id]: col.width }),
      {} as Record<string, number>
    ),
  };

  const [tableState, setTableState, resetTableState] =
    useLocalStorage<TableColumnState>(`table-state-${tableId}`, defaultState);

  // 컬럼 순서 업데이트
  const updateColumnOrder = useCallback(
    (newOrder: string[]) => {
      setTableState((prev) => ({ ...prev, order: newOrder }));
    },
    [setTableState]
  );

  // 컬럼 너비 업데이트
  const updateColumnWidth = useCallback(
    (columnId: string, width: number) => {
      setTableState((prev) => ({
        ...prev,
        widths: { ...prev.widths, [columnId]: width },
      }));
    },
    [setTableState]
  );

  // 초기 상태로 리셋
  const resetToDefault = useCallback(() => {
    resetTableState();
  }, [resetTableState]);

  return {
    columnOrder: tableState.order,
    columnWidths: tableState.widths,
    updateColumnOrder,
    updateColumnWidth,
    resetToDefault,
  };
}

export default useLocalStorage;
