import {IParticipant} from "../interfaces/interfaces";
import {Table} from "antd";
import DataTransformService from "../services/DataTransformService";

const RaceTable = (props: { participants: IParticipant[] }) => {
    const dataTransformService = new DataTransformService();
    const columns = [
        {
            title: 'Место',
            dataIndex: 'place',
            key: 'place',
        },
        {
            title: 'Место (пол)',
            dataIndex: 'gPlace',
            key: 'gPlace',
        },
        {
            title: 'Место (возрастная группа)',
            dataIndex: 'ageGroup',
            key: 'ageGroup',
        },
        {
            title: 'ФИО',
            dataIndex: 'nameForTable',
            key: 'nameForTable',
        },
        {
            title: 'ChipTime',
            dataIndex: 'chipTime',
            key: 'chipTime',
        },
        {
            title: 'GunTime',
            dataIndex: 'gunTime',
            key: 'gunTime',
        },
        {
            title: 'Средняя скорость',
            dataIndex: 'pace',
            key: 'pace',
        },
    ];

    return (<div>
        <Table pagination={false} dataSource={props.participants.sort((a, b) => Number(a.place) > Number(b.place))}
               columns={columns} className="hidden md:w-[800px] md:block lg:w-[1200px] lg:block lg:p-0 ml-auto mr-auto"/>
    </div>)
}

export default RaceTable