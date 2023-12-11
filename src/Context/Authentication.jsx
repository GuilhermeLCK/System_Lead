import { React, createContext, useEffect, useState } from "react";
import { authFirebase, dbBanco, storage } from "../Services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { wait } from "@testing-library/user-event/dist/utils";

export const AuthContext = createContext({});

function Authentication({ children }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [loadingAuth, setLoadingAuth] = useState(false);

  const [loading, setLoading] = useState(true);

  async function logarUsuario(email, password) {
    setLoadingAuth(true);

    await signInWithEmailAndPassword(authFirebase, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(dbBanco, "users", uid);

        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          name: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data);
        setLoadingAuth(false);
        toast.success(`Seja bem-vinda (o) de volta, ${data.name}!`);
        navigate("/Home");
        localStorage.setItem("LoggedInUser", JSON.stringify(data));
      })
      .catch((error) => {
        toast.error("Ops ... Cadastro não encontrado...");
        setLoadingAuth(false);
      });
  }

  async function cadastarUsuario(nome, email, password) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(authFirebase, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(dbBanco, "users", uid), {
          nome: nome,
          avatarUrl: null,
        }).then(() => {
          let data = {
            uid: uid,
            name: nome,
            email: value.user.email,
            avatarUrl: null,
          };
          setUser(data);
          setLoadingAuth(false);
          toast.success(`Seja bem-vinda (o) ao sistema, ${data.name}!`);
          navigate("/Home");
          localStorage.setItem("LoggedInUser", JSON.stringify(data));
        });
      })
      .catch((error) => {
        toast.error("Ops ... Tenta novamente");
        setLoadingAuth(false);
      });
  }

  useEffect(() => {
    async function LoadUser() {
      const storageUser = localStorage.getItem("LoggedInUser");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    LoadUser();
  }, []);

  async function deslogar() {
    await signOut(authFirebase);
    localStorage.removeItem("LoggedInUser");
    setUser(null);
  }
  return (
    <AuthContext.Provider
      value={{
        Logged: !!user,
        user,
        logarUsuario,
        cadastarUsuario,
        deslogar,
        loadingAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default Authentication;
