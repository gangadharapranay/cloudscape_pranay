import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/sidebar.css'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ClusterIcon from '@mui/icons-material/Share';
import GroupIcon from '@mui/icons-material/Group';
import AdministrationIcon from '@mui/icons-material/AdminPanelSettings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

const Sidebar = () => {
  // State to manage which items are expanded
  const [expandedItems, setExpandedItems] = useState([]);

  // Function to toggle expansion of an item
  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(item => item !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  return (
    <aside id="sidebar" className="js-sidebar">
      <div className="h-100">
        <div className="sidebar-logo">
          <div className='d-flex justify-content-space-between align-items-center'>
          <SettingsSuggestIcon style={{color:'white', fontSize:'40px', position:'relative', marginBottom:'30px'}}/>
          <Link to="/">JBOSS AUTOMATION<br/><p id='platform-tag'>Platform</p></Link>
          
          </div>
          
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Admin Elements</li>
          <li className="sidebar-item">
            <Link to="/dashboard" className="sidebar-link">
            <SpaceDashboardIcon style={{fontSize:'17px'}}/>&nbsp;&nbsp;Dashboard
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/" className={`sidebar-link ${expandedItems.includes('clusters') ? 'collapsed' : ''}`}
              data-bs-target="#clusters"
              data-bs-toggle="collapse"
              aria-expanded={expandedItems.includes('clusters') ? 'true' : 'false'}
              onClick={() => toggleItem('clusters')}
            >
              <ClusterIcon style={{fontSize:'17px'}}/>&nbsp;&nbsp;Cluster Management
            </Link>
            <ul id="clusters"
              className={`single-nested sidebar-dropdown list-unstyled collapse ${expandedItems.includes('pages') ? 'show' : ''}`}
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item " >
                <Link to="/create-cluster" className=" single-nested-sidebar-link sidebar-link">Create Cluster</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/page2" className="single-nested-sidebar-link sidebar-link">Manage Cluster</Link>
              </li>
            </ul>
          </li>





          <li className="sidebar-item">
            <Link to="/" className={`sidebar-link ${expandedItems.includes('users') ? 'collapsed' : ''}`}
              data-bs-target="#users"
              data-bs-toggle="collapse"
              aria-expanded={expandedItems.includes('users') ? 'true' : 'false'}
              onClick={() => toggleItem('users')}
            >
              <GroupIcon style={{fontSize:'17px'}}/>&nbsp;&nbsp;User Management
            </Link>
            <ul id="users"
              className={`single-nested sidebar-dropdown list-unstyled collapse ${expandedItems.includes('pages') ? 'show' : ''}`}
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item" >
                <Link to="/users" className="sidebar-link">Users</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/groups" className="sidebar-link">Groups</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/role-bindings" className="sidebar-link">Role Bindings</Link>
              </li>
            </ul>
          </li>





          <li className="sidebar-item">
            <Link to="/" className={`sidebar-link ${expandedItems.includes('adminstration') ? 'collapsed' : ''}`}
              data-bs-target="#adminstration"
              data-bs-toggle="collapse"
              aria-expanded={expandedItems.includes('adminstration') ? 'true' : 'false'}
              onClick={() => toggleItem('adminstration')}
            >
              <AdministrationIcon style={{fontSize:'17px'}}/>&nbsp;&nbsp;Administration
            </Link>
            <ul id="adminstration"
              className={`single-nested sidebar-dropdown list-unstyled collapse ${expandedItems.includes('pages') ? 'show' : ''}`}
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item" >
                <Link to="/page1" className="sidebar-link">Events</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/page2" className="sidebar-link">Deployments</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/page2" className="sidebar-link">Server Groups</Link>
              </li>
            </ul>
          </li>





        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
