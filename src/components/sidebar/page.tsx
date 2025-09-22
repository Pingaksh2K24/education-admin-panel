import React, { useState } from 'react';
import {
    HomeIcon,
    GlobeAltIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    AcademicCapIcon,
    SpeakerWaveIcon,
    CalendarDaysIcon,
    PhotoIcon,
    UserIcon,
    CogIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    BuildingOffice2Icon
} from '@heroicons/react/24/outline';
import './style.css';

interface SidebarProps {
    selectedMenu: string;
    onMenuSelect: (menu: string) => void;
    onToggle: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedMenu, onMenuSelect, onToggle }) => {
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const getParentMenu = (submenu: string): string | null => {
        if (websiteSubMenus.includes(submenu)) return 'Website';
        if (facultySubMenus.includes(submenu)) return 'Faculty';
        if (eventsSubMenus.includes(submenu)) return 'Events';
        if (usersSubMenus.includes(submenu)) return 'Users';
        if (coursesSubMenus.includes(submenu)) return 'Courses';
        return null;
    };

    const isMenuActive = (menuLabel: string): boolean => {
        return selectedMenu === menuLabel || getParentMenu(selectedMenu) === menuLabel;
    };

    const websiteSubMenus = [
        'Top Bar', 'Announcement Bar', 'Banner', 'Hero', 'Home',
        'About Us', 'Academic', 'Admission', 'Department',
        'Student Life', 'Placements', 'Alumni', 'Gallery', 'NAAC', 'Contact'
    ];

    const facultySubMenus = [
        'View Faculty', 'Add Faculty'
    ];

    const eventsSubMenus = [
        'View Event', 'View Events'
    ];

    const usersSubMenus = [
        'View Users', 'Add Users'
    ];

    const coursesSubMenus = [
        'View Course', 'Add Course'
    ];

    const menuItems = [
        { icon: HomeIcon, label: 'Dashboard' },
        { icon: GlobeAltIcon, label: 'Website', hasSubMenu: true, subMenus: websiteSubMenus },
        { icon: UserGroupIcon, label: 'Courses', hasSubMenu: true, subMenus: coursesSubMenus },
        { icon: ClipboardDocumentListIcon, label: 'Admissions' },
        { icon: AcademicCapIcon, label: 'Faculty', hasSubMenu: true, subMenus: facultySubMenus },
        { icon: SpeakerWaveIcon, label: 'Notices' },
        { icon: CalendarDaysIcon, label: 'Events', hasSubMenu: true, subMenus: eventsSubMenus },
        { icon: UserIcon, label: 'Users', hasSubMenu: true, subMenus: usersSubMenus },
        { icon: CogIcon, label: 'Settings' }
    ];

    const toggleSubMenu = (label: string) => {
        setExpandedMenu(expandedMenu === label ? null : label);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="logo">
                <BuildingOffice2Icon className="logo-icon" />
                <h2>
                    Siddhivinayak College
                </h2>
            </div>
            <button
                className="toggle-btn"
                onClick={() => {
                    const newCollapsed = !isCollapsed;
                    setIsCollapsed(newCollapsed);
                    onToggle(newCollapsed);
                }}
            >
                <ChevronLeftIcon className={`toggle-icon ${isCollapsed ? 'rotated' : ''}`} />
            </button>
            <nav className="nav-menu">
                {menuItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isExpanded = expandedMenu === item.label || getParentMenu(selectedMenu) === item.label;

                    return (
                        <div key={index}>
                            <div
                                className={`nav-item ${isMenuActive(item.label) ? 'active' : ''}`}
                                onClick={() => {
                                    if (item.hasSubMenu) {
                                        toggleSubMenu(item.label);
                                    } else {
                                        onMenuSelect(item.label);
                                    }
                                }}
                            >
                                <IconComponent className="nav-icon" />
                                <span className="nav-label">{item.label}</span>
                                {item.hasSubMenu && (
                                    isExpanded ?
                                        <ChevronDownIcon className="chevron-icon" /> :
                                        <ChevronRightIcon className="chevron-icon" />
                                )}
                            </div>

                            {item.hasSubMenu && isExpanded && (
                                <div className="sub-menu">
                                    {item.subMenus?.map((subItem, subIndex) => (
                                        <div
                                            key={subIndex}
                                            className={`sub-menu-item ${selectedMenu === subItem ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onMenuSelect(subItem);
                                            }}
                                        >
                                            <span className="sub-menu-label">{subItem}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;