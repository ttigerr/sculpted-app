import { Compass } from "src/models/compass/compass";
import { get, post } from "./http-service";

/* get the user's compass info for the selected date range
* params: {fromDate: only show dates including and after this date}
* optional params: {toDate: show dates upto this date}
*/
async function getUserCompass(
    fromDate: string,
    toDate?: string
): Promise<Compass[]> {
    let url = `compass?fromDate=${fromDate}`;

    if(toDate)
        url += `&toDate=${toDate}`;

    const res = await get<Compass[]>(url);
    return Array.isArray(res) ? res : [];
};

async function postCompass(
    data: Compass
): Promise<Compass> {
    const url = 'compass';
    const res = await post<Compass>(url, data);
    return res;
};

export const compassService = {
    getUserCompass,
    postCompass
};