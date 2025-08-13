import React, { useEffect, useState, useRef } from 'react';
import { Calendar, AlertTriangle, CheckCircle, Clock, Menu, Search, ChevronDown, Wrench, X, Save } from 'lucide-react';
import { apiService } from '../services/api';
import Sidebar from './Sidebar';

export default function MaintenanceReport() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [timeFilter, setTimeFilter] = useState('All Intervals');
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
    const [selectedMaintenanceItem, setSelectedMaintenanceItem] = useState<any>(null);
    const [actionDescription, setActionDescription] = useState('');
    const [beforeActionDescription, setBeforeActionDescription] = useState('');
    const timeDropdownRef = useRef<HTMLDivElement>(null);

    // Handle clicking outside dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
                setShowTimeDropdown(false);
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowTimeDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleActionClick = (item: any) => {
        setSelectedMaintenanceItem(item);
        // If the task is completed, show the existing action description
        setActionDescription(item.status === 'Completed' ? item.afterAction : '');
        // If the task already has a before action, show it
        setBeforeActionDescription(item.beforeAction !== '-' ? item.beforeAction : '');
        setShowMaintenanceDialog(true);
    };

    const handleSaveMaintenance = () => {
        if (actionDescription.trim()) {
            // Here you would typically save the maintenance action to the backend
            console.log('Saving maintenance action:', {
                item: selectedMaintenanceItem,
                action: actionDescription,
                completedAt: new Date().toISOString()
            });

            // Update the local data to show the action was completed
            const updatedData = maintenanceData.map(item => {
                if (item.id === selectedMaintenanceItem.id) {
                    return {
                        ...item,
                        afterAction: actionDescription,
                        status: 'Completed',
                        completedAt: new Date().toLocaleDateString(),
                        // Also update the before action if it was just recorded
                        beforeAction: beforeActionDescription || item.beforeAction
                    };
                }
                return item;
            });

            // In a real app, you would update the state here
            // For now, we'll just close the dialog
            setShowMaintenanceDialog(false);
            setSelectedMaintenanceItem(null);
            setActionDescription('');
            setBeforeActionDescription('');

            // Show a success message (you could add a toast notification here)
            alert('Maintenance action recorded successfully!');
        }
    };

    const handleSaveBeforeAction = () => {
        if (beforeActionDescription.trim()) {
            // Here you would typically save the before action to the backend
            console.log('Saving before action:', {
                item: selectedMaintenanceItem,
                beforeAction: beforeActionDescription
            });

            // Update the local data to show the before action was recorded
            const updatedData = maintenanceData.map(item => {
                if (item.id === selectedMaintenanceItem.id) {
                    return {
                        ...item,
                        beforeAction: beforeActionDescription
                    };
                }
                return item;
            });

            // In a real app, you would update the state here
            // For now, we'll just close the dialog
            setShowMaintenanceDialog(false);
            setSelectedMaintenanceItem(null);
            setBeforeActionDescription('');

            // Show a success message
            alert('Condition assessment recorded successfully! You can now record the maintenance action.');
        }
    };

    // Sample maintenance data matching the image
    const maintenanceData = [
        {
            id: 1,
            machineName: 'Press Machine 4',
            componentName: 'Hydraulic Pump',
            description: 'Check oil level and pressure',
            dueDate: '1/10/2025',
            checklist: 'Daily',
            status: 'Pending', // Added status
            beforeAction: '-',
            afterAction: '-'
        },
        {
            id: 2,
            machineName: 'CNC Machine 1',
            componentName: 'Ball Screw X-Axis',
            description: 'Lubrication and alignment check',
            dueDate: '1/15/2025',
            checklist: 'Weekly',
            status: 'Pending', // Added status
            beforeAction: '-',
            afterAction: '-'
        },
        {
            id: 3,
            machineName: 'CNC Machine 1',
            componentName: 'LM Guideway Y-Axis',
            description: 'Clean and inspect for wear',
            dueDate: '1/12/2025',
            checklist: 'Monthly',
            status: 'Completed', // Added status
            beforeAction: 'High vibration',
            afterAction: 'Smooth'
        },
        {
            id: 4,
            machineName: 'Press Machine 4',
            componentName: 'Control Panel',
            description: 'Check all buttons and displays',
            dueDate: '1/20/2025',
            checklist: 'Daily',
            status: 'Pending', // Added status
            beforeAction: 'Button 3 not responding',
            afterAction: 'All buttons working'
        },
        {
            id: 5,
            machineName: 'CNC Machine 2',
            componentName: 'Spindle Motor',
            description: 'Check temperature and vibration',
            dueDate: '1/25/2025',
            checklist: 'Weekly',
            status: 'Completed', // Added status
            beforeAction: 'High temperature',
            afterAction: 'Normal temperature'
        },
        {
            id: 6,
            machineName: 'Press Machine 4',
            componentName: 'Safety Sensors',
            description: 'Test emergency stop functionality',
            dueDate: '1/30/2025',
            checklist: 'Monthly',
            status: 'Pending', // Added status
            beforeAction: 'Sensor 2 faulty',
            afterAction: 'All sensors working'
        },
        {
            id: 7,
            machineName: 'Assembly Line 1',
            componentName: 'Conveyor Belt',
            description: 'Inspect belt tension and alignment',
            dueDate: '4/15/2025',
            checklist: 'Quarterly',
            status: 'Pending',
            beforeAction: '-',
            afterAction: '-'
        },
        {
            id: 8,
            machineName: 'Packaging Machine',
            componentName: 'Sealing Unit',
            description: 'Calibrate temperature sensors',
            dueDate: '7/1/2025',
            checklist: 'Half Yearly',
            status: 'Pending',
            beforeAction: '-',
            afterAction: '-'
        },
        {
            id: 9,
            machineName: 'Quality Control Station',
            componentName: 'Measurement System',
            description: 'Annual calibration and certification',
            dueDate: '12/31/2025',
            checklist: 'Yearly',
            status: 'Pending',
            beforeAction: '-',
            afterAction: '-'
        }
    ];

    // Filter and search functionality
    const filteredData = maintenanceData.filter(item => {
        const matchesSearch =
            item.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = timeFilter === 'All Intervals' || item.checklist === timeFilter;

        return matchesSearch && matchesFilter;
    });

    // Sort by due date
    const sortedData = [...filteredData].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA.getTime() - dateB.getTime();
    });

    return (
        <div className='min-h-screen bg-gray-900 text-white flex'>
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

            <div className='flex-1'>
                <nav className='bg-gray-800 px-6 py-4 flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        <button
                            onClick={toggleSidebar}
                            className='p-2 hover:bg-gray-700 rounded-lg'
                        >
                            <Menu className='w-6 h-6' />
                        </button>
                        <h1 className='text-xl font-bold text-blue-400'>Smart Maintenance</h1>
                    </div>

                    <div className='flex items-center space-x-4'>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                            <input
                                type='text'
                                placeholder='Search machines, components...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>

                        <div className='relative'>
                            <button
                                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                                className='flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors'
                            >
                                <span className='font-medium'>{timeFilter}</span>
                                <ChevronDown className='w-4 h-4 text-blue-500' />
                            </button>

                            {/* Dropdown Menu */}
                            {showTimeDropdown && (
                                <div className='absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50' ref={timeDropdownRef}>
                                    <div className='py-1'>
                                        {['All Intervals', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half Yearly', 'Yearly'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setTimeFilter(option);
                                                    setShowTimeDropdown(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${timeFilter === option
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'text-gray-700'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>
                </nav>

                <div className='p-6'>
                    <div className='max-w-7xl mx-auto'>
                        <div className='mb-8'>
                            <h1 className='text-3xl font-bold mb-2'>Maintenance Report</h1>
                            <p className='text-gray-400'>Track and manage machine maintenance activities.</p>
                            <div className='mt-4 flex items-center justify-between'>
                                <div className='text-sm text-gray-400'>
                                    Showing {sortedData.length} of {maintenanceData.length} maintenance tasks
                                </div>
                                <div className='text-sm text-gray-400'>
                                    Filter: {timeFilter} | Search: "{searchTerm || 'All'}"
                                </div>
                            </div>
                        </div>

                        {/* Maintenance Table */}
                        <div className='bg-gray-800 rounded-lg overflow-hidden'>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-gray-700'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                Machine Name
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                Component Name
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                Description
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                Due Date
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                Checklist
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                Status
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                Before Action
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                After Action
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-700'>
                                        {sortedData.map((item) => (
                                            <tr key={item.id} className='hover:bg-gray-700'>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm font-medium text-white'>{item.machineName}</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{item.componentName}</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{item.description}</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{item.dueDate}</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{item.checklist}</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {item.status === 'Completed' ? (
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                        ) : (
                                                            <Clock className="w-3 h-3 mr-1" />
                                                        )}
                                                        {item.status}
                                                    </div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{item.beforeAction}</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{item.afterAction}</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <button
                                                        onClick={() => handleActionClick(item)}
                                                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${item.status === 'Completed'
                                                            ? 'bg-green-600 hover:bg-green-500 text-white'
                                                            : 'bg-red-600 hover:bg-red-500 text-white'
                                                            }`}
                                                    >
                                                        Action
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {sortedData.length === 0 && (
                                <div className='text-center py-12 text-gray-400'>
                                    <Calendar className='w-12 h-12 mx-auto mb-4 opacity-50' />
                                    <p>No maintenance tasks found matching your search criteria.</p>
                                    <p className='text-sm mt-2'>Try adjusting your search term or filter.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Maintenance Action Dialog */}
            {showMaintenanceDialog && selectedMaintenanceItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg relative">
                        {/* Header */}
                        <div className="flex items-center mb-6">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${selectedMaintenanceItem.status === 'Completed'
                                ? 'bg-green-600'
                                : 'bg-red-600'
                                }`}>
                                {selectedMaintenanceItem.status === 'Completed' ? (
                                    <CheckCircle className="w-6 h-6 text-white" />
                                ) : (
                                    <Wrench className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {selectedMaintenanceItem.status === 'Completed'
                                        ? 'Maintenance Action'
                                        : 'Start Maintenance'
                                    }
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {selectedMaintenanceItem.status === 'Completed'
                                        ? 'View recorded maintenance activity'
                                        : 'Record condition and start maintenance'
                                    }
                                </p>
                            </div>
                            <button
                                onClick={() => setShowMaintenanceDialog(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Maintenance Details */}
                        <div className="bg-gray-700 rounded-lg p-4 mb-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Maintenance Details</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Machine Name:</span>
                                    <span className="text-white font-medium">{selectedMaintenanceItem.machineName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Component Name:</span>
                                    <span className="text-white font-medium">{selectedMaintenanceItem.componentName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Task Description:</span>
                                    <span className="text-white font-medium">{selectedMaintenanceItem.description}</span>
                                </div>
                                {selectedMaintenanceItem.status === 'Completed' && selectedMaintenanceItem.completedAt && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Completed On:</span>
                                        <span className="text-white font-medium">{selectedMaintenanceItem.completedAt}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Before Action Assessment */}
                        {selectedMaintenanceItem.beforeAction === '-' && (
                            <div className="mb-6">
                                <label className="block text-lg font-semibold text-white mb-3">Before Action Assessment</label>
                                <textarea
                                    value={beforeActionDescription}
                                    onChange={(e) => setBeforeActionDescription(e.target.value)}
                                    placeholder="Describe the current condition of the component before maintenance (e.g., high vibration, oil leak, button not responding, etc.)"
                                    className="w-full h-24 p-3 bg-gray-700 border border-orange-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 resize-none"
                                />
                                <p className="text-gray-400 text-sm mt-2">
                                    Describe the current condition of the component before performing maintenance.
                                </p>
                            </div>
                        )}

                        {/* Show existing before action if it exists */}
                        {selectedMaintenanceItem.beforeAction !== '-' && (
                            <div className="mb-6">
                                <label className="block text-lg font-semibold text-white mb-3">Condition Assessment</label>
                                <div className="w-full h-24 p-3 bg-gray-700 border border-orange-500 rounded-lg text-white">
                                    {selectedMaintenanceItem.beforeAction}
                                </div>
                                <p className="text-gray-400 text-sm mt-2">
                                    This condition assessment has been recorded and can be referenced during maintenance.
                                </p>
                            </div>
                        )}

                        {/* Action Done */}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-white mb-3">
                                {selectedMaintenanceItem.status === 'Completed' ? 'Action Performed' : 'Action Done'}
                            </label>
                            <textarea
                                value={actionDescription}
                                onChange={(e) => setActionDescription(e.target.value)}
                                placeholder="Describe what maintenance action was performed on this component."
                                className="w-full h-24 p-3 bg-gray-700 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 resize-none"
                                readOnly={selectedMaintenanceItem.status === 'Completed'}
                            />
                            <p className="text-gray-400 text-sm mt-2">
                                {selectedMaintenanceItem.status === 'Completed'
                                    ? 'This maintenance action has been completed and recorded.'
                                    : 'Describe what maintenance action was performed on this component.'
                                }
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowMaintenanceDialog(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                            >
                                {selectedMaintenanceItem.status === 'Completed' ? 'Close' : 'Cancel'}
                            </button>

                            {/* Show Save Before Action button if no before action exists */}
                            {selectedMaintenanceItem.beforeAction === '-' && (
                                <button
                                    onClick={handleSaveBeforeAction}
                                    disabled={!beforeActionDescription.trim()}
                                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Save Condition</span>
                                </button>
                            )}

                            {/* Show Save Maintenance Action button if before action exists but task is not completed */}
                            {selectedMaintenanceItem.beforeAction !== '-' && selectedMaintenanceItem.status !== 'Completed' && (
                                <button
                                    onClick={handleSaveMaintenance}
                                    disabled={!actionDescription.trim()}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Save Action</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
