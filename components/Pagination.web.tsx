import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Next } from "../assets/images/svgs/Next";
import { Previous } from "../assets/images/svgs/Previous";

type PaginationMeta = {
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

interface PaginationProps {
  meta: PaginationMeta | null;
  onPageChange: (url: string | null) => void;
  apiUrl: string;
}

export default function Pagination({
  meta,
  onPageChange,
  apiUrl,
}: PaginationProps) {
  if (!meta) return null;

  const { current_page, last_page, next_page_url, prev_page_url } = meta;
  const paginationItems = [];

  // Previous button
  paginationItems.push({
    type: "prev",
    label: (
      <View className="flex-row items-center gap-2">
        <Previous />
        <Text className="text-sm text-gray-500">Prev</Text>
      </View>
    ),
    url: prev_page_url,
    disabled: !prev_page_url,
  });

  // Always show first page
  paginationItems.push({
    type: "page",
    label: "1",
    page: 1,
    url: `${apiUrl}?page=1`,
    active: current_page === 1,
  });

  // Show left ellipsis if needed
  if (current_page > 2) {
    paginationItems.push({ type: "ellipsis" });
  }

  // Show current page if not first or last
  if (current_page !== 1 && current_page !== last_page) {
    paginationItems.push({
      type: "page",
      label: String(current_page),
      page: current_page,
      url: `${apiUrl}?page=${current_page}`,
      active: true,
    });
  }

  // Show right ellipsis if needed
  if (current_page < last_page - 1) {
    paginationItems.push({ type: "ellipsis" });
  }

  // Always show last page if more than one
  if (last_page > 1) {
    paginationItems.push({
      type: "page",
      label: String(last_page),
      page: last_page,
      url: `${apiUrl}?page=${last_page}`,
      active: current_page === last_page,
    });
  }

  // Next button
  paginationItems.push({
    type: "next",
    label: (
      <View className="flex-row items-center gap-2">
        <Next />
        <Text className="text-sm text-gray-500">Next</Text>
      </View>
    ),
    url: next_page_url,
    disabled: !next_page_url,
  });

  return (
    <View className="flex-row justify-center items-center mt-[53px] self-end mr-[44px]">
      {paginationItems.map((item, idx) => {
        if (item.type === "ellipsis") {
          return (
            <View
              key={idx}
              className="h-[36px] min-w-[36px] px-4 mx-1 rounded border border-[#EAECF0] flex items-center justify-center"
            >
              <Text style={{ fontSize: 16, color: "#101828" }}>...</Text>
            </View>
          );
        }

        const isActive = item.active;
        const isDisabled = item.disabled;

        return (
          <TouchableOpacity
            key={idx}
            disabled={isDisabled || isActive}
            onPress={() => onPageChange(item.url ?? null)}
            className={`h-[36px] min-w-[36px] px-4 mx-1 rounded border border-[#EAECF0] flex items-center justify-center bg-white opacity-100 ${
              isActive ? "bg-[#101828] text-white" : "bg-white text-[#101828]"
            } ${isDisabled ? "opacity-50" : "opacity-100"}`}
          >
            <Text
              className={`text-sm ${
                isActive ? "font-bold text-white" : "font-normal text-[#101828]"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
