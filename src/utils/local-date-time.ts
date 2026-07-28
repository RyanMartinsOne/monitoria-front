export function toLocalDateTime(date: Date, hours: string): string {
    const [hour, minute] = hours.split(":").map(Number);

    const localDate = new Date(date);
    localDate.setHours(hour, minute, 0, 0);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    const formattedHours = String(localDate.getHours()).padStart(2, "0");
    const formattedMinutes = String(localDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}:00`;
}