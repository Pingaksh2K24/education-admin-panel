import React, { useState } from 'react';
import Sidebar from './sidebar/page';
import Header from './header/page';
import Dashboard from '../pages/dashboard/page';
import ViewFaculty from '../pages/faculty/ViewFaculty';
import AddFaculty from '../pages/faculty/AddFacultty';
import ViewEvent from '../pages/events/ViewEvent';
import ViewEvents from '../pages/events/ViewEvents';
import ViewUsers from '../pages/users/ViewUsers';
import AddUsers from '../pages/users/AddUsers';
import ViewCourse from '../pages/courses/ViewCourse/index';
import AddCourse from '../pages/courses/AddCourse';
import Settings from '../pages/settings';
import Notice from '../pages/notice';
import TopBar from '../pages/website/TopBar';
import AnnouncementBar from '../pages/website/AnnouncementBar';
import Banner from '../pages/website/Banner';
import Hero from '../pages/website/Hero';
import Home from '../pages/website/Home';
import AboutUs from '../pages/website/AboutUs';
import Academic from '../pages/website/Academic';
import Admission from '../pages/website/Admission';
import Department from '../pages/website/Department';
import StudentLife from '../pages/website/StudentLife';
import Placements from '../pages/website/Placements';
import Alumni from '../pages/website/Alumni';
import Contact from '../pages/website/Contact';
import Gallery from '../pages/gallary/page';
import AddImage from '../pages/gallary/AddImage';
import './Layout.css';

const Layout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Website':
        return <div>Website Management Page</div>;
      case 'Top Bar':
        return <TopBar />;
      case 'Announcement Bar':
        return <AnnouncementBar />;
      case 'Banner':
        return <Banner />;
      case 'Hero':
        return <Hero />;
      case 'Home':
        return <Home />;
      case 'About Us':
        return <AboutUs />;
      case 'Academic':
        return <Academic />;
      case 'Admission':
        return <Admission />;
      case 'Department':
        return <Department />;
      case 'Student Life':
        return <StudentLife />;
      case 'Placements':
        return <Placements />;
      case 'Alumni':
        return <Alumni />;
      case 'Gallery':
        return <Gallery onNavigate={setSelectedMenu} />;
      case 'Add Image':
        return <AddImage />;
      case 'NAAC':
        return <div>NAAC Page</div>;
      case 'Contact':
        return <Contact />;
      case 'Courses':
        return <div>Courses Management Page</div>;
      case 'Admissions':
        return <div>Admissions Management Page</div>;
      case 'Faculty':
        return <div>Faculty Management Page</div>;
      case 'View Faculty':
        return <ViewFaculty />;
      case 'Add Faculty':
        return <AddFaculty />;
      case 'View Event':
        return <ViewEvent />;
      case 'View Events':
        return <ViewEvents />;
      case 'View Users':
        return <ViewUsers />;
      case 'Add Users':
        return <AddUsers />;
      case 'View Course':
        return <ViewCourse />;
      case 'Add Course':
        return <AddCourse />;
      case 'Notices':
        return <Notice />;
      case 'Events':
        return <div>Events Management Page</div>;
      case 'Users':
        return <div>Users Management Page</div>;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Sidebar
        selectedMenu={selectedMenu}
        onMenuSelect={setSelectedMenu}
        onToggle={setIsSidebarCollapsed}
      />
      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <Header sidebarCollapsed={isSidebarCollapsed} />
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Layout;