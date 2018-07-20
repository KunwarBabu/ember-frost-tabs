import {Component} from 'ember-frost-core'
import layout from '../templates/components/frost-accordion-list'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  classNames: ['frost-accordion-list'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    onSelect: PropTypes.func.isRequired,
    // State
    _filter: PropTypes.string
  },

  getDefaultProps () {
    return {
      // State defaults
      _filter: ''
    }
  },

  items: null,
  activeItem: null,
  hook: 'frost-accordion-list',

  actions: {
    toggleActiveItem (item) {
      if (this.get('activeItem') !== item) {
        this.set('activeItem', item)
      } else {
        this.set('activeItem', null)
      }
    }
  }
})
