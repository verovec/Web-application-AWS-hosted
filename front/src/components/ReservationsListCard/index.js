import arrowRight from "../../icons/arrow-right.png";
import {Tag} from "../Tag";

export const ReservationListCard = ({ reservation, onPress }) => (
    <div onClick={() => onPress(reservation)} style={{ margin: 24, height: 80, width: 600, borderRadius: 40, backgroundColor: 'rgb(25, 39, 52)', display: 'flex', position: 'relative', color: 'white' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 32 }}>
            <div>
                Nom : {reservation.nom}
            </div>
            <div>
                Prénom : {reservation.prenom}
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 32 }}>
            <div>
                Date : {reservation.date.substr(0, 10)}
            </div>
            <div>
                Horaire : {reservation.horaire}
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 32 }}>
            <div>
                Prix : {reservation.prix} €
            </div>
            <div>
                Spectateurs : {reservation.nb_spectateur}
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 16 }}>
            <img alt="right arrow" src={arrowRight} style={{ height: 20, width: 20 }} />
        </div>
        <div style={{ position: 'absolute', top: 8, right: 48 }}>
            {
                Boolean(reservation.VR === 1) && (
                    <Tag title="VR" />
                )
            }
        </div>
    </div>
)