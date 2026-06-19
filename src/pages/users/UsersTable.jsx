// UsersTable.jsx
import UserRow from "./UserRow";
import "./UsersTable.css";

export default function UsersTable({
  users,
  setEditingUser,
  setEditFormData,
  setSelectedUser,
}) {
  if (users.length === 0) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "2rem" }}>
        No users found.
      </p>
    );
  }

  return (
    <div className="table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              setEditingUser={setEditingUser}
              setEditFormData={setEditFormData}
              setSelectedUser={setSelectedUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
