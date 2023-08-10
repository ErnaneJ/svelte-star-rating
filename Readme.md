<h1 align="center">
   ✨ Svelte Star Rating ✨
</h1>

<div align="center">
  <a href="#-Project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Use">Use</a>&nbsp;&nbsp;&nbsp;
</div>

<p align="center">
  <p align="center">
  <img alt="preview star rating" src="https://raw.githubusercontent.com/ErnaneJ/svelte-star-rating/master/.github/preview.png" width="50%">
</p>

## 💻 Project

Simple Svelte component, with no dependencies, for implementing and capturing assessments through a simple and intuitive interface that will take you to the stars.

[See this demo!! ](https://svelte.dev/repl/672b083a2ce346a6aae6f07d9e3787f4?version=3.47.0)

## 📦 Installation

  ```bash
  $ npm install @ernane/svelte-star-rating # => or yarn
  ```

⚠️ if using [SvelteKit](https://kit.svelte.dev/) or [Sapper](https://sapper.svelte.dev/), it is advised to install as a development dependency:

  ```bash
  $ npm install @ernane/svelte-star-rating --save-dev # => or yarn
  ```

### 📁 Features

This package will add a svelte component that may or may not receive a configuration object with the following attributes shown below.

- ⚙️ General Settings

| Attribute  |   Data Type  | Required    |    Default   |
|:----------:|:------------:|:-----------:|:------------:|
| readOnly   |   `bool`     |    false    |     false    |
| countStars |   `integer`  |    false    |     5        |
| score      |   `float`    |    false    |     0.0      |
| showScore  |   `bool`     |    false    |     true     |
| scoreFormat|   `function` |    false    |    precent   |
| name       |   `String`   |    false    |     ""     | 


In addition, we have two other nested attributes that specify distinct settings.

- 📏 Range
  
| Attribute  |   Data Type  | Required  |    Default   |
|:----------:|:------------:|:---------:|:------------:|
|     min    |   `integer`  |    false    |      0       |
|     max    |   `integer`  |    false    |      5       |
|    step    |    `float`   |    false    |    0.001     |

- ⭐ Setting of the Stars:

|      Attribute      |   Data Type  |  Required   |    Default   |
|:-------------------:|:------------:|:-----------:|:------------:|
| size                |   `integer`  |    false    |      30      |
| fillColor           |   `String`   |    false    |    #F9ED4F   |
| strokeColor         |   `String`   |    false    |    #BB8511   | 
| unfilledColor       |   `String`   |    false    |     #FFF     | 
| strokeUnfilledColor |   `String`   |    false    |     #000     | 

In the end, the configuration object will be similar to the one shown below.

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
  scoreFormat: function(){ return `(${this.score.toFixed(0)}/${this.countStars})` },
  name: "",
  starConfig: {
    size: 30,
    fillColor: '#F9ED4F',
    strokeColor: "#BB8511",
    unfilledColor: '#FFF',
    strokeUnfilledColor: '#000'
  }
}
```

- 🎯 Events

In addition, it is also possible to observe events of the component itself that will be executed in an internal element from a defined action. Below are the available events.

|         Type        |       Target      |  Required   |    Default   |
|:-------------------:|:-----------------:|:-----------:|:------------:|
|       change        |   `input.slider`  |    false    |      null    |

## 💡 Use

- Import the component

  ```js
  import StarRating from "@ernane/svelte-star-rating";
  ```

- Create the configuration object

  ```js
  const config = { ... }
  ```
  <small>**As shown in the previous section</small>

- Finally, use it! 🎉

  ```js
  <StarRating {config}/>
  ```

_If you would like to implement or improve any feature feel free to submit a pull request. I would love to receive!_

---

<div align="center">
  Developed with ❤ by <a target="_blank" href="https://links.ernane.dev/">Ernane Ferreira</a>. 👋🏻
</div>
