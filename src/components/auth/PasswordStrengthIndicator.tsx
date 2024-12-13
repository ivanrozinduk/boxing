import React from 'react';
import { Check } from 'lucide-react';

interface Requirement {
  label: string;
  regex: RegExp;
}

const requirements: Requirement[] = [
  { label: 'At least 8 characters', regex: /.{8,}/ },
  { label: 'Contains uppercase letter', regex: /[A-Z]/ },
  { label: 'Contains lowercase letter', regex: /[a-z]/ },
  { label: 'Contains number', regex: /[0-9]/ },
  { label: 'Contains special character', regex: /[^A-Za-z0-9]/ },
];

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  return (
    <div className="mt-2 space-y-2">
      {requirements.map((req, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 text-sm"
        >
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
            req.regex.test(password)
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-400'
          }`}>
            <Check className="w-3 h-3" />
          </div>
          <span className={req.regex.test(password) ? 'text-green-600' : 'text-gray-500'}>
            {req.label}
          </span>
        </div>
      ))}
    </div>
  );
}