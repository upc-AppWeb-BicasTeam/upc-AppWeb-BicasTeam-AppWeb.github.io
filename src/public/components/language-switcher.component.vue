<script>
import i18n from "../../i18n.js";

export default {
  name: "language-switcher",
  computed: {
    i18n() {
      return i18n
    }
  },
  data(){
    return {
      languages: ['en', 'es'],
      language: 'en'
    }
  },
  watch: {
    'language': function(newVal) {
      this.i18n.locale = newVal;
    }
  }
}
</script>

<template>
  <pv-select-button v-model="language" :options="languages" class="bg-primary uppercase"/>
</template>