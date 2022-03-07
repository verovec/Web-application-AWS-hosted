import {API_URL, apiRequest} from "./utils";

export const queries = {
    reservations: {
        useReservation: async () =>
            await apiRequest({ url: API_URL + '/reservation', method: "GET" }),
        useReservationInformation: async (id) =>
            await apiRequest({ url: API_URL + '/reservation/' + id, method: "GET" }),
    },
    stats: {
        useSexe: async () =>
            await apiRequest({ url: API_URL + '/sexe', method: "GET" }),
        useAge: async () =>
            await apiRequest({ url: API_URL + '/age', method: "GET" }),
        useVr: async () =>
            await apiRequest({ url: API_URL + '/vr', method: "GET" }),
        useSlots: async () =>
            await apiRequest({ url: API_URL + '/slots', method: "GET" }),
        useReservationsGame: async () =>
            await apiRequest({ url: API_URL + '/reservationsGame', method: "GET" }),
        classementThemes: async () =>
            await apiRequest({ url: API_URL + '/classementThemes', method: "GET" }),
    }
};