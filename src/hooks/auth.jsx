import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});
function AuthProvider({ children }) {
  const [data, setData] = useState({});

  // Login
  async function SignIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:token", token);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      //Inserindo/Armazenando um token do tipo Bearer de autorização, no cabeçalho,
      // por padrão em todas as requisições que o usuário irá fazer.
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      //Login atualizou o conteúdo do usuário
      //Antes guardando os dados do usuário no estado
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar");
      }
    }
   
  }

  //Função para deslogar usuário
  function SignOut() {
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    //volta o estado para vazio, pra refletir na api
    setData({});
  }

  //Recebendo os dados do usuário pra atualizar
  async function updateProfile({ user, avatarFile }) {
      try {
        if(avatarFile){
          
          //enviando avatar pro banco de dados
          const fileUploadForm = new FormData()
          fileUploadForm.append('avatar', avatarFile);

          const response = await api.patch('/users/avatar', fileUploadForm);
          user.avatar = response.data.avatar;
        }

        await api.put('/users',user)

                  
        /* // Remove a senha do objeto "user"
        const updatedUserResponse = await api.put('/users', user);
        const updatedUser = updatedUserResponse.data; */
        
        // Armazena o objeto "user" sem a senha no localStorage
        localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });

      alert("Perfil atualizado!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil");
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    //Se o token e o usuário forem informados, insere o token no cabeçalho.
    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    //compartilhando o contexto no usuário
    //conteúdo do estado
    <AuthContext.Provider
      value={{
        SignIn,
        SignOut,
        updateProfile,
        user: data.user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
