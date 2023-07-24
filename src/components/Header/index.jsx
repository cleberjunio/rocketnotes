import { RiShutDownLine } from "react-icons/ri";
import { Container, Logout, Profile } from "./styles";

export function Header() {
  return (
    <Container>
      <Profile to="/profile">
        <img src="http://github.com/cleberjunio.png" alt="Foto perfil github" />
        <div>
          <span>Bem-vindo</span>
          <strong>Cleber Junio</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
