import React from 'react';
import { TardyRecord } from '../types';

interface StatsProps {
    records: TardyRecord[];
}

// FIX: Changed JSX.Element to React.ReactElement to resolve the 'Cannot find namespace JSX' error.
const StatCard: React.FC<{ title: string; value: number | string; icon: React.ReactElement }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);


const CalendarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const DocumentTextIcon: React.FC<{className?: string}> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const Stats: React.FC<StatsProps> = ({ records }) => {
    const now = new Date();
    
    const todayCount = records.filter(r => {
        const recordDate = new Date(r.timestamp);
        return recordDate.getDate() === now.getDate() &&
               recordDate.getMonth() === now.getMonth() &&
               recordDate.getFullYear() === now.getFullYear();
    }).length;

    const thisMonthCount = records.filter(r => {
        const recordDate = new Date(r.timestamp);
        return recordDate.getMonth() === now.getMonth() &&
               recordDate.getFullYear() === now.getFullYear();
    }).length;

    const totalCount = records.length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
                title="Terlambat Hari Ini" 
                value={todayCount} 
                icon={<CalendarIcon className="h-6 w-6" />} 
            />
            <StatCard 
                title="Terlambat Bulan Ini" 
                value={thisMonthCount} 
                icon={<CalendarIcon className="h-6 w-6" />} 
            />
            <StatCard 
                title="Total Pelanggaran" 
                value={totalCount} 
                icon={<DocumentTextIcon className="h-6 w-6" />} 
            />
        </div>
    );
};

export default Stats;