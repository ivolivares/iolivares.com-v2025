import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a number to Roman numerals
 * @param num - The number to convert (1-3999)
 * @returns The Roman numeral representation
 */
export function toRomanNumerals(num: number): string {
  if (num < 1 || num > 3999) {
    return num.toString()
  }

  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ]

  let result = ""
  let remaining = num

  for (const [value, numeral] of romanNumerals) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }

  return result
}

/**
 * Gets the year from a date string or Date object and converts it to Roman numerals
 * @param date - The date string or Date object
 * @returns The year in Roman numerals
 */
export function getYearInRomanNumerals(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const year = dateObj.getFullYear()
  return toRomanNumerals(year)
}
