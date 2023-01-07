import styles from "./styles.module.scss";

// Hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "./../../hooks/useFetchDocuments";


// Components
import { PostDetail } from "../../components/PostDetail";

export function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate()
  const { documents: posts, loading } = useFetchDocuments("posts");


  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }
  };
  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div>
        {loading && <p>Carregando...</p> }
        {posts && posts.map(post => (
          <PostDetail key={post.id} post={post}/>
        ))}

        {posts && posts.length === 0 && (
          <div className={styles.noPosts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
