export class DateUtils {
    static addHoursToCurrentDate(hours : number) {
        const currentDate = new Date();

        currentDate.setHours(currentDate.getHours() + hours);

        return currentDate;
    }
}