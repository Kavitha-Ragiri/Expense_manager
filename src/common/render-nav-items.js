
import { NavLink, useLocation  } from 'react-router-dom';
import { useState, useEffect } from 'react';
export function RenderNavBarItems() {
    const [userRole, setUserRole] = useState(null);
    const navItemsArray = [
        {toPath: '/rrsexpense/', dataPageName:'dashboard', itemName:'Dashboard', icon:'fa-pie-chart', id:1},
        {toPath: '/rrsexpense/expenses', dataPageName:'expense', itemName:'Expenses List', icon:'fa-line-chart', id:2},
        {toPath: '/rrsexpense/categories', dataPageName:'categories', itemName:'Expense Categories', icon:'fa-sliders', id:4},
        {toPath: '/rrsexpense/users', dataPageName:'users', itemName:'Users List', icon:'fa-users', id:3, adminOnly: true },
        {toPath: '/rrsexpense/settings', dataPageName:'setting', itemName:'App Settings', icon:'fa-gear', id:5},
        {toPath: '/rrsexpense/profile', dataPageName:'profile', itemName:'User Profile', icon:'fa-drivers-license', id:6},
        {toPath: '/rrsexpense/pagenotfound', dataPageName:'notfound', itemName:'Page Not Found', icon:'fa-exclamation-triangle', id:7}
    ];

    const currentRouting = useLocation().pathname.trim().replaceAll('/','');

    useEffect(() => {
        if( currentRouting === navItemsArray[0].toPath.replaceAll('/','')) {
            setDashboardLinkActiveStyle();
        } else {
            setDashboardLinkInActiveStyle();
        }
        const userData = JSON.parse(localStorage.getItem("logged_in_user")) || {};
        setUserRole(userData.role); // Assuming "role" is stored in local storage
    }, []);

    const setDashboardLinkActiveStyle =() =>{
        document.getElementsByClassName("dashboard-link")[0].style.backgroundColor  = "rgba(255, 255, 255, .075)";
        document.getElementsByClassName("dashboard-link")[0].style.borderLeft  = "3px solid #7fa0d2";      
    }

    const setStyles = (e) => {
        if(e.target.className.includes("dashboard-link")) {
            setDashboardLinkActiveStyle();
        } else {
            setDashboardLinkInActiveStyle();
        }
    }
   
    const setDashboardLinkInActiveStyle =() =>{
        document.getElementsByClassName("dashboard-link")[0].style.backgroundColor  = "var(--bs-dark)";
        document.getElementsByClassName("dashboard-link")[0].style.borderLeft  = "3px solid #212529";
    }

    
    return (
      <>
        {
            navItemsArray
            .filter((nav) => !nav.adminOnly || userRole === "admin") // Hide "Users List" if user is not admin
            .map((nav) => 
                <li key={nav.id} className="sidebar-item">
                    <NavLink to={nav.toPath} className={nav.dataPageName == "dashboard" ? "dashboard-link sidebar-link" : "sidebar-link"}
                    style={({ isActive }) => ({
                                background: isActive
                                    ? "rgba(255, 255, 255, .075)"
                                    : "var(--bs-dark)",
                                borderLeft: isActive ? "3px solid #7fa0d2" : "3px solid #212529"
                            })}
                            onClick={(e) => setStyles(e)}>
                        <i className={`fa-solid ${nav.icon} pe-2`}></i>
                        &nbsp;{nav.itemName} <span className='adminClass'>{nav.adminOnly ? "(Only for Admin)" : ""}</span>
                    </NavLink>
                </li>
            )             
        }   
      </>
    );
}