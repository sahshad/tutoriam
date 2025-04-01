export function formatDate(date: Date | string | undefined): string {
    if (!date) return "Date not available";
    const d = new Date(date); 
    return d.toLocaleDateString("en-US");
  }