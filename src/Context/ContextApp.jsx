import React, { createContext, useState, useEffect } from "react";
import {
  doc,
  setoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { dbBanco } from "../Services/firebase";
import { toast } from "react-toastify";

export const ContextForm = createContext();

const FormProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [Questions01, setQuestions01] = useState(null);
  const [Questions02, setQuestions02] = useState(null);
  const [Questions03, setQuestions03] = useState(null);
  const [Questions04, setQuestions04] = useState(null);
  const [Questions05, setQuestions05] = useState(null);
  const [Questions06, setQuestions06] = useState(null);
  const [Questions07, setQuestions07] = useState(null);
  const [Questions08, setQuestions08] = useState(null);
  const [Questions09, setQuestions09] = useState(null);
  const [Questions10, setQuestions10] = useState(null);

  function resetQuestionPage() {
    setCurrentQuestion(0);
  }

  function nextQuestionPage() {
    setCurrentQuestion(currentQuestion + 1);
  }

  function donwQuestionPage() {
    setCurrentQuestion(currentQuestion - 1);
    if (currentQuestion === 0) return setCurrentQuestion(0);
  }

  const respostasForm = {
    Questions01: Questions01,
    Questions02: Questions02,
    Questions03: Questions03,
    Questions04: Questions04,
    Questions05: Questions05,
    Questions06: Questions06,
    Questions07: Questions07,
    Questions08: Questions08,
    Questions09: Questions09,
    Questions10: Questions10,
  };

  // Perguntas

  const [load, setLoad] = useState(true);
  const [Perguntas01, setPerguntas01] = useState(null);
  const [Perguntas02, setPerguntas02] = useState(null);
  const [Perguntas03, setPerguntas03] = useState(null);
  const [Perguntas04, setPerguntas04] = useState(null);
  const [Perguntas05, setPerguntas05] = useState(null);
  const [Perguntas06, setPerguntas06] = useState(null);
  const [Perguntas07, setPerguntas07] = useState(null);
  const [Perguntas08, setPerguntas08] = useState(null);
  const [Perguntas09, setPerguntas09] = useState(null);
  const [Perguntas10, setPerguntas10] = useState(null);

  if (Perguntas01 === null || "") {
    attPerguntas();
  }

  async function attPerguntas() {
    const postRef = collection(dbBanco, "perguntasForm");
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      snapshot.forEach((form) => {
        setPerguntas01(form.data().Perguntas01);
        setPerguntas02(form.data().Perguntas02);
        setPerguntas03(form.data().Perguntas03);
        setPerguntas04(form.data().Perguntas04);
        setPerguntas05(form.data().Perguntas05);
        setPerguntas06(form.data().Perguntas06);
        setPerguntas07(form.data().Perguntas07);
        setPerguntas08(form.data().Perguntas08);
        setPerguntas09(form.data().Perguntas09);
        setPerguntas10(form.data().Perguntas10);

        // Convert the form data to JSON
        const formDataJson = JSON.stringify(form.data());
      });

      setLoad(false);
    });

    return unsubscribe;
  }

  async function HandleSalvarPerguntas() {
    const docRef = doc(dbBanco, "perguntasForm", "Perguntas");

    const updates = {
      Perguntas01: Perguntas01,
      Perguntas02: Perguntas02,
      Perguntas03: Perguntas03,
      Perguntas04: Perguntas04,
      Perguntas05: Perguntas05,
      Perguntas06: Perguntas06,
      Perguntas07: Perguntas07,
      Perguntas08: Perguntas08,
      Perguntas09: Perguntas09,
      Perguntas10: Perguntas10,
    };

    try {
      await updateDoc(docRef, updates);
      toast.success("Formulário atualizado!");
    } catch (e) {
      console.error("Erro ao atualizar formulário:");
      alert(
        "Erro ao atualizar o formulário. Verifique o console para detalhes."
      );
    }
  }

  function HandleUnput(event, index) {
    switch (index) {
      case 1:
        setPerguntas01(event);
        console.log(Perguntas01);
        break;
      case 2:
        setPerguntas02(event);
        console.log(Perguntas02);
        break;
      case 3:
        setPerguntas03(event);
        break;
      case 4:
        setPerguntas04(event);
        break;
      case 5:
        setPerguntas05(event);
        break;
      case 6:
        setPerguntas06(event);
        break;
      case 7:
        setPerguntas07(event);
        break;
      case 8:
        setPerguntas08(event);
        break;
      case 9:
        setPerguntas09(event);
        break;
      case 10:
        setPerguntas10(event);
        break;
    }
  }

  const perguntasForm = [
    Perguntas01,
    Perguntas02,
    Perguntas03,
    Perguntas04,
    Perguntas05,
    Perguntas06,
    Perguntas07,
    Perguntas08,
    Perguntas09,
    Perguntas10,
  ];

  //mode Color

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [VarIntro, setVarIntro] = useState([
    {
      title: "Welcome",
      intro: "Hello World! 👋",
    },
    {
      title: "Menu Inicial",
      elementSelector: ".Personalizar",
      intro: "Ao clicar aqui você vai para a tela home",
    },
  ]);

<<<<<<< HEAD
=======
  const [introList, setIntroList] = useState([]);

  async function BuscarIntroSalvar() {
    const introDocRef = doc(dbBanco, "IntroJS", "Header");

    try {
      const docSnap = await getDoc(introDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const adaptadoParaVarIntro = data.introListNew
.map((item) => ({
          title: item?.title,
          intro: item?.intro,
          element:
            item.element === null || ""
              ? document.querySelector(item.element)
              : document.querySelector(item.element),
        }));

        setIntroList(adaptadoParaVarIntro);
        console.log(adaptadoParaVarIntro);
      } else {
        console.log("O documento não existe!");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  useEffect(() => {
    BuscarIntroSalvar();
  }, []);

>>>>>>> ec9732efe85528b8c23008a97603de4ab166bd22
  return (
    <ContextForm.Provider
      value={{
        nextQuestionPage,
        donwQuestionPage,
        currentQuestion,
        setCurrentQuestion,
        respostasForm,
        resetQuestionPage,
        Questions01,
        Questions02,
        Questions03,
        Questions04,
        Questions05,
        Questions06,
        Questions07,
        Questions08,
        Questions09,
        Questions10,
        setQuestions01,
        setQuestions02,
        setQuestions03,
        setQuestions04,
        setQuestions05,
        setQuestions06,
        setQuestions07,
        setQuestions08,
        setQuestions09,
        setQuestions10,
        Perguntas01,
        Perguntas02,
        Perguntas03,
        Perguntas04,
        Perguntas05,
        Perguntas06,
        Perguntas07,
        Perguntas08,
        Perguntas09,
        Perguntas10,
        setPerguntas01,
        setPerguntas02,
        setPerguntas03,
        setPerguntas04,
        setPerguntas05,
        setPerguntas06,
        setPerguntas07,
        setPerguntas08,
        setPerguntas09,
        setPerguntas10,
        HandleSalvarPerguntas,
        load,
        HandleUnput,
        perguntasForm,
        isDarkMode,
        setIsDarkMode,
        VarIntro,
      }}
    >
      {children}
    </ContextForm.Provider>
  );
};

export default FormProvider;
