'use client';

import React from 'react';
import { Input } from 'antd';
import {
  SearchOutlined,
  PlaySquareOutlined,
  RocketOutlined,
  PhoneOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

interface FilterBarProps {
  search: string;
  category: string;
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
}

export function FilterBar({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: FilterBarProps) {
  const categories = [
    { value: '', label: 'Semua Kategori', icon: <AppstoreOutlined /> },
    { value: 'game', label: 'Game', icon: <RocketOutlined /> },
    { value: 'streaming', label: 'Streaming', icon: <PlaySquareOutlined /> },
    { value: 'phone_credit', label: 'Pulsa & Data', icon: <PhoneOutlined /> },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 border dark:border-slate-800 p-4 rounded-2xl mb-8 shadow-sm transition-all duration-300">
      <div className="w-full md:max-w-xs relative">
        <Input
          size="large"
          placeholder="Cari voucher..."
          prefix={<SearchOutlined className="text-slate-400" />}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          allowClear
          className="rounded-xl"
        />
      </div>

      <div className="w-full md:w-auto overflow-x-auto flex gap-2 pb-1 md:pb-0 no-scrollbar">
        {categories.map((cat) => {
          const isActive = category === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap border cursor-pointer transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-white border-primary dark:bg-primary-dark dark:text-slate-950 dark:border-primary-dark shadow-md'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
