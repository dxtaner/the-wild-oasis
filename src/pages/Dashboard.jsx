import { useNavigate } from "react-router-dom";
import { useCabins } from "../features/cabins/useCabins";
import { useBookings } from "../features/bookings/useBookings";
import { useUsers } from "../features/users/useUsers";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: cabins, isLoading: isLoadingCabins } = useCabins();
  const { data: bookings, isLoading: isLoadingBookings } = useBookings();
  const { data: users, isLoading: isLoadingUsers } = useUsers();

  if (isLoadingCabins || isLoadingBookings || isLoadingUsers) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  const totalCabins = cabins?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalStaff = users?.length || 0;

  const totalRevenue =
    bookings?.reduce((acc, b) => {
      const price =
        b.total_price ??
        b.totalPrice ??
        b.total_amount ??
        b.totalAmount ??
        b.cabin_price ??
        b.cabinPrice ??
        0;
      return acc + Number(price);
    }, 0) || 0;

  const totalPaidRevenue =
    bookings?.reduce((acc, b) => {
      const price =
        b.total_price ??
        b.totalPrice ??
        b.total_amount ??
        b.totalAmount ??
        b.cabin_price ??
        b.cabinPrice ??
        0;
      return acc + Number(price);
    }, 0) || 0;

  const avgPrice = totalBookings > 0 ? totalRevenue / totalBookings : 0;

  const maxPrice =
    totalCabins > 0
      ? Math.max(
          ...cabins.map((c) => {
            const p =
              c.regular_price ??
              c.regularPrice ??
              c.regularprice ??
              c.price ??
              0;
            return Number(p);
          }),
        )
      : 0;

  const confirmedBookings = bookings?.length || 0;
  const activeBookings = 0;
  const completedBookings = 0;

  const occupancyRate =
    totalCabins > 0 ? ((confirmedBookings / totalCabins) * 100).toFixed(0) : 0;

  const stats = [
    {
      title: "Total Cabins",
      value: totalCabins,
      icon: "⛺",
      color: "green",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: "💰",
      color: "blue",
    },
    {
      title: "Average Booking",
      value: `$${avgPrice.toFixed(0)}`,
      icon: "📊",
      color: "purple",
    },
    {
      title: "Highest Price",
      value: `$${maxPrice}`,
      icon: "📈",
      color: "orange",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Hotel performance metrics and real-time operations overview</p>
        </div>
        <button
          className="header-badge"
          onClick={() => navigate("/update-user")}
        >
          ⚙️ Account Settings
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.title} className={`card card-${item.color}`}>
            <div className="icon-wrapper">
              <div className="icon">{item.icon}</div>
            </div>
            <div>
              <p className="title">{item.title}</p>
              <h2 className="value">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="metrics-panel">
          <div className="panel-card">
            <div className="panel-info">
              <h3>Occupancy Rate</h3>
              <p className="panel-value">{occupancyRate}%</p>
            </div>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-info">
              <h3>Collected Revenue</h3>
              <p className="panel-value-alt text-green">
                ${totalPaidRevenue.toLocaleString()}
              </p>
            </div>
            <span className="panel-subtext">From overall registered stays</span>
          </div>
        </div>

        <div className="status-table-card">
          <h3>Booking Status Distribution</h3>
          <div className="status-rows">
            <div className="status-item">
              <div className="status-label">
                <span className="dot dot-yellow"></span> Active & Registered
              </div>
              <span className="status-count">{confirmedBookings} bookings</span>
            </div>
            <div className="status-item">
              <div className="status-label">
                <span className="dot dot-green"></span> Checked In
              </div>
              <span className="status-count">{activeBookings} bookings</span>
            </div>
            <div className="status-item">
              <div className="status-label">
                <span className="dot dot-blue"></span> Checked Out
              </div>
              <span className="status-count">{completedBookings} bookings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="extra">
        <div className="extra-card">
          <span className="extra-icon">📅</span>
          <div>
            <h3>Total Bookings</h3>
            <p>{totalBookings}</p>
          </div>
        </div>

        <div className="extra-card">
          <span className="extra-icon">👤</span>
          <div>
            <h3>Active System Users</h3>
            <p>{totalStaff}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
