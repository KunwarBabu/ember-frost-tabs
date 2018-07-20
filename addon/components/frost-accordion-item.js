import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'

import layout from '../templates/components/frost-accordion-item'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  classNames: ['frost-accordion-item'],
  classNameBindings: ['isExpanded:active'],
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

  item: null,
  activeItem: null,
  hook: 'frost-accordion-item',

  @readOnly
  @computed('activeItem', 'item')
  isExpanded (activeItem, item) {
    return this.get('activeItem') === this.get('item')
  },

  @readOnly
  @computed('activeItem', 'item')
  active (activeItem, item) {
    if (this.get('activeItem') === this.get('item')) {
      return 'active-item'
    } else {
      return ''
    }
  }
})
