import {useGetStats} from "../../query";
import { Pie, Bar } from "react-chartjs-2";

const Stats = () => {
    const { sexeData = {}, ageData = {}, vrData = {}, slotsData = {}, reservationsGameData = {}, classementThemes = {} } = useGetStats();

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'center'}}>
            <div style={{ width: '500px', marginRight: '15px', marginBottom: '15px' }}>
                <Pie data={{
                    labels: ['Women', 'Men'],
                    datasets: [
                        {
                            data: [sexeData?.data?.women, sexeData?.data?.men],
                            backgroundColor: ['blue', 'red']
                        },
                    ]}
                } />
            </div>
            <div style={{ width: '500px', marginRight: '15px', marginBottom: '15px' }}>
                <Pie data={{
                    labels: ['moins de 18', '18-25', '25-39', '40-54', 'plus de 55'],
                    datasets: [
                        {
                            data: [ageData?.data?.['moins de 18'], ageData?.data?.['18-25'], ageData?.data?.['25-39'], ageData?.data?.['40-54'] ,ageData?.data?.['plus de 55']],
                            backgroundColor: ['blue', 'red', 'green', 'purple', 'yellow']
                        },
                    ]}
                } />
            </div>
            <div style={{ width: '500px', marginRight: '15px', marginBottom: '15px' }}>
                <Pie data={{
                    labels: slotsData?.data?.map(item => 'horaire: ' + item?.horaire) || [],
                    datasets: [
                        {
                            data: slotsData?.data?.map(item => item?.nb_reservation) || [],
                            backgroundColor: ['blue', 'red', 'green', 'purple', 'yellow', 'black', 'white', 'grey']
                        }
                    ]}
                }/>
            </div>
            <div style={{ width: '500px', marginRight: '15px', marginBottom: '15px' }}>
                <Pie data={{
                    labels: reservationsGameData?.data?.map(item => 'game nom: ' + item?.nom) || [],
                    datasets: [
                        {
                            data: reservationsGameData?.data?.map(item => item?.nb_reservation) || [],
                            backgroundColor: ['blue', 'red', 'green', 'purple', 'yellow', 'black', 'white', 'grey']
                        },
                    ]}
                } />
            </div>
            <div style={{ width: '500px', marginRight: '15px', marginBottom: '15px' }}>
                <Pie data={{
                    labels: ['Vr', 'Non Vr'],
                    datasets: [
                        {
                            data: [vrData?.data?.total_vr, vrData?.data?.total_not_vr],
                            backgroundColor: ['blue', 'red']
                        },
                    ]}
                } />
            </div>
            <div style={{ width: '500px', marginRight: '15px', marginBottom: '15px' }}>
                <Bar data={{
                    labels: classementThemes?.data?.map((item) => 'theme: ' + item?.theme),
                    datasets: [
                        {
                            label: 'Classement theme',
                            data: classementThemes?.data?.map((item) => item?.points),
                            backgroundColor: ['blue', 'red']
                        },
                    ]}
                } />
            </div>
        </div>
    );
}

export default Stats;