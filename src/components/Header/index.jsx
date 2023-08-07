import { RiShutDownLine } from "react-icons/ri";
import { Container, Logout, Profile } from "./styles";
import { useAuth }from "../../hooks/auth";

export function Header() {
  const { SignOut } = useAuth();
  return (
    <Container>
      <Profile to="/profile">
        <img src="http://github.com/cleberjunio.png" alt="Foto perfil github" />
        <div>
          <span>Bem-vindo</span>
          <strong>Cleber Junio</strong>
        </div>
      </Profile>

      <Logout onClick={SignOut}>
        <RiShutDownLine/>
      </Logout>
    </Container>
  );
}
