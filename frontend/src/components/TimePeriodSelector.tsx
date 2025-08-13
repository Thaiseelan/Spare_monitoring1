import React from 'react';

export type TimePeriod = 'daily' | 'weekly' | 'monthly';

interface TimePeriodSelectorProps {
    selectedPeriod: TimePeriod;
    onPeriodChange: (period: TimePeriod) => void;
    className?: string;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
    selectedPeriod,
    onPeriodChange,
    className = ''
}) => {
    const periods: { value: TimePeriod; label: string }[] = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPeriod = e.target.value as TimePeriod;
        console.log('TimePeriodSelector: Period changed to:', newPeriod);
        onPeriodChange(newPeriod);
    };

    console.log('TimePeriodSelector: Rendering with period:', selectedPeriod);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Current: {selectedPeriod}</div>
            <select
                value={selectedPeriod}
                onChange={handleChange}
                className={className}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#374151',
                    color: 'white',
                    border: '1px solid #6B7280',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    minWidth: '120px'
                }}
            >
                {periods.map((period) => (
                    <option key={period.value} value={period.value}>
                        {period.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimePeriodSelector;
