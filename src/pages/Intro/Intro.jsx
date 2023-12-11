import React, { useState, useEffect, useContext } from "react";
import { ContextForm } from "../../Context/ContextApp";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { dbBanco } from "../../Services/firebase";
import { ToastContainer, toast } from "react-toastify";

const IntroComponent = () => {
  const [introList, setIntroList] = useState([]);

  async function BuscarIntroSalvar() {
    const introDocRef = doc(dbBanco, "IntroJS", "Header");

    try {
      const docSnap = await getDoc(introDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const adaptadoParaVarIntro = data.introListNew.map((item) => ({
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

  const [introListNew, setIntroListNew] = useState([]);
  const [newItem, setNewItem] = useState({
    title: "",
    element: "",
    intro: "",
  });

  useEffect(() => {
    if (introList.length === 0) {
      console.log("Vazio");
    } else {
      setIntroListNew([...introList]);
      console.log("True");
    }
  }, [introList]);

  const adicionarItem = () => {
    const updatedList = [...introListNew, newItem];
    setIntroListNew(updatedList);
    salvarNoBanco(updatedList);

    setNewItem({
      title: "",
      element: "",
      intro: "",
    });
  };

  const removerItem = (index) => {
    const updatedList = introListNew.filter((_, i) => i !== index);
    setIntroListNew(updatedList);
    salvarNoBanco(updatedList);
  };

  const salvarNoBanco = async (updatedList) => {
    const introDocRef = doc(dbBanco, "IntroJS", "Header");

    try {
      await setDoc(introDocRef, { introListNew: updatedList });

      toast.success("Enviado com sucesso!", {
        style: {
          marginTop: "10px",
        },
        autoClose: 3000,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>Lista de INTRO</h2>
      <div>
        {introListNew.map((item, index) => (
          <div key={index}>
            <h3>Posição:{index}</h3>
            <h1>{item.title}</h1>
            <h2>{item.intro}</h2>
            <h3>
              {item.element === document.querySelector(item.element)
                ? "item.element"
                : "Vazio"}
            </h3>
            <button onClick={() => removerItem(index)}>Deletar</button>
            <br />
            <br />
          </div>
        ))}
      </div>
      <h3>Adicionar Novo Item:</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          adicionarItem();
        }}
      >
        <label>
          Título:
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
        </label>
        <br />
        <label>
          Element Selector:
          <input
            type="text"
            value={newItem.element}
            onChange={(e) =>
              setNewItem({ ...newItem, element: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Introdução:
          <input
            type="text"
            value={newItem.intro}
            onChange={(e) => setNewItem({ ...newItem, intro: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Adicionar Item</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default IntroComponent;
