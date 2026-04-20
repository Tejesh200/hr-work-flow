import React from 'react';
import { FieldSchema, AnyNodeData } from '../../types/node.types';

interface DynamicFormProps {
  schema: FieldSchema[];
  data: Partial<AnyNodeData>;
  onChange: (key: string, value: any) => void;
}

export function DynamicForm({ schema, data, onChange }: DynamicFormProps) {
  // A simple debounced generic handler could be here. For simplicity in the prototype,
  // we trigger onChange natively. In production, use react-hook-form here.

  return (
    <div className="flex flex-col gap-4">
      {schema.map((field) => {
        const value = (data as any)[field.name] ?? '';

        return (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === 'string' && (
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            )}

            {field.type === 'number' && (
              <input
                type="number"
                value={value}
                onChange={(e) => onChange(field.name, Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                rows={3}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
                placeholder="..."
              />
            )}

            {field.type === 'boolean' && (
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={(e) => onChange(field.name, e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                Enabled
              </label>
            )}

            {field.type === 'enum' && field.options && (
              <select
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="" disabled>Select an option...</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}
          </div>
        );
      })}
    </div>
  );
}
