import { format } from "date-fns";

export const getFormattedDate = (date) => {
  return format(date, "yyyy-MM-dd")
}

export const parseDate = (dateString) => {
  return new Date(dateString + "T12:00:00");
}