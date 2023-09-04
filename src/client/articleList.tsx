import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import { Article } from "../models/Article";
import { axiosInstance } from "../api";
import Header from "../components/header";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { DateTime } from "luxon";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    axiosInstance.get("/articles").then((res) => {
      setArticles(res.data.items);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Row className="my-4">
          <Col>
            <h1 className="title">Recent Articles</h1>
          </Col>
        </Row>
        {articles.map((article) => {
          return (
            <Row className="mb-4">
              <Col md={3}>
                <img
                  src={
                    article.imageId || "https://placehold.co/272?text=No+Image"
                  }
                  alt=""
                />
              </Col>
              <Col md={9}>
                <Row>
                  <Col>
                    <h4>{article.title}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <span>Elisabeth Strain</span>
                  </Col>
                  <Col md={10}>
                    <span>
                      {DateTime.fromISO(article.createdAt || "").toFormat("D")}
                    </span>
                  </Col>
                </Row>
                <Row className="my-4">
                  <Col>
                    <MarkdownEditor.Markdown source={article.perex + "..."} />
                  </Col>
                </Row>
                <Row className="align-self-end">
                  <Col md={3}>
                    <NavLink to={`/articles/${article.articleId}`}>
                      Read whole article
                    </NavLink>
                  </Col>
                  <Col md={9}>
                    <span>0 comments</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}
      </Container>
    </>
  );
};

export default ArticleList;
