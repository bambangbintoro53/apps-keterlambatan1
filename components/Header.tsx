
import React from 'react';

const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
        <div className="flex justify-center items-center gap-4 mb-4">
            <ClockIcon />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Sistem Pencatatan Keterlambatan Siswa
            </h1>
        </div>
      <p className="text-md text-slate-500 max-w-2xl mx-auto">
        Catat dan kelola data siswa yang terlambat dengan mudah. Lihat laporan harian dan bulanan untuk memantau kedisiplinan.
      </p>
    </header>
  );
};

export default Header;
