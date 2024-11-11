//Diagram.js
import { PieChart, Pie, Cell } from 'recharts';
import { COLORS } from '../../utils/utils';

const Diagram = ({ data }) => {

    return (
        <PieChart width={200} height={200}>
            <Pie
            data={data}
            innerRadius={0}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="quote"
            >
                {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    )
}

export default Diagram