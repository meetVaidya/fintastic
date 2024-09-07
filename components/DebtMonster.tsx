import React from 'react';

type DebtMonsterProps = {
    name: string;
    description: string;
    // ... other properties like health, attack power, etc. 
};

const DebtMonster: React.FC<DebtMonsterProps> = ({ name, description }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            {/* Add more monster-specific content and styling */}
        </div>
    );
};

export default DebtMonster;