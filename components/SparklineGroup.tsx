import React from 'react';

const sparklineData = [
    { value: 1.07, color: 'green' },
    { value: 1.30, color: 'green' },
    { value: 0.36, color: 'green' },
    { value: 0.29, color: 'green' },
    { value: 0.26, color: 'green' },
    { value: -0.05, color: 'red' },
];

const Sparkline = ({ value, color }: { value: number, color: string }) => {
    const barWidth = `${Math.abs(value) * 50}%`; // Adjust multiplier for desired width

    return (
        <div className="sparkline">
            <span className="value">{value.toFixed(2)}%</span>
            <div className="bar-container">
                <div
                    className={`bar ${color}`}
                    style={{ width: barWidth }}
                ></div>
            </div>
        </div>
    );
};

const SparklineGroup = () => {
    return (
        <div className="sparkline-group">
            {sparklineData.map((data, index) => (
                <Sparkline key={index} value={data.value} color={data.color} />
            ))}
        </div>
    );
};

export default SparklineGroup;