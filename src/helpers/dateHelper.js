
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
export const formatDate=(isoString)=> {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


export function formatedDate(createdAt) {
  const date = new Date(createdAt);

  if (isToday(date)) {
    return "Today";
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }

  const diff = formatDistanceToNow(date, { addSuffix: true });
  
  // If it's older than 1 week, show exact date
  if (diff.includes("week") || diff.includes("month") || diff.includes("year")) {
    return format(date, "MMM dd, yyyy"); // e.g., "Aug 17, 2025"
  }

  return diff; // e.g., "5 days ago"
}