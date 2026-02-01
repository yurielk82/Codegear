"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTableState } from "@/hooks/useLocalStorage";
import { GripVertical, RotateCcw } from "lucide-react";
import type { Notice } from "@/types";

// =============================================================================
// Types
// =============================================================================

interface Column {
  id: string;
  label: string;
  width: number;
  minWidth: number;
}

interface DraggableTableProps {
  tableId: string;
  columns: Column[];
  data: Notice[];
  onRowClick?: (row: Notice) => void;
}

// =============================================================================
// Sortable Header Cell Component
// =============================================================================

interface SortableHeaderCellProps {
  column: Column;
  width: number;
  onResize: (columnId: string, width: number) => void;
}

function SortableHeaderCell({
  column,
  width,
  onResize,
}: SortableHeaderCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${width}px`,
    minWidth: `${column.minWidth}px`,
    opacity: isDragging ? 0.5 : 1,
  };

  // Handle resize
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      startXRef.current = e.clientX;
      startWidthRef.current = width;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startXRef.current;
        const newWidth = Math.max(column.minWidth, startWidthRef.current + delta);
        onResize(column.id, newWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [column.id, column.minWidth, width, onResize]
  );

  return (
    <th
      ref={setNodeRef}
      style={style}
      className={`
        relative px-4 py-3 text-left text-sm font-semibold text-gray-300
        bg-white/[0.03] select-none
        ${isDragging ? "z-50 shadow-lg" : ""}
      `}
    >
      <div className="flex items-center gap-2">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 -ml-1 hover:bg-white/10 rounded transition-colors"
          aria-label={`Drag to reorder ${column.label} column`}
        >
          <GripVertical size={14} className="text-gray-500" />
        </button>
        
        <span>{column.label}</span>
      </div>

      {/* Resize handle */}
      <div
        ref={resizeRef}
        onMouseDown={handleResizeStart}
        className={`
          absolute right-0 top-0 h-full w-1 cursor-col-resize
          hover:bg-blue-500/50 transition-colors
          ${isResizing ? "bg-blue-500" : "bg-transparent"}
        `}
      />
    </th>
  );
}

// =============================================================================
// Table Row Component
// =============================================================================

interface TableRowProps {
  row: Notice;
  columns: Column[];
  columnWidths: Record<string, number>;
  columnOrder: string[];
  onClick?: () => void;
}

function TableRow({
  row,
  columns,
  columnWidths,
  columnOrder,
  onClick,
}: TableRowProps) {
  const orderedColumns = columnOrder
    .map((id) => columns.find((col) => col.id === id))
    .filter(Boolean) as Column[];

  const getCellValue = (columnId: string) => {
    switch (columnId) {
      case "id":
        return row.id;
      case "category":
        return (
          <span
            className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${
                row.category === "채용"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : row.category === "공지"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
              }
            `}
          >
            {row.category}
          </span>
        );
      case "title":
        return row.title;
      case "date":
        return row.date;
      case "views":
        return row.views.toLocaleString();
      default:
        return "";
    }
  };

  return (
    <motion.tr
      className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
    >
      {orderedColumns.map((column) => (
        <td
          key={column.id}
          style={{
            width: `${columnWidths[column.id]}px`,
            minWidth: `${column.minWidth}px`,
          }}
          className="px-4 py-3 text-sm text-gray-400"
        >
          {getCellValue(column.id)}
        </td>
      ))}
    </motion.tr>
  );
}

// =============================================================================
// Main Draggable Table Component
// =============================================================================

export function DraggableTable({
  tableId,
  columns,
  data,
  onRowClick,
}: DraggableTableProps) {
  const {
    columnOrder,
    columnWidths,
    updateColumnOrder,
    updateColumnWidth,
    resetToDefault,
  } = useTableState(
    tableId,
    columns.map((col) => ({ id: col.id, width: col.width }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
        updateColumnOrder(newOrder);
      }
    },
    [columnOrder, updateColumnOrder]
  );

  const orderedColumns = columnOrder
    .map((id) => columns.find((col) => col.id === id))
    .filter(Boolean) as Column[];

  return (
    <div className="w-full">
      {/* Table Header with Reset Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <GripVertical size={16} />
          <span>테이블 레이아웃을 사용자 설정할 수 있습니다 (브라우저에 저장됨)</span>
        </div>
        <button
          onClick={resetToDefault}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <RotateCcw size={14} />
          초기화
        </button>
      </div>

      {/* Glass Container */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="w-full border-collapse">
              <thead>
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <tr className="border-b border-white/10">
                    {orderedColumns.map((column) => (
                      <SortableHeaderCell
                        key={column.id}
                        column={column}
                        width={columnWidths[column.id]}
                        onResize={updateColumnWidth}
                      />
                    ))}
                  </tr>
                </SortableContext>
              </thead>
              <tbody>
                <AnimatePresence>
                  {data.map((row, index) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      columns={columns}
                      columnWidths={columnWidths}
                      columnOrder={columnOrder}
                      onClick={() => onRowClick?.(row)}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </DndContext>
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            등록된 공고가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default DraggableTable;
