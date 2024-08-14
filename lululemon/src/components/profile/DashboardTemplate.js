import { Header } from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import "./DashboardTemplate.css";

const DashboardLayout = ({mainContent, sidebarTitle}) => {
  console.log(sidebarTitle);
  
  return (
    <>
      <Header isSticky={false} />
      <div className="dashboard-containers">
        <Navigator currentPage="Dashboard" />
        <div className="main-layout">
          <Sidebar sidebarTitle={sidebarTitle}/>
          {mainContent}
        </div>
      </div>
      <Footer />
    </>
  );
};

const Navigator = ({ currentPage }) => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <a href="#" className="nav-item">
              Account
            </a>
          </li>
          <li className="nav-separator">/</li>
          <li>
            <a href="#" className="nav-item">
              {currentPage}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Sidebar = ({sidebarTitle}) => {
  const menuItems = [
    { title: "Dashboard", link: "/account/dashboard" },
    { title: "Purchase History", link: "/account/purchaseHistory" },
    { title: "Profile", link: "/account/profile" },
    { title: "Membership Benefits", link: "/account/membership" },
    { title: "Wish List", link: "/account/wishList" },
  ];

  return (
    <aside className="sidebar">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`sidebar-item ${item.title === sidebarTitle ? "active" : ""}`}
        >
          <a href={item.link}>{item.title}</a>
        </div>
      ))}
    </aside>
  );
};

export default DashboardLayout;