import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { axiosInstance } from "../api";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useNavigate, useParams } from "react-router-dom";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [imageId, setImageId] = useState<any>();
  const [perex, setPerex] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setPerex(content.slice(0, 500));
  }, [content]);
  useEffect(() => {
    if (params.id) {
      axiosInstance.get(`/articles/${params.id}`).then((res) => {
        const { title, imageId, content } = res.data;
        setTitle(title);
        setImageId(imageId);
        setContent(content);
      });
    }
  }, []);
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      for (const file of e.target.files) {
        formData.append("images", file);
      }
    }
    axiosInstance
      .post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setImageId(res.data.imageId);
      });
  };
  const createArticle = () => {
    if (!params.id) {
      axiosInstance
        .post("/articles", {
          title,
          perex,
          imageId,
          content,
        })
        .then(() => {
          navigate("/admin/articles");
        });
    } else {
      axiosInstance
        .patch(`/articles/${params.id}`, {
          title,
          perex,
          imageId,
          content,
        })
        .then(() => {
          navigate("/admin/articles");
        });
    }
  };
  return (
    <>
      <Header />
      <Container>
        <Row className="my-4">
          <Col md={3}>
            <h2>Create new article</h2>
          </Col>
          <Col>
            <Button onClick={createArticle}>Publish Article</Button>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form>
              <Form.Group className="mb-4">
                <Form.Label>Article Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="My First Article"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Featured image</Form.Label>
                <Form.Control
                  type="file"
                  value={imageId}
                  onChange={uploadFile}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Content</Form.Label>
                <MarkdownEditor value={content} onChange={setContent} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticleForm;
