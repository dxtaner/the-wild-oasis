import "./UserRow.css";

export default function UserRow({
  user,
  setEditingUser,
  setEditFormData,
  setSelectedUser,
}) {
  return (
    <tr>
      <td className="user-info">
        <div className="avatar">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={`${user.name}'s avatar`}
              className="avatar-img"
            />
          ) : user.name ? (
            user.name.charAt(0)
          ) : (
            "?"
          )}
        </div>

        <div>
          <h4>{user.name}</h4>
          <p>#{user.id}</p>
        </div>
      </td>

      <td className="email">{user.email}</td>

      <td>
        <span className="role">{user.role}</span>
      </td>

      <td>
        <span className={`status ${user.status}`}>{user.status}</span>
      </td>

      <td>
        <div className="actions">
          <button
            className="edit-btn"
            onClick={() => {
              setEditingUser(user);
              setEditFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
              });
            }}
          >
            Edit
          </button>

          <button className="delete-btn" onClick={() => setSelectedUser(user)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
