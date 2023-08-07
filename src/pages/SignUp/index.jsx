import { useState } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import { Background, Container, Form } from "./styles";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    //console.log(name, email, password);testando no console se os dados do form estão chegando
    if (!name || !email || !password) {
      return alert("Preencha todos os campos");
    }

   // Acessando a rota de cadastro do usuário através da api e enviando os dados ao banco.
    api.post("/users", { name, email, password })
    
      // se deu tudo certo com a conexão
      .then(() => {
        alert("Usuário cadastrado com sucesso!"); 

        //depois de cadastrar manda o usuário para a tela de login 
        navigate("/");
      })
      //se encontrar algum erro, captura a mensagem de erro do backend
      .catch((error) => {        
        if (error.response) {
          alert(error.response.data.message);
         //ou mensagem de erro genérica
        } else {
          alert("Não foi possível cadastrar!");
        }
      });
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={ handleSignUp } />

        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  );
}
