import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config.js";
import vibrantChaos from "../assets/img/vibrant-chaos.jpeg";

function DropdownMenu({ avatar, username, role = [], logout }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(role?.[0] || null);

  useEffect(() => {
    setSelectedRole(role?.[0] || null);
  }, [role]);

  const getAvatarSrc = (avatarVal) => {
    if (!avatarVal) return vibrantChaos;
    if (avatarVal.startsWith("http") || avatarVal.startsWith("data:")) return avatarVal;
    if (avatarVal.startsWith("/")) return `${BACKEND_URL}${avatarVal}`;
    return `${BACKEND_URL}/uploads/${avatarVal}`;
  };

  const handleLogout = () => {
    if (typeof logout === "function") {
      logout();
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dropdown  dropdown-top">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={getAvatarSrc(avatar)} alt="avatar" />
        </div>
      </div>

      {/* Menu */}
      <div tabIndex={0} className="dropdown-content bg-neutral text-neutral-content rounded-box w-64 p-2 shadow border border-base-300">
        {role.length ? (
          role.map((r, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-base-300 ${
                selectedRole === r ? "bg-base-300" : ""
              }`}
              onClick={() => setSelectedRole(r)}
            >
              <img src={getAvatarSrc(avatar)} alt="avatar" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <span className="font-bold">{username}</span>
                <span className="text-xs">{r}</span>
              </div>
              {selectedRole === r && <span className="ml-auto">✔️</span>}
            </div>
          ))
        ) : (
          <div className="flex items-center gap-3 p-2">
            <img src={getAvatarSrc(avatar)} alt="avatar" className="w-10 h-10 rounded-full" />
            <div>
              <span className="font-bold">{username || "Utilisateur"}</span>
              <span className="text-xs text-gray-400">Aucun rôle</span>
            </div>
          </div>
        )}

        <div className="divider divider-accent my-1" />

        <button className="w-full btn btn-ghost text-left justify-start" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;
