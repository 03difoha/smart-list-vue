<template>
  <div id="app">
    <vue-headful title="Smart List" />

    <p class="title is-1">Smart Shopping List</p>
    <div class="columns">
      <div class="column">
        <div class="notification">
          <p class="title is-4">What is this?</p>
          <p style="text-align:left;">This 'smart' shopping list app takes URL's from recipe websites and generates shopping lists from them.
            No more adding up grams or numbers of onions as this app will do it intelligently for you and aggregate
            all your submitted recipes into one easy to read shopping list.</p>
        </div>

      </div>
      <div class="column">
        <div class="notification">
          <p class="title is-4">Supported Sites:</p>

          <ul
            v-for="site in sites"
            :key="site.url"
          >
            <li>
              <a
                :href="site.url"
                target="_blank"
              >{{site.text}}</a>
            </li>

          </ul>
        </div>
      </div>
    </div>

    <div>
      <b-field
        :type="this.inputType"
        :message="this.inputMessage"
      >
        <b-input
          ref="urlInput"
          v-model="URLstring"
          placeholder="Enter a recipe URL"
          size="is-large"
          rounded
          :loading="loading"
        >
        </b-input>
      </b-field>
      <b-button
        v-on:click="getIngredients"
        type="is-primary"
      >Add recipe ingredients to list</b-button>

      <ingredientsTable
        :ingredients-data="Object.values(ingredientsData)"
        :loading="this.loading"
      ></ingredientsTable>
    </div>

    <footer class="footer">
      <div>
        <p>
          <strong>Smart List</strong> by <a href="https://03difoha.github.io/">Harry Difolco.</a> This web application
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>

  </div>
</template>

<script>
import ingredientsTable from './components/IngredientTable'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    ingredientsTable
  },
  data () {
    return {
      ingredientsData: {},
      listedIngredients: [],
      URLstring: null,
      inputMessage: '',
      inputType: '',
      loading: false,
      sites: [
        { text: 'BBC Goodfood', url: 'https://www.bbcgoodfood.com/recipes' },
        { text: 'Jamie Oliver', url: 'https://www.jamieoliver.com/recipes/' },
        { text: 'Food Network', url: 'https://www.foodnetwork.com/recipes' },
        { text: 'Cookie and Kate', url: 'https://cookieandkate.com/recipes/' }
      ],
      api_url: ''
    }
  },
  methods: {
    getIngredients: function () {
      this.loading = true
      this.inputType = ''
      this.inputMessage = ''
      axios
        .post(process.env.ROOT_API, {
          url: this.URLstring
        })

        .then(response => {
          this.processNew(response.data)
          this.inputMessage = 'Ingredients added'
          this.inputType = 'is-success'
          this.loading = false
        })
        .catch(error => {
          this.inputMessage = error.response.data.error.message
          this.inputType = 'is-danger'
          this.loading = false
        })
    },
    processNew: function (data) {
      for (var i of Object.keys(data)) {
        if (!this.ingredientsData[i]) {
          this.ingredientsData[i] = data[i]
        } else {
          this.ingredientsData[i].quantity = this.ingredientsData[i].quantity + data[i].quantity
        }
      }
    }
  },
  mounted: function () {
    this.$refs.urlInput.$el.focus()
  }

}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 1em;
}

.content {
  width: 70%;
}
</style>
