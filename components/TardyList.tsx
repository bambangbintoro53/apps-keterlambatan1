
import React from 'react';
import { TardyRecord, FilterType } from '../types';

interface TardyListProps {
  records: TardyRecord[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  onDeleteRecord: (id: string) => void;
  availableClasses: string[];
  selectedClass: string;
  onSelectClass: (cls: string) => void;
}

const FilterButton: React.FC<{
  label: string;
  type: FilterType;
  activeFilter: FilterType;
  onClick: (filter: FilterType) => void;
}> = ({ label, type, activeFilter, onClick }) => {
  const isActive = type === activeFilter;
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const activeClasses = 'bg-blue-600 text-white shadow';
  const inactiveClasses = 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300';

  return (
    <button onClick={() => onClick(type)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {label}
    </button>
  );
};

const TrashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


const TardyList: React.FC<TardyListProps> = ({ 
  records, 
  filter, 
  setFilter, 
  onDeleteRecord,
  availableClasses,
  selectedClass,
  onSelectClass
}) => {
  
  const getFilterTitle = () => {
    let timeLabel = '';
    switch (filter) {
      case 'day': timeLabel = 'Hari Ini'; break;
      case 'month': timeLabel = 'Bulan Ini'; break;
      case 'all': timeLabel = 'Semua Waktu'; break;
    }
    
    if (selectedClass) {
        return `Laporan ${selectedClass} - ${timeLabel}`;
    }
    return `Laporan ${timeLabel}`;
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-slate-700">{getFilterTitle()}</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            {/* Class Filter Dropdown */}
            <select
                value={selectedClass}
                onChange={(e) => onSelectClass(e.target.value)}
                className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
                <option value="">Semua Kelas</option>
                {availableClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                ))}
            </select>

            {/* Time Filters */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md overflow-x-auto">
                <FilterButton label="Hari Ini" type="day" activeFilter={filter} onClick={setFilter} />
                <FilterButton label="Bulan Ini" type="month" activeFilter={filter} onClick={setFilter} />
                <FilterButton label="Semua" type="all" activeFilter={filter} onClick={setFilter} />
            </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {records.length > 0 ? (
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3">Waktu</th>
                <th scope="col" className="px-6 py-3">Nama Siswa</th>
                <th scope="col" className="px-6 py-3">NIS</th>
                <th scope="col" className="px-6 py-3">Kelas</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {new Date(record.timestamp).toLocaleString('id-ID', {
                        hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4">{record.name}</td>
                  <td className="px-6 py-4">{record.nis}</td>
                  <td className="px-6 py-4">{record.class}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDeleteRecord(record.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                      aria-label={`Hapus data ${record.name}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 px-6 bg-slate-50 rounded-lg">
            <p className="text-slate-500">
                Tidak ada data keterlambatan 
                {selectedClass ? ` untuk kelas ${selectedClass}` : ''} pada periode ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TardyList;
