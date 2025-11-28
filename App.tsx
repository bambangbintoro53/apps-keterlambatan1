
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TardyRecord, FilterType, Student } from './types';
import Header from './components/Header';
import TardyForm from './components/TardyForm';
import TardyList from './components/TardyList';
import Stats from './components/Stats';
import ImportModal from './components/ImportModal';
import DataVisualization from './components/DataVisualization';

const App: React.FC = () => {
  const [tardyRecords, setTardyRecords] = useState<TardyRecord[]>([]);
  const [masterStudentList, setMasterStudentList] = useState<Student[]>([]);
  const [filter, setFilter] = useState<FilterType>('day');
  const [classFilter, setClassFilter] = useState<string>('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    try {
      const storedRecords = localStorage.getItem('tardyRecords');
      if (storedRecords) {
        setTardyRecords(JSON.parse(storedRecords));
      }
      const storedStudents = localStorage.getItem('masterStudentList');
      if(storedStudents) {
        setMasterStudentList(JSON.parse(storedStudents));
      }
    } catch (error) {
      console.error("Failed to load records from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tardyRecords', JSON.stringify(tardyRecords));
    } catch (error) {
      console.error("Failed to save records to localStorage", error);
    }
  }, [tardyRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('masterStudentList', JSON.stringify(masterStudentList));
    } catch (error) {
      console.error("Failed to save student list to localStorage", error);
    }
  }, [masterStudentList]);


  const handleAddRecord = useCallback((student: Student) => {
    const newRecord: TardyRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: student.name,
      nis: student.nis,
      class: student.class,
      timestamp: Date.now(),
    };
    setTardyRecords(prevRecords => [newRecord, ...prevRecords]);
  }, []);

  const handleUpdateMasterList = useCallback((importedStudents: Student[]) => {
    // Using a Map to ensure uniqueness based on NIS
    const studentMap = new Map<string, Student>();
    [...masterStudentList, ...importedStudents].forEach(student => {
        studentMap.set(student.nis, student);
    });
    setMasterStudentList(Array.from(studentMap.values()));
    setIsImportModalOpen(false);
  }, [masterStudentList]);

  // Extract all unique classes from both master list and existing records
  const uniqueClasses = useMemo(() => {
    const classes = new Set<string>();
    masterStudentList.forEach(s => classes.add(s.class));
    tardyRecords.forEach(r => classes.add(r.class));
    return Array.from(classes).sort();
  }, [masterStudentList, tardyRecords]);

  const filteredRecords = useMemo(() => {
    const now = new Date();
    return tardyRecords.filter(record => {
      // 1. Filter by Class
      if (classFilter && record.class !== classFilter) {
        return false;
      }

      // 2. Filter by Date
      const recordDate = new Date(record.timestamp);
      if (filter === 'day') {
        return (
          recordDate.getDate() === now.getDate() &&
          recordDate.getMonth() === now.getMonth() &&
          recordDate.getFullYear() === now.getFullYear()
        );
      }
      if (filter === 'month') {
        return (
          recordDate.getMonth() === now.getMonth() &&
          recordDate.getFullYear() === now.getFullYear()
        );
      }
      return true; // 'all'
    });
  }, [tardyRecords, filter, classFilter]);
  
  const handleDeleteRecord = useCallback((id: string) => {
    setTardyRecords(prevRecords => prevRecords.filter(record => record.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="container mx-auto p-4 md:p-8">
        <Header />
        <main>
          <TardyForm 
            onAddRecord={handleAddRecord} 
            onOpenImportModal={() => setIsImportModalOpen(true)}
            students={masterStudentList}
          />
          <Stats records={tardyRecords} />
          <DataVisualization records={tardyRecords} />
          <TardyList 
            records={filteredRecords} 
            filter={filter} 
            setFilter={setFilter}
            onDeleteRecord={handleDeleteRecord}
            availableClasses={uniqueClasses}
            selectedClass={classFilter}
            onSelectClass={setClassFilter}
          />
        </main>
        <ImportModal 
            isOpen={isImportModalOpen}
            onClose={() => setIsImportModalOpen(false)}
            onImport={handleUpdateMasterList}
        />
      </div>
    </div>
  );
};

export default App;
