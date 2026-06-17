import { useCabins } from "../features/cabins/useCabins";
import "./dashboard.css";

export default function Dashboard() {
  const { data: cabins, isLoading } = useCabins();

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const totalCabins = cabins.length;

  const totalRevenue = cabins.reduce(
    (acc, cabin) => acc + cabin.regularprice,
    0,
  );

  const avgPrice = totalRevenue / totalCabins;

  const maxPrice = Math.max(...cabins.map((c) => c.regularprice));

  const stats = [
    {
      title: "Total Cabins",
      value: totalCabins,
      icon: "🏨",
      color: "green",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      icon: "💰",
      color: "blue",
    },
    {
      title: "Average Price",
      value: `$${avgPrice.toFixed(0)}`,
      icon: "📊",
      color: "purple",
    },
    {
      title: "Highest Price",
      value: `$${maxPrice}`,
      icon: "🔥",
      color: "orange",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Hotel analytics overview</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.title} className={`card card-${item.color}`}>
            <div className="icon">{item.icon}</div>

            <div>
              <p className="title">{item.title}</p>
              <h2 className="value">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="extra">
        <div className="extra-card">
          <h3>Occupancy Rate</h3>
          <p>87%</p>
        </div>

        <div className="extra-card">
          <h3>Total Bookings</h3>
          <p>128</p>
        </div>

        <div className="extra-card">
          <h3>Total Guests</h3>
          <p>342</p>
        </div>
      </div>
    </div>
  );
}
