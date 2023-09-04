import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api";
import { Article } from "../models/Article";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<(string | undefined)[]>([]);
  const navigate = useNavigate();
  const getArticles = () => {
    axiosInstance.get("/articles").then((res) => {
      setArticles(res.data.items);
    });
  };
  const deleteArticle = (id: string | undefined) => {
    axiosInstance.delete(`/articles/${id}`).then(() => {
      setArticles((articles) => articles.filter((a) => a.articleId !== id));
    });
  };
  const checkItem = (id: string | undefined) => {
    setSelected((selected) => {
      if (selected.includes(id)) {
        return selected.filter((i) => i !== id);
      } else {
        return [...selected, id];
      }
    });
  };
  const selectAll = () => {
    if (selected.length) {
      setSelected([]);
    } else {
      setSelected(articles.map((i) => i.articleId));
    }
  };
  useEffect(() => {
    getArticles();
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Row className="mt-4">
          <Col md={2}>
            <h2>My articles</h2>
          </Col>
          <Col>
            <Button onClick={() => navigate("/admin/new-article")}>
              Create new article
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={selectAll}
                      checked={selected.length === articles.length}
                    />
                  </th>
                  <th>Article Title</th>
                  <th>Perex</th>
                  <th>Author</th>
                  <th># of comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => {
                  return (
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.includes(article.articleId)}
                          onChange={() => checkItem(article.articleId)}
                        />
                      </td>
                      <td>{article.title}</td>
                      <td>{article.perex?.slice(0, 128) + "..."}</td>
                      <td>Elisabeth Strain</td>
                      <td>4</td>
                      <td>
                        <Button
                          variant="secondary"
                          className="me-2 mb-2"
                          style={{ width: "80%" }}
                          onClick={() =>
                            navigate(
                              `/admin/articles/${article.articleId}/edit`
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          style={{ width: "80%" }}
                          onClick={() => deleteArticle(article.articleId)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticleList;
