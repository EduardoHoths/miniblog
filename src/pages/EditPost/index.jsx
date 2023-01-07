// Styles
import styles from "./styles.module.scss";

// Hooks
import { useState } from "react";
import { useFetchDocument } from "../../hooks/useFetchDocument";

// Router
import { useNavigate, useParams } from "react-router-dom";

// Context
import { useAuthValue } from "../../context/AuthContext";
import { useEffect } from "react";
import { useUpdateDocument } from "./../../hooks/useUpdateDocument";

export function EditPost() {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const navigate = useNavigate();

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.editPost}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Titulo:</span>
              <input
                type="text"
                name="title"
                placeholder="Pense em um bom título..."
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>

            <p className={styles.previewTitle}>Preview da imagem atual:</p>
            <img className={styles.imagePreview} src={post.image} alt={post.title} />

            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                placeholder="Insira um imagem que representa seu post"
                required
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>

            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                placeholder="Insira o conteúdo do post"
                required
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>

            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                placeholder="Insira as tags separadas por vírgula"
                required
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {response.loading ? (
              <button className="btn" disabled>
                Aguarde
              </button>
            ) : (
              <button className="btn">Editar</button>
            )}

            {response.error ||
              (formError && <p className="error">{response.error || formError}</p>)}
          </form>
        </>
      )}
    </div>
  );
}
