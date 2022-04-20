console.log("** DINDIN ACADEMY **");
const BASE_URL = "http://localhost:4000";
// comentários
// lista de teste
let cursos = [
  {
    id: 1,
    titulo: "Investimentos para Iniciantes",
    descricao:
      "Esse curso é para quem não manja de investimento mas quer ficar rico",
    professor: "Jane Doe",
  },
  {
    id: 2,
    titulo: "Renda Extra",
    descricao: "Renda extra sem sair de casa",
    professor: "Seu Madruga",
  },
];

async function listarCursos() {
  try {
    const requestConfig = {
      method: "GET",
    };
    const response = await fetch(`${BASE_URL}/cursos`, requestConfig);
    const cursos = await response.json();
    let htmlCursos = "";
    //criando lista de cursos em HTML
    for (let index = 0; index < cursos.length; index++) {
      // = atribuir novo valor
      // += acrescentar novo valor
      htmlCursos += `
              <article class="card">
                  <h2>${cursos[index].titulo}</h2>
                  <p>${cursos[index].descricao}</p>
                  <p>Professor: ${cursos[index].professor}</p>
                  <button class="delete-curso" curso-id=${cursos[index].id}> Deletar Curso </button>
              </article>
          `;
    }

    // selecionando elemento que vai englobar a lista
    let painelCursos = document.querySelector(".painel-cursos");
    // inserindo lista de cursos no html
    painelCursos.innerHTML = htmlCursos;

    adicionarEventoDeDelete();
  } catch (error) {
    console.log(error);
    alert("Error ao tentar listar os cursos");
  }
}

// cadastro de curso
let btnEnviar = document.querySelector("#btnEnviar");

btnEnviar.onclick = async function (evento) {
  try {
    // prevenindo comportamento padrão
    evento.preventDefault();

    // capturar campos do formulário
    let titulo_input = document.querySelector("#titulo");
    let descricao_input = document.querySelector("#descricao");
    let professor_input = document.querySelector("#professor");

    //criando o novo curso a partir dos dados do form
    let novoCurso = {
      titulo: titulo_input.value,
      descricao: descricao_input.value,
      professor: professor_input.value,
      listaAulas: [],
    };

    const requestConfig = {
      method: "POST",
      body: JSON.stringify(novoCurso),
    };
    const response = await fetch(`${BASE_URL}/cursos`, requestConfig);
    const cursos = await response.json();
  } catch (error) {
    console.log(error);
    alert("Error ao tentar cadastrar um cursos");
  }

  listarCursos();
};

function adicionarEventoDeDelete() {
  let btnsDelete = document.querySelectorAll(".delete-curso");

  btnsDelete.forEach((btn) => {
    btn.onclick = async function (evento) {
      try {
        // prevenindo comportamento padrão
        evento.preventDefault();
        const cursoId = btn.getAttribute("curso-id");
        const requestConfig = {
          method: "DELETE",
        };
        const response = await fetch(
          `${BASE_URL}/cursos/${cursoId}}`,
          requestConfig
        );
        if (response.status !== 201) {
          return alert("Deu erro ao deletar");
        }

        return alert("Deletado com sucesso!");
      } catch (error) {
        console.log(error);
        alert("Error ao tentar deletar um cursos");
      }

      listarCursos();
    };
  });
}

listarCursos();
