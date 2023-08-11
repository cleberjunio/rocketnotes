import { Link } from "react-router-dom";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useState } from "react";

import { Container, Form } from "./styles";

export function New() {
  //Estado que guarda todos os links através de um array
  const [links, setLinks] = useState([]);

  //Estado para adicionar novos links no momento, em formato de string
  const [newLink, setNewLink] = useState("");

  //Função de adicionar novo Link
  function handleAddLink(){

    //Função que atualiza o vetor de links(setLinks) acessando o que tinha antes de
    // dentro do array(prevState)
    //montando o array mantendo o link que tinha antes mais o novo link(newLink)
    setLinks(prevState => [...prevState, newLink]);

    //Reseta o estado 
    setNewLink("");
  }

  //removendo o link que estou querendo deletar(deleted)
  function handleRemoveLink(deleted){
    //(Filter)retorna todos os valores menos o que será deletado
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  const [tags, setTags] = useState([])
  const [newTags, setNewTags] = useState("")

  function handleAddTag(){
    setTags(prevState => [...prevState, newTags]);
    setNewTags("");

    //(prevState => [...prevState,   newTags])-Spread operator
    //[react, node] =>[[react, node],[express]]
  }

  function handleRemoveTag(deleted){
    setTags(prevState =>prevState.filter(tag => tag !== deleted))
  }
  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>
          <Input placeholder="Título" />
          <Textarea placeholder="Observações" />
          
          <Section title="Links úteis">
                      
            { //utilizando a variável de estado(links) para mostrar os links adicionados.
                      //valor, posição
              links.map((link, index) => (
                <NoteItem  
                key={String(index)}//sempre que tem algum componente renderizado por uma lista, precisa de uma key
                value={link}//recuperando o valor de link da minha lista(link)
                onClick={() => {handleRemoveLink(link) }}
                />  
              ))
            }
            <NoteItem  
                isNew 
                placeholder="Novo link"
                value={newLink}
                onChange={e => setNewLink(e.target.value)}
                onClick={handleAddLink}
            />  
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              { 
                tags.map((tag, index)=>(
                  <NoteItem 
                  key={String(index)}
                  value={tag}
                  onClick={()=>{handleRemoveTag(tag)}}
                   
                   /> 
                ))
                
              }
              <NoteItem 
               isNew
               placeholder="Nova tag"
               onChange={e => setNewTags(e.target.value)}
               value={newTags}
               onClick={handleAddTag}
               />  
            </div>
          </Section>

          <Button title="Salvar"/>
        </Form>
      </main>
    </Container>
  );
}
