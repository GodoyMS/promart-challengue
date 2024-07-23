import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const validateDate = (date: string | undefined) => {
  const today = new Date();
  if(!date) return
  const selectedDate = new Date(date);

  // Check if the selected date is in the future
  if (selectedDate > today) {
    return false
  }

  // Calculate age
  let age = today.getFullYear() - selectedDate.getFullYear();
  const monthDifference = today.getMonth() - selectedDate.getMonth();
  const dayDifference = today.getDate() - selectedDate.getDate();
  
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  // Check if age is less than 18
  if (age < 18) {
    return false
  }

  return true; 
};