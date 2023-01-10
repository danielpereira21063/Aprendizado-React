import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocumentation";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import styles from "./CreatePost.module.css";


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if(!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;


    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });
    navigate("/");
  }


  return (
    <div className={styles.createPost}>
      <h2 style={{ textAlign: 'center' }}>Criar post</h2>
      <p style={{ textAlign: 'center' }}>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título: </span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num bom título"
            onChange={(e) => setTitle(e.target.value)}
            value={title} />
        </label>

        <label>
          <span>Imagem: </span>
          <input
            type="text"
            name="image"
            required
            placeholder="Escolha uma imagem que represente o seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image} />
        </label>

        <label>
          <span>Conteúdo: </span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body} >
          </textarea>
        </label>

        <label>
          <span>Tags: </span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags} />
        </label>

        {!response.loading && <button type="submit" className="btn">Cadastrar</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost;