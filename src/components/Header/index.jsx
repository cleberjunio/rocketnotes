import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { Container, Logout, Profile } from "./styles";
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg";
import { useNavigate } from "react-router-dom";


export function Header() {
  const { SignOut, user } = useAuth();
  //Criando url para renderizar a imagem do usuário no form,buscando do backend
  const avatarUrl = 
  user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

  const navigate = useNavigate();  
  function handleSignOut() {
    //Chamada da função de sair do sistema
    navigate('/');
    SignOut();
  }

  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt={user.name} />
        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={ handleSignOut }>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
