import leftArrrow from '../../icons/arrow-left.png';
import {Tag} from "../Tag";

export const ReservationInformations = ({ reservationInformations, onBack }) => (
    <div style={{ margin: 48, padding: 16, width: '80%', borderRadius: 16, backgroundColor: "rgb(25, 39, 52)", position: 'relative' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
            <img src={leftArrrow} alt="Left arrow" style={{ height: 24, width: 24 }} onClick={onBack} />
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, display: 'flex' }}>
            {
                reservationInformations?.themes.map((theme) => (
                    <div style={{ marginTop: 16, marginRight: 16 }}>
                        <Tag title={theme.name} />
                    </div>
                ))
            }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', fontSize: 16 }}>
            <div style={{ marginTop: 16, backgroundColor: "#15202B", borderRadius: 16, padding: 16 }}>
                <div style={{ color: 'white' }}>
                    Nom : {reservationInformations.game.nom}
                </div>
                <div style={{ color: 'white' }}>
                    VR : {reservationInformations.game.vr ? "OUI" : "NON"}
                </div>
                <div style={{ color: 'white' }}>
                    Date : {reservationInformations.game.date.substr(0, 10)}
                </div>
                <div style={{ color: 'white' }}>
                    Horaire : {reservationInformations.game.horaire}
                </div>
            </div>
        </div>
        <div style={{ marginTop: 80, display: 'flex', minHeight: 200, flexDirection: 'row', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: 16, marginBottom: 32 }}>
                    Acheteur
                </div>
                <div style={{ margin: 16, backgroundColor: "#15202B", borderRadius: 16, padding: 16 }}>
                    <div style={{ color: 'white' }}>
                        Civilité : {reservationInformations.acheteur.civilite}
                    </div>
                    <div style={{ color: 'white' }}>
                        Nom : {reservationInformations.acheteur.nom}
                    </div>
                    <div style={{ color: 'white' }}>
                        Prénom : {reservationInformations.acheteur.prenom}
                    </div>
                    <div style={{ color: 'white' }}>
                        Age : {reservationInformations.acheteur.age}
                    </div>
                    <div style={{ color: 'white' }}>
                        Email : {reservationInformations.acheteur.email}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: 16, marginBottom: 32, textAlign: 'center' }}>
                    Spectateurs ({reservationInformations?.spectateurs.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {
                        reservationInformations?.spectateurs.map((spectator) => (
                            <div style={{ margin: 16, backgroundColor: "#15202B", borderRadius: 16, padding: 16 }}>
                                <div style={{ color: 'white' }}>
                                    Civilité : {spectator.civilite}
                                </div>
                                <div style={{ color: 'white' }}>
                                    Nom : {spectator.nom}
                                </div>
                                <div style={{ color: 'white' }}>
                                    Prénom : {spectator.prenom}
                                </div>
                                <div style={{ color: 'white' }}>
                                    Age : {spectator.age}
                                </div>
                                <div style={{ color: 'white' }}>
                                    Prix : {spectator.prix} €
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
)
