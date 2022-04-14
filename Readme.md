<h1 align="center">
   ✨ Svete Star Rating ✨
</h1>

<div align="center">
  <a href="#-Projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Instalacao">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Use">Use</a>&nbsp;&nbsp;&nbsp;
</div>

<p align="center">
  <p align="center">
  <img alt="preview star rating" src="https://raw.githubusercontent.com/ErnaneJ/svelte-star-rating/master/.github/preview.png" width="90%">
</p>

## 💻 Projeto

Simples componente Svelte, sem dependências, para implementação e captura de avaliações por meio de uma interface simples e intuitiva que te levará às etrelas.

[Veja essa demonstração! ](https://svelte.dev/repl/672b083a2ce346a6aae6f07d9e3787f4?version=3.47.0)

## 📦 Instalação

  ```bash
  $ npm install @ernane/svelte-star-rating # => or yarn
  ```

⚠️ se estiver utilizando [SvelteKit](https://kit.svelte.dev/) ou [Sapper](https://sapper.svelte.dev/), é aconselhado instalar como uma dependência de desenvolvimento:

  ```bash
  $ npm install @ernane/svelte-star-rating --save-dev # => or yarn
  ```

### 📁 Features

Este pacote exporta um componente svelte que pode, ou não, receber um objeto de configuração com os seguintes atributos.

- ⚙️ Configurações Gerais

| atributo  | tipo de dado | requerido | valor padrão |
|:---------:|:------------:|:---------:|:------------:|
| readOnly  |   `bool`     |    não    |     false    |
| countStars|   `integer`  |    não    |     5        |
| score     |   `float`    |    não    |     0.0      |
| showScore |   `bool`     |    não    |     true     |

Além disso, temos outros dois atributos aninhados que especificam configurações distintas.

- 📏 Range
  
|  atributo  | tipo de dado | requerido | valor padrão |
|:----------:|:------------:|:---------:|:------------:|
|     min    |   `integer`  |    não    |      0       |
|     max    |   `integer`  |    não    |      5       |
|    step    |    `float`   |    não    |    0.001     |

- ⭐ Star Config:

|   atributo  | tipo de dado | requerido | valor padrão |
|:-----------:|:------------:|:---------:|:------------:|
| size        |   `integer`  |    não    |      30      |
| fillColor   |   `String`   |    não    |    #F9ED4F   |
| strokeColor |   `String`   |    não    |    #BB8511   | 

Ao final, o objeto de configuração será semelhante ao mostrado abaixo.

```js
const config = {
  readOnly: false,
  countStars: 5,
  range: {
    min: 0, 
    max: 5, 
    step: 0.001
  },
  score: 0.0,
  showScore: true,
  starConfig: {
    size: 30,
    fillColor: '#F9ED4F',
    strokeColor: "#BB8511"
  }
}
```

## 💡 Use

- Importe o componente

  ```js
  import StarRatting from "@ernane/svelte-star-rating";
  ```

- Crie o objeto de configuração

  ```js
  const config = { ... }
  ```
  <small>**Como mostrado na seção anterior</small>

- Por fim, utilize-o!

  ```js
  <StarRatting {config}/>
  ```


_Se você desejar implementar ou melhorar alguma feature fique à vontade para enviar uma solicitacao de pull. Adorarei receber!_

---

<div align="center">
  Desenvolvido com ❤ por <a target="_blank" href="https://www.ernane.dev/">Ernane Ferreira</a>. 👋🏻
</div>
