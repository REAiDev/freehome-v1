/**
 * Contact Form Hook
 * Responsibility: Provide React hook interface for contact form submission
 * Follows: SRP - Single purpose of managing contact form state and submission
 */

'use client';

import { useState } from 'react';
import type { CreateContactMessageDTO, ValidationError } from '@/types/contact';

/**
 * Form field state
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Form submission state
 */
export interface ContactFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: ValidationError[];
  errorMessage?: string;
}

/**
 * Hook return type
 */
export interface UseContactFormReturn {
  formData: ContactFormData;
  formState: ContactFormState;
  setFormData: (data: ContactFormData) => void;
  updateField: (field: keyof ContactFormData, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

/**
 * Initial form data
 */
const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

/**
 * Initial form state
 */
const INITIAL_FORM_STATE: ContactFormState = {
  isSubmitting: false,
  isSuccess: false,
  errors: [],
  errorMessage: undefined,
};

/**
 * React hook for contact form management
 * Handles form state, validation, and submission
 */
export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_FORM_STATE);

  /**
   * Update a single form field
   */
  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors when user starts typing
    if (formState.errors.length > 0 || formState.errorMessage) {
      setFormState((prev) => ({
        ...prev,
        errors: [],
        errorMessage: undefined,
      }));
    }
  };

  /**
   * Submit the contact form
   */
  const submitForm = async () => {
    // Reset state
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      errors: [],
      errorMessage: undefined,
    });

    try {
      // Prepare submission data
      const dto: CreateContactMessageDTO = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        // userId and ipAddress will be set by the API route
      };

      // Call API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (result.error?.type === 'ValidationError') {
          setFormState({
            isSubmitting: false,
            isSuccess: false,
            errors: result.error.errors || [],
            errorMessage: 'Please correct the errors below',
          });
          return;
        }

        // Handle other errors
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          errors: [],
          errorMessage: result.error?.message || 'Failed to submit message. Please try again.',
        });
        return;
      }

      // Success!
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        errors: [],
        errorMessage: undefined,
      });

      // Clear form data on success
      setFormData(INITIAL_FORM_DATA);
    } catch {
      // Network or unexpected error
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        errors: [],
        errorMessage: 'Network error. Please check your connection and try again.',
      });
    }
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setFormState(INITIAL_FORM_STATE);
  };

  return {
    formData,
    formState,
    setFormData,
    updateField,
    submitForm,
    resetForm,
  };
}
