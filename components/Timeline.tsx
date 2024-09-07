import React from 'react';

type TimelineEventProps = {
    title: string;
    description: string;
    completed?: boolean;
};

const TimelineEvent: React.FC<TimelineEventProps> = ({ title, description, completed }) => {
    return (
        <div className="relative pb-8">
            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div className="relative flex items-start">
                <div>
                    {completed ? (
                        <span className="bg-green-500 rounded-full h-4 w-4 flex items-center justify-center">
                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    ) : (
                        <span className="bg-gray-400 rounded-full h-4 w-4"></span>
                    )}
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
};

const Timeline: React.FC = () => {
    const events = [
        { title: "Debt Awakens", description: "You find yourself burdened by a mysterious debt...", completed: true },
        { title: "Enter the Dungeon", description: "Your journey into the Dungeon of Debt begins!", completed: true },
        { title: "Credit Card Goblin", description: "Defeat the Credit Card Goblin!", completed: false },
        // ... more events
    ];

    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {events.map((event, index) => (
                    <li key={index}>
                        <TimelineEvent {...event} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timeline;