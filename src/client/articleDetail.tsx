import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { axiosInstance } from "../api";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Article } from "../models/Article";
import { ArticleDetail as IArticleDetail } from "../models/ArticleDetail";
import { DateTime } from "luxon";

const ArticleDetail = () => {
  const params = useParams();
  const [article, setArticle] = useState<IArticleDetail>({
    articleId: "",
    comments: [],
    content: "",
    createdAt: "",
    imageId: undefined,
    lastUpdatedAt: "",
    perex: "",
    title: "",
  });
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [comment, setComment] = useState("");
  const loadArticle = () => {
    axiosInstance.get(`/articles/${params.id}`).then((res) => {
      setArticle(res.data);
    });
  };
  useEffect(() => {
    loadArticle();
    axiosInstance.get("/articles").then((res) => {
      setArticleList(res.data.items);
    });
  }, []);

  const addComment = (e: React.FormEvent) => {
    axiosInstance
      .post("/comments", {
        articleId: article.articleId,
        author: "Alex92",
        content: comment,
      })
      .then(() => {
        loadArticle();
        setComment("");
      });
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={8}>
            <Row className="my-4">
              <Col>
                <h2>{article.title}</h2>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <img
                  src={
                    article.imageId ||
                    "https://placehold.co/760x504?text=No+Image"
                  }
                  alt=""
                />
              </Col>
            </Row>
            <Row className="mb-4 pb-4 border-bottom">
              <Col>
                <MarkdownEditor.Markdown source={article.content} />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <h4>Comments ({article.comments?.length})</h4>
              </Col>
            </Row>
            <Row className="align-items-center mb-4">
              <Col md={1}>
                <img
                  src="https://placehold.co/44x44?text=No+Image"
                  alt=""
                  className=""
                />
              </Col>
              <Col>
                <form onSubmit={addComment}>
                  <input
                    type="text"
                    className="comment-input"
                    placeholder="Join the discussion"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </form>
              </Col>
            </Row>
            {article.comments?.map((comment) => {
              return (
                <Row>
                  <Col md={1}>
                    <img
                      src="https://placehold.co/44x44?text=No+Image"
                      alt=""
                      className=""
                    />
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <h6>{comment.author}</h6>
                      </Col>
                      <Col>
                        <span>
                          {DateTime.fromISO(comment.postedAt || "")
                            .diffNow("hours")
                            .toFormat("h")}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>{comment.content}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span>+{comment.score}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="border-start ps-4">
              <Row className="my-4">
                <Col>
                  <h5>Related articles</h5>
                </Col>
              </Row>
              {articleList.map((article) => {
                return (
                  <>
                    <Row className="mb-1">
                      <Col>
                        <h6>{article.title}</h6>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col>
                        <span>{article.perex}</span>
                      </Col>
                    </Row>
                  </>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticleDetail;
