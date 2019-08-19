import Vue from 'vue'

export default ({ app }, inject) => {
  // bus
  inject('bus', new Vue())
}
