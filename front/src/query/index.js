import {useMutation, useQuery} from "react-query";
import { useCallback } from "react";

import { queries } from "./queries";

export const useGetReservationInformation = () => {
    const { mutate, error, data, isLoading } = useMutation(
        queries.reservations.useReservationInformation
    );

    const mutationReservationInformation = useCallback((reservationId) => {
        mutate(reservationId);
    }, []);

    return { mutationReservationInformation, error, reservationInformationData: data, isLoadingReservationInformation: isLoading };
};

export const useGetReservations = () => {
    const { error, data, isLoading } = useQuery(
        "getReservations",
        queries.reservations.useReservation
    );

    return { error, reservationData: data, isLoadingReservation: isLoading };
};

export const useGetStats = () => {
    const sexeData = useQuery(
        "getSexe",
        queries.stats.useSexe
    );
    const ageData = useQuery(
        "getAge",
        queries.stats.useAge
    );
    const vrData = useQuery(
        "getVr",
        queries.stats.useVr
    );
    const slotsData = useQuery(
        "getSlots",
        queries.stats.useSlots
    );
    const reservationsGameData = useQuery(
        "getReservationsGame",
        queries.stats.useReservationsGame
    );
    const classementThemes = useQuery(
        "classementThemes",
        queries.stats.classementThemes
    );


    return { sexeData, ageData, vrData, slotsData, reservationsGameData, classementThemes };
};