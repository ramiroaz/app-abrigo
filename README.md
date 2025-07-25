# 🐾 APP Abrigo - Spring Boot Backend

Sistema REST para gerenciamento de abrigo de animais, construído com Java 17 e Spring Boot, estruturado no padrão MVC com DTOs, JPA, banco em memória H2.

---

## 🎯 Objetivos

- Cadastro e consulta de animais, espécies, raças e funcionários
- Relatórios por espécie, funcionário, e animais disponíveis para adoção
- Base para integração com frontend em React

---

## 🗂️ Estrutura

abrigo-api/
 ├── pom.xml
 └── src/
  ├── main/
  │ ├── java/com/abrigodeanimais/
  │ │ ├── model/
  │ │ ├── dto/
  │ │ ├── repository/
  │ │ ├── service/
  │ │ └── controller/
  │ └── resources/
  │ ├── application.properties
  │ ├── schema.sql
  │ └── data.sql


---

## 🔧 Tecnologias

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Banco de dados H2
- JUnit 5
- Maven

---

## 🧪 Como rodar

```bash
./mvnw spring-boot:run
```

Acesse:

API: http://localhost:8080
H2 Console: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:abrigodb
User: sa / Senha: (em branco)

📊 Endpoints principais

Verbo	Caminho	        Descrição
-----   -------         ---------
GET	    /animais	                    Lista todos os animais
GET	    /animais/disponiveis	        Animais para adoção
GET	    /animais/por-especie/{id}	    Animais por espécie
GET	    /animais/por-funcionario/{id}	Animais por funcionário
POST	/animais	                    Cadastra novo animal
DELETE	/animais/{id}	                Remove animal pelo ID

📚 Melhorias futuras
* Validação com Bean Validation
* Autenticação (JWT ou Basic Auth)
* Exportação de relatórios
* Deploy com Docker


---

## 🧠 Novo Endpoint: Consulta Complexa JPQL

### 🔎 Objetivo  
Buscar animais que:

- Tenham determinadas palavras nas características ou doenças
- Estejam disponíveis para adoção

### 📄 Em `AnimalRepository.java`:

```java
@Query("SELECT a FROM Animal a " +
       "WHERE a.disponivelParaAdocao = TRUE AND " +
       "(LOWER(a.caracteristicas) LIKE LOWER(CONCAT('%', :termo, '%')) " +
       "OR LOWER(a.doencas) LIKE LOWER(CONCAT('%', :termo, '%')))")
List<Animal> buscarAnimaisPorCaracteristicaOuDoenca(@Param("termo") String termo);
```

📄 Em AnimalService.java:
```java
public List<AnimalDTO> buscarPorTermo(String termo) {
    return animalRepo.buscarAnimaisPorCaracteristicaOuDoenca(termo)
            .stream().map(this::toDTO).collect(Collectors.toList());
}
```

📄 Em AnimalController.java:
```java
@GetMapping("/buscar-por-termo")
public List<AnimalDTO> buscarPorTermo(@RequestParam String termo) {
    return service.buscarPorTermo(termo);
}
```

➡ Exemplo de chamada: GET /animais/buscar-por-termo?termo=asma

🧪 Testes com JUnit — AnimalServiceTest.java

📁 Local: src/test/java/com/abrigodeanimais/service


*****************************************

# 🐶 Abrigo de Animais - Frontend

Este é o frontend do sistema de gerenciamento de abrigo de animais, desenvolvido com React 18. Ele se conecta ao backend Spring Boot e permite ao usuário:

- Visualizar, cadastrar e excluir animais
- Listar raças, espécies e funcionários
- Visualizar relatórios de animais por espécie e por funcionário
- Interagir com a API REST hospedada no backend (`localhost:8080`)

---

## 🚀 Tecnologias

- React 18 (create-react-app)
- React Router DOM
- Axios (consumo da API)
- React Icons (ícones)
- React Toastify (notificações)
- CSS puro ou módulos CSS

---

## 📂 Estrutura de pastas

abrigo-frontend/
 ├── public/
 │ └── index.html
 ├── src/ 
 │ ├── assets/ # Imagens, logos, estilos globais 
 │ │ └── logo.png 
 │ ├── components/ # Componentes reutilizáveis 
 │ │ ├── Navbar.jsx 
 │ │ └── CardAnimal.jsx 
 │ ├── pages/ # Telas principais 
 │ │ ├── Home.jsx 
 │ │ ├── Animais.jsx 
 │ │ ├── Funcionarios.jsx 
 │ │ ├── Especies.jsx 
 │ │ └── Relatorios.jsx 
 │ ├── services/ # Serviços de comunicação com a API 
 │ │ └── animalService.js 
 │ ├── App.jsx # Componente principal 
 │ ├── index.js # Ponto de entrada 
 │ └── App.css # Estilos globais 
 ├── .gitignore 
 ├── package.json 
 └── README.md


---

## 📦 Instalação e execução

### 1. Clonar o repositório

```bash
git clone https://github.com/ramiroaz/abrigo-frontend.git
cd abrigo-frontend
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar localmente
```bash
npm start
```

### 🚀 Frontend disponível em: http://localhost:3000 

### 🧪 Scripts úteis
```bash
npm run build       # build de produção
npm test            # testes (se configurado)
```

---

## 🛠️ Comandos para criar o projeto com React 18 do zero

```bash
npx create-react-app abrigo-frontend
cd abrigo-frontend
```

## Instalar dependências adicionais
```bash
npm install axios react-router-dom react-icons react-toastify
```

## 💡 Por padrão, o create-react-app usa React 18. Mas se quiser garantir:
```bash
npm install react@18 react-dom@18
```

## 🔔 Toasts com react-toastify
```bash
npm install react-toastify
```

## 🔔 ícones visuais
```bash
npm install react-icons
```

