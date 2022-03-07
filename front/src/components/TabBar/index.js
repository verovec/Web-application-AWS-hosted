import {RESERVATION_SCREEN, STATS_SCREEN} from "../../App";

export const TabBar = ({ updateScreen, selectedScreen }) => (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: '100vh', height: '100%', width: '100%', borderRight: '1px solid grey', alignItems: 'center', justifyContent: 'center', backgroundColor: "#15202B" }}>
        <div onClick={() => updateScreen(RESERVATION_SCREEN)} style={{ margin: 16, height: 56, width: 200, backgroundColor: 'rgb(29, 161, 242)', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedScreen === RESERVATION_SCREEN ? 'white' : 'grey' }}>
            Réservation
        </div>
        <div onClick={() => updateScreen(STATS_SCREEN)} style={{ margin: 16, height: 56, width: 200, backgroundColor: 'rgb(29, 161, 242)', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedScreen === STATS_SCREEN ? 'white' : 'grey'  }}>
            Statistiques
        </div>
    </div>
)