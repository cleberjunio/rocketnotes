import { useState } from "react";
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";
import { Avatar, Container, Form } from "./styles";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  //se o usuário já tiver uma imagem 
  const [avatar, setAvatar] = useState(user.avatar)

  // se o usuário ainda não tiver uma imagem(imagem nova)
  const [avatarFile, setAvatarFile] = useState(null)

  async function handleUpdate() {
    const user = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    };

    await updateProfile({ user, avatarFile });
  }

  async function handleChangeAvatar(event){
    //para guardar o arquivo selecionado
    const file = event.target.files[0]
    setAvatarFile(file)


    //para exibir o avatar
    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
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
          <img 
          src={avatar}
          alt="Foto pessoal"
           />

          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar"
             type="file"
             onChange={handleChangeAvatar}
             />
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
        <Button title="Salvar" onClick={ handleUpdate } />
      </Form>
    </Container>
  );
}
