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
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  function handleTagSelected(tagName) {
    if(tagName === "all"){
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName);

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName);
      setTagsSelected(filteredTags);
    } else {
      setTagsSelected((prevState) => [...prevState, tagName]);
    }
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }
    
    fetchNotes();
  }, [tagsSelected, search]);
  
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
            onClick={() => handleTagSelected("all")}
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
                  onClick={() => handleTagSelected(tag.name)}
                  $isactive={tagsSelected.includes(tag.name)}
                />
              </li>
            ))
        }
      </Menu>
      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          onChange={() => setSearch(e.target.value)}
        />
      </Search>
      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note 
                key={String(note.id)}
                data={note}
              />
           ))
          }
        </Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}
