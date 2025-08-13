import React from 'react';
import { Home, FileText, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigationItems = [
        {
            name: 'Home',
            icon: Home,
            path: '/',
            description: 'Dashboard overview'
        },
        {
            name: 'Maintenance Report',
            icon: FileText,
            path: '/maintenance-report',
            description: 'View maintenance reports'
        }
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        if (window.innerWidth < 768) {
            onToggle();
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onToggle}
                />
            )}

            <div className={`
        fixed left-0 top-0 h-full bg-gray-800 text-white z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 border-r border-gray-700
      `}>
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-blue-400">SmartMonitor</h1>
                    <button
                        onClick={onToggle}
                        className="md:hidden p-2 hover:bg-gray-700 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <li key={item.name}>
                                    <button
                                        onClick={() => handleNavigation(item.path)}
                                        className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                      ${isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }
                    `}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <div className="text-left">
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-gray-400">{item.description}</div>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                    <div className="text-xs text-gray-400 text-center">
                        SmartMonitor v1.0
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
