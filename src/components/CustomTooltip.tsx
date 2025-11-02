import {TooltipContentProps} from "recharts";


const CustomTooltip = ({ active, payload, label }: TooltipContentProps<string | number, string>) => {
    const tickFormatter =  (value: number) => {
        let newVal = `${Math.floor(value / 60)}:${('0' + (value % 60)).slice(-2)} мин/км`

        return newVal;
    }

    const formatter = (value: number, name) => {
        return [tickFormatter(value), name];
    }

    const isVisible = active && payload && payload.length;
    return (
        <div className="custom-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            {isVisible && (
                <>
                    <p className="label">{`${payload[0].name} : ${ tickFormatter(payload[0].value)} : ${ payload[0].unit}`}</p>
                </>
            )}
        </div>
    );
};

export default CustomTooltip;