import { useState } from "react";
import { useUser } from "../../features/auth/useUser";
import { useUpdateUser } from "../../features/auth/useUpdateUser";
import "./updateUser.css";

export default function UpdateUser() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const currentFullName = user?.user_metadata?.fullName || "";

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");

  function handleUpdateProfile(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      },
    );
  }

  function handleUpdatePassword(e) {
    e.preventDefault();
    if (!password) return;
    updateUser(
      { password },
      {
        onSuccess: () => {
          setPassword("");
          e.target.reset();
        },
      },
    );
  }

  return (
    <div className="update-user-container">
      <h1>Update your account</h1>

      <div className="update-card">
        <h3>Update user data</h3>
        <form onSubmit={handleUpdateProfile} className="update-form">
          <div className="form-row">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={user?.email || ""}
              disabled
              className="form-input disabled-input"
            />
          </div>

          <div className="form-row">
            <label htmlFor="fullName">Full name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isUpdating}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="avatar">Avatar image</label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              disabled={isUpdating}
              className="form-file-input"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setFullName(currentFullName)}
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update details"}
            </button>
          </div>
        </form>
      </div>

      <div className="update-card">
        <h3>Update password</h3>
        <form onSubmit={handleUpdatePassword} className="update-form">
          <div className="form-row">
            <label htmlFor="password">New password (min 8 chars)</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isUpdating}
              className="form-input"
              minLength={8}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setPassword("")}
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
