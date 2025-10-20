import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config.js";

function ProfileEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cover, setCover] = useState("");
  const [avatar, setAvatar] = useState("");
  const [biography, setBiography] = useState("");

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload.id;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Erreur serveur");

        const data = await response.json();
        setCover(data.cover || "");
        setAvatar(data.avatar || "");
        setBiography(data.biography || "");
      } catch (error) {
        console.error("Erreur lors de la récupération du profil", error);
      }
    };
    fetchProfile();
  }, [id]);

  if (id !== String(userId)) {
    console.error("ID dans l'URL différent de l'utilisateur connecté. Accès interdit.");
    navigate("/creatorprofile");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userId);

    if (avatar instanceof File) formData.append("avatar", avatar);
    if (cover instanceof File) formData.append("cover", cover);
    if (biography) formData.append("biography", biography);

    try {
      const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate("/creatorProfile");
      } else {
        console.error("Erreur lors de la modification du profil");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Modifier le profil</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="avatar" className="text-lg font-semibold">Photo de profil</label>
          {avatar && !(avatar instanceof File) && (
            <img
              src={`${BACKEND_URL}/uploads/${avatar}`}
              alt="Avatar actuel"
              className="w-32 h-32 object-cover rounded-md border border-gray-300"
            />
          )}
          {avatar instanceof File && (
            <img
              src={URL.createObjectURL(avatar)}
              alt="Nouvel avatar"
              className="w-32 h-32 object-cover rounded-md border border-gray-300"
            />
          )}
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        {/* Cover */}
        <div className="flex flex-col items-center gap-2 w-full">
          <label htmlFor="cover" className="text-lg font-semibold">Photo de couverture</label>
          {cover && !(cover instanceof File) && (
            <img
              src={`${BACKEND_URL}/uploads/${cover}`}
              alt="Cover actuelle"
              className="w-full h-48 md:h-56 object-cover rounded-lg border border-gray-300"
            />
          )}
          {cover instanceof File && (
            <img
              src={URL.createObjectURL(cover)}
              alt="Nouvelle cover"
              className="w-full h-48 md:h-56 object-cover rounded-lg border border-gray-300"
            />
          )}
          <input
            type="file"
            id="cover"
            accept="image/*"
            className="file-input file-input-bordered file-input-sm w-full"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </div>

        {/* Biography */}
        <div className="flex flex-col w-full">
          <label htmlFor="biography" className="text-lg font-semibold mb-1">Biographie</label>
          <textarea
            id="biography"
            placeholder="Commencez à écrire..."
            value={biography || ""}
            onChange={(e) => setBiography(e.target.value)}
            className="textarea textarea-bordered h-48 resize-none w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/creatorprofile")}
            className="btn btn-neutral w-full sm:w-auto"
          >
            Retour
          </button>
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
