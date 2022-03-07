import './App.css';
import {useState} from "react";
import Reservations from "./screens/reservations";
import Stats from "./screens/stats";
import {TabBar} from "./components/TabBar";
import {QueryClient, QueryClientProvider} from "react-query";

export const RESERVATION_SCREEN = "RESERVATION_SCREEN";
export const STATS_SCREEN = "STATS_SCREEN";

const queryClient = new QueryClient();

function App() {
  const [render, setRender] = useState(RESERVATION_SCREEN);
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <div style={{ display: 'flex', flex: 1, minHeight: '100vh', height: '100%', backgroundColor: "#15202B" }}>
                <TabBar selectedScreen={render} updateScreen={setRender} />
                <div style={{ display: 'flex', flex: 3, height: '100%', width: '100%' }}>
                    {
                        render === RESERVATION_SCREEN && (
                            <Reservations />
                        )
                    }
                    {
                        render === STATS_SCREEN && (
                            <Stats />
                        )
                    }
                </div>
            </div>
        </QueryClientProvider>
    </div>
  );
}

export default App;
