import Ember from 'ember'
const {A, Controller, Logger, get, isEmpty, run} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Controller.extend({

  // API driven

  apiTabs: [
    {
      id: 'AIS profile',
      label: 'AIS profile',
      value: 'A aardvark',
      description: 'L2 tabs',
      isClosable: true,
      icon: {
        name: 'email',
        pack: 'frost'
      },
      actions: [
        {
          action: {
            type: 'form',
            endpoint: 'foo/api/v1/bar'
          },
          icon: {
            name: 'add',
            pack: 'frost'
          },
          label: 'Add',
          isVisible: true,
          disabled: false
        },
        {
          action: {
            type: 'export',
            endpoint: 'biz/api/v1/baz'
          },
          icon: {
            name: 'export',
            pack: 'frost'
          },
          label: 'Export',
          isVisible: true,
          disabled: false
        }
      ],
      subtabs: [
        {
          id: 'doc',
          template: 'frost-object-browser-wrapper-with-list-table',
          label: 'Domain optical controller'
        },
        {
          id: 'splis',
          template: 'frost-object-browser-wrapper-with-table',
          label: 'SPLI'
        },
        {
          id: 'ots',
          template: 'frost-object-browser-wrapper-with-table',
          label: 'OTS'
        },
        {
          id: 'tidseq',
          template: 'frost-object-browser-wrapper-with-table',
          label: 'TID sequence'
        }
      ]
    },
    {
      id: 'BFD profile',
      label: 'BFD profile',
      value: 'B bear',
      isClosable: true,
      icon: {
        name: 'email',
        pack: 'frost'
      },
      subtabs: [
        {
          id: 'nodesettings',
          template: 'frost-object-browser-wrapper-with-list-table',
          label: 'Node settings'
        },
        {
          id: 'tod',
          template: 'frost-object-browser-wrapper-with-list-table',
          label: 'Time of day'
        }
      ]
    },
    {id: 'Channels', label: 'Channels', value: 'C chipmunk', icon: {name: 'email', pack: 'frost'}},
    {
      id: 'Differential provisioning',
      label: 'Differential provisioning',
      value: 'D draft',
      icon: {name: 'email', pack: 'frost'}
    },
    {
      id: 'External alarms',
      label: 'External alarms provisioning',
      value: 'E ears',
      icon: {name: 'email', pack: 'frost'}
    },
    {id: 'External controls', label: 'External controls', value: 'F funky', icon: {name: 'email', pack: 'frost'}},
    {id: 'GMPLS TP tunnel', label: 'GMPLS TP tunnel', value: 'F funky', icon: {name: 'email', pack: 'frost'}},
    {id: 'Media channels', label: 'Media channels', value: 'F funky', icon: {name: 'email', pack: 'frost'}}
  ],

  @readOnly
  @computed('selectedTab')
  tabContent (selectedTab) {
    const tab = A(this.get('apiTabs')).findBy('label', selectedTab)
    return tab ? get(tab, 'value') : selectedTab
  },

  @readOnly
  @computed('selectedTab')
  tabActions (selectedTab) {
    const tab = A(this.get('apiTabs')).findBy('label', selectedTab)
    return tab ? get(tab, 'actions') : []
  },

  // State management

  tabs: A([
    'View',
    'Attributes',
    'Footab',
    'Bartab',
    'Biztab'
  ]),
  selectedTab: null,
  previousSelectedTab: null,
  selectedSubTab: null,
  subtabs: [
    {
      'tab': 'View',
      'content': [
        'ViewSubTab1',
        'ViewSubTab2'
      ]
    }
  ],
  queryParams: ['selectedTab', 'selectedSubTab'],

  @readOnly
  @computed('subtabs', 'selectedTab')
  viewSubtabs: function (subtabs, selectedTab) {
    if (isEmpty(A(subtabs).findBy('tab', selectedTab))) {
      return []
    }
    return A(subtabs).findBy('tab', selectedTab).content
  },

  _selectTab (tab) {
    this.get('tabs').addObject(tab)
    if (this.get('selectedTab') !== tab) {
      this.set('previousSelectedTab', this.get('selectedTab'))
      this.set('selectedTab', tab)
    } else if (tab !== 'more') {
      this.set('selectedTab', tab)
    } else {
      if (isEmpty(this.get('previousSelectedTab'))) {
        this.set('selectedTab', 'View')
      } else {
        this.set('selectedTab', this.get('previousSelectedTab'))
      }
      this.set('previousSelectedTab', null)
    }
  },
  _selectSubtab (tab) {
    this.set('selectedSubtab', tab)
  },

  actions: {
    dispatch (action) {
      const {type} = action
      switch (type) {
        default:
          Logger.warn(`Unknown action type dispatched: ${type}`)
      }
    },
    onSelect (tab) {
      run.schedule('sync', this, this._selectTab.bind(this, tab))
    },
    onSubtabSelect (subtab) {
      run.schedule('sync', this, this._selectSubtab.bind(this, subtab))
    }
  }
})
