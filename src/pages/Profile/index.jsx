import { useState } from "react";
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { Avatar, Container, Form } from "./styles";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarUrl = 
  user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

  //se o usuário já tiver uma imagem.
  //Estado que exibe o avatar
  const [avatar, setAvatar] = useState(avatarUrl);

  // se o usuário ainda não tiver uma imagem(imagem nova).
  //Estado que vai guardar o arquivo selecionado pelo usuário
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleUpdate() {
    const user = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    };

    await updateProfile({ user, avatarFile });
  }

  async function handleChangeAvatar(event) {
    //Serve para guardar o arquivo selecionado
    const file = event.target.files[0];
    setAvatarFile(file);

    //toda vez que o usuário mudar de avatar gera uma url,
    //pra atualizar o estado que exibe o avatar(setAvatar)
    //Serve para exibir o avatar de fato.
    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>
      <Form>
        <Avatar>
          <img src={avatar} alt="Foto pessoal" />

          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        />
        <Button title="Salvar" onClick={handleUpdate}/>
      </Form>
    </Container>
  );
}
