import { Container,Links,Content } from "./styles";
import { useParams } from "react-router-dom";
import { useState ,useEffect} from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

export function Details() {
const navigate = useNavigate();
const params = useParams();

const [data, setData] = useState(null);

useEffect(()=>{
  async function fetchNote(){
    const response = await  api.get(`/notes/${params.id}`);
    setData(response.data);
  }
  fetchNote();
},[])

function handleNavigate(){
  navigate(-1);
}

async function handleRemoveNote(){
  const confirm = window.confirm('Deseja realmente deletar a nota ?')
    if(confirm){
    await api.delete(`notes/${params.id}`)
    navigate(-1);
  }
}

  return (
    <Container>
      <Header />
      { //Só carrega o main se tiver o objeto data para carregar.
        data&&
          <main>
            <Content>        
                <ButtonText 
                  title="Excluir nota"
                  onClick={handleRemoveNote}
                />
                <h1>{data.title}</h1> 
                <p>
                  {data.description}
                </p>

                {data.links &&
                  <Section title="Links Ùteis">
                    
                      <Links>
                      {
                        data.links.map(link=>(
                          <li key={String(link.id)}>
                            <a href={link.url} target="_blank">
                              {link.url}
                            </a>
                          </li>
                        ))
                      }           
                      </Links>                 
                
                  </Section>
                }

                {
                  data.tags &&
                    <Section title="Marcadores">
                        {
                          data.tags.map(tag=>(

                            <Tag 
                              key={String(tag.id)}
                              title={tag.name}                        
                            />
                          ))
                        }                      
                    </Section>
                }
                
                <Button title="Voltar" onClick={handleNavigate} />
            </Content>
          </main>
      }
      
      
    </Container>
  );
}
