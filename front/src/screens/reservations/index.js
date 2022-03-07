import {useEffect, useState} from "react";
// import arrowRight from '../../icons/arrow-right.png';
// import {Tag} from "../../components/Tag";
import {ReservationListCard} from "../../components/ReservationsListCard";
import {ReservationInformations} from "../../components/ReservationInformations";
import {useGetReservationInformation, useGetReservations} from "../../query";

const Reservations = () => {
  const [reservationsListConstant, setReservationsListConstant] = useState(null);
  const [reservationsList, setReservationsList] = useState(null);
  const [reservationIdFocus, setReservationIdFocus] = useState(null);
  const [reservationInformations, setReservationInformation] = useState(null);
  const [search, setSearch] = useState("");

  const { reservationData, isLoadingReservation } = useGetReservations();
  const { mutationReservationInformation, reservationInformationData, isLoadingReservationInformation } = useGetReservationInformation();

  useEffect(() => {
      if (!isLoadingReservationInformation && reservationInformationData) {
          setReservationInformation(reservationInformationData);
      }
  }, [isLoadingReservationInformation, reservationInformationData]);

  useEffect(() => {
      if (!isLoadingReservation && reservationData) {
          setReservationsList(reservationData);
          setReservationsListConstant(reservationData);
      }
  }, [isLoadingReservation, reservationData]);

  useEffect(() => {
      if (reservationIdFocus != null) {
          mutationReservationInformation(reservationIdFocus);
      }
  }, [reservationIdFocus]);

  const onBack = () => {
      setReservationIdFocus(null);
      setReservationInformation(null);
  }

  const onSearch = (newSearch) => {
      if (newSearch.length) {
          setReservationsList(reservationsListConstant.filter((reservation) => reservation.nom.toLowerCase().includes(newSearch.toLowerCase())))
      } else {
          setReservationsList(reservationsListConstant);
      }
    setSearch(newSearch);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', width: '100%', alignItems: 'center' }}>
      <div style={{ margin: 64, color: 'white', fontSize: 22 }}>
          {!reservationInformations ? "Liste des réservations" : "Information de réservation"}
      </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: reservationInformations ? 0 : 120, width: '100%', alignItems: 'center' }}>
            {
                !reservationInformations && reservationsList && (
                    <input
                        placeholder="Rechercher..."
                        type="text"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        style={{ width: 248, outline: "none", backgroundColor: "#15202B", borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, color: 'white', borderBottom: '1px solid rgb(29, 161, 242)' }}
                    />
                )
            }
            {
                !reservationInformations && reservationsList && reservationsList.map((reservation) => (
                    <ReservationListCard
                        reservation={reservation}
                        onPress={(reservation) => setReservationIdFocus(reservation.idReservation)}
                    />
                ))
            }
            {
                reservationInformations && (
                    <ReservationInformations
                        reservationInformations={reservationInformations}
                        onBack={onBack}
                    />
                )
            }
        </div>
    </div>
  );
}

export default Reservations;