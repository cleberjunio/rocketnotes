import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Note } from "../../components/Note";
import { Section } from "../../components/Section";
import { api } from "../../services/api";
import { Brand, Container, Content, Menu, NewNote, Search } from "./styles";

export function Home() {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  async function handleTagsSelected(tagName) {
    setTagsSelected((prevState) => [...prevState, tagName]);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }
    fetchTags();
  },[]);

  //recebendo como parâmetro o nome da tag selecionada no momento

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>
      <Header />
      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={handleTagsSelected("all")}
            $isactive={tagsSelected.length === 0}
          />
        </li>
        {
          //existe conteúdo dentro do estado tags?
          tags &&
            tags.map((tag) => (
              <li key={String(tag.id)}>
                <ButtonText
                  title={tag.name}
                  onClick={handleTagsSelected(tag.name)}
                  $isactive={tagsSelected.length.includes(tag.name)}
                />
              </li>
            ))
        }
      </Menu>
      <Search>
        <Input placeholder="Pesquisar pelo título" />
      </Search>
      <Content>
        <Section title="Minhas notas">
          <Note
            data={{
              title: "React Modal",
              tags: [
                { id: "1", name: "react" },
                { id: "2", name: "front-End" },
              ],
            }}
          />
        </Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}
