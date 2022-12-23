import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { Api } from "../../services/Api";
import Header from "../header/Header";
import Button from "../sharedcomponents/Button";
import Input from "../sharedcomponents/Input";
import "./Linkpage.css";

export default function Linkpage() {
  const navigate = useNavigate();
  const [url, seturl] = useState("");
  const [link, setLink] = useState();
  const [cleanup, setCleanup] = useState(false);

  console.log(link);

  useEffect(() => {
    Api.get("/users/me")
      .then((response) => setLink(response.data.shortenedUrls))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    if (cleanup) setCleanup(false);
  }, [cleanup]);

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      url,
    };

    Api.post("/urls/shorten", body)
      .then((r) => {
        swal("Boa", "link escurtado", "success");
        setCleanup(true);
      })
      .catch((err) => {
        console.log(err);
        swal("Opps", "Algo deu errado", "error");
      });
  }

  function deleteUrl(id) {
    Api.delete(`/urls/${id}`).then(() => setCleanup(true));
  }

  return (
    <main>
      <Header />
      <WarpLinks>
        <Intens>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Input
              required
              placeholder="Links que cabem no bolso"
              value={url}
              onChange={(e) => seturl(e.target.value)}
            />
            <Button>Encurtar link</Button>
          </Form>
        </Intens>
        {link != null &&
          link.map((l) => (
            <Warper key={l.id}>
              <ul style={{width:"90%"}}>
                <Text>
                  <span>{l.url}</span> <span>{l.shortUrl}</span>{" "}
                  <span>{l.visitCount}</span>
                </Text>
              </ul>
              <Lixeira onClick={() => deleteUrl(l.id)}>
                <i className="fa-regular fa-trash-can"></i>
              </Lixeira>
            </Warper>
          ))}
      </WarpLinks>
    </main>
  );
}

const Form = styled.form`
  display: contents;
`;
const WarpLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 136px;
`;

const Intens = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Warper = styled.div`
  margin-top: 58px;
  width: 100%;
  height: 62px;
  border-radius: 12px;
  border: 1px solid #78b159;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.li`
  background-color: #80cc74;
  border-radius: 12px 0 0 12px;
  width: 100%;
  height: 62px;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Lixeira = styled.span`
  background-color: #ffffff;
  width: 10%;
  text-align: center;
  cursor: pointer;
`;
