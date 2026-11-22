/**
 * App.
 *
 * Builds the DSM app the way Synology builds Log Center: a PageListAppWindow
 * with a page list on the left and one class per page. Helpers stay inside this
 * function so nothing leaks into the global scope DSM shares between packages.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
(function registerApp() {
  /**
   * App - Namespace.
   *
   * Prefixes every class this file registers with Ext.define.
   * DSM looks the classes up by these names from src/ui/config.
   *
   * @since UNRELEASED
   */
  const namespace = 'SYNO.SDS.[__WORKSPACE_IDENTIFIER__]';

  /**
   * App - Status URL.
   *
   * Points at the CGI that returns the example service state.
   * Add a .cgi file next to it for each request your own pages make.
   *
   * @since UNRELEASED
   */
  const statusUrl = '/webman/3rdparty/[__WORKSPACE_PACKAGE_NAME__]/status.cgi';

  /**
   * App - Text.
   *
   * Reads one string from src/ui/texts/<language>/strings. DSM picks the
   * language from the signed-in user's settings.
   *
   * @param {string} section - Section.
   * @param {string} key     - Key.
   *
   * @returns {string}
   *
   * @since UNRELEASED
   */
  function text(section, key) {
    return _TT(`${namespace}.Instance`, section, key);
  }

  /**
   * App - Show Toast.
   *
   * Shows DSM's toast message over the app window.
   * It closes itself after a few seconds.
   *
   * @param {object} owner   - Owner.
   * @param {string} message - Message.
   *
   * @returns {object}
   *
   * @since UNRELEASED
   */
  function showToast(owner, message) {
    return new SYNO.SDS.ToastBox({
      owner,
      text: message,
    });
  }

  /**
   * App - Instance Definition.
   *
   * Registers the app the DSM main menu launches.
   * DSM opens the window class named by appWindowName.
   *
   * @since UNRELEASED
   */
  const instanceDefinition = {
    extend: 'SYNO.SDS.AppInstance',
    appWindowName: `${namespace}.MainWindow`,
  };

  /**
   * App - Main Window Definition.
   *
   * Lists the pages on the left. DSM creates a page the first time it is
   * selected and calls its onPageActivate and onPageDeactivate hooks.
   *
   * @since UNRELEASED
   */
  const mainWindowDefinition = {
    extend: 'SYNO.SDS.PageListAppWindow',
    activePage: `${namespace}.OverviewPage`,

    /**
     * App - Main Window Definition - Constructor.
     *
     * Each listItems fn names a page class below; the size matches Log Center.
     * icon-overview comes from DSM; style.css points the other page icons at
     * Synology's own 22px sprites from Resource Monitor and Log Center.
     *
     * @param {object} config - Config.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    constructor: function constructor(config) {
      this.callParent([Ext.apply({
        title: text('app', 'displayname'),
        cls: 'syno-app-[__WORKSPACE_PACKAGE_NAME__]',
        width: 1070,
        height: 580,
        minWidth: 1070,
        minHeight: 580,
        listItems: [
          {
            text: text('nav', 'overview'),
            iconCls: 'icon-overview',
            fn: `${namespace}.OverviewPage`,
          },
          {
            text: text('nav', 'service'),
            iconCls: 'icon-service',
            fn: `${namespace}.ServicePage`,
          },
          {
            text: text('nav', 'settings'),
            iconCls: 'icon-settings',
            fn: `${namespace}.SettingsPage`,
          },
          {
            text: text('nav', 'records'),
            iconCls: 'icon-records',
            fn: `${namespace}.RecordsPage`,
          },
        ],
      }, config)]);

      return;
    },
  };

  /**
   * App - Overview Page Definition.
   *
   * Explains what the starter includes and where each piece lives, using the
   * fieldsets and display fields Synology's own settings pages use.
   *
   * @since UNRELEASED
   */
  const overviewPageDefinition = {
    extend: 'SYNO.ux.FormPanel',

    /**
     * App - Overview Page Definition - Constructor.
     *
     * Each row pairs a label with the file that implements it. Edit the strings
     * file to describe your own package.
     *
     * @param {object} config - Config.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    constructor: function constructor(config) {
      const pieces = [
        'service',
        'wizards',
        'privilege',
        'window',
        'backend',
      ];
      const paragraphs = [
        'step_service',
        'step_pages',
        'step_text',
        'step_backend',
        'tip',
      ];

      this.callParent([Ext.apply({
        border: false,
        autoScroll: true,
        labelWidth: 200,
        items: [
          {
            xtype: 'syno_fieldset',
            title: text('overview', 'includes_title'),
            items: pieces.map(function includeRow(piece) {
              return {
                xtype: 'syno_displayfield',
                fieldLabel: text('overview', `${piece}_label`),
                value: text('overview', `${piece}_value`),
              };
            }),
          },
          {
            xtype: 'syno_fieldset',
            title: text('overview', 'customize_title'),
            items: paragraphs.map(function paragraphRow(paragraph) {
              return {
                xtype: 'syno_displayfield',
                hideLabel: true,
                value: text('overview', paragraph),
              };
            }),
          },
        ],
      }, config)]);

      return;
    },
  };

  /**
   * App - Service Page Definition.
   *
   * Shows the live service state from status.cgi with a Refresh button in the
   * page toolbar, and polls only while the page is visible.
   *
   * @since UNRELEASED
   */
  const servicePageDefinition = {
    extend: 'SYNO.ux.FormPanel',

    /**
     * App - Service Page Definition - Constructor.
     *
     * Builds the toolbar and the read-only status rows.
     * The refresh task starts in onPageActivate.
     *
     * @param {object} config - Config.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    constructor: function constructor(config) {
      const rows = [
        'greeting',
        'state',
        'process',
        'started',
      ];

      this.callParent([Ext.apply({
        border: false,
        labelWidth: 200,
        tbar: [{
          xtype: 'syno_button',
          text: text('service', 'refresh'),
          scope: this,
          handler: this.refresh,
        }],
        items: [{
          xtype: 'syno_fieldset',
          title: text('service', 'section'),
          items: rows.map(function statusRow(row) {
            return {
              xtype: 'syno_displayfield',
              fieldLabel: text('service', row),
              name: row,
              value: '-',
              htmlEncode: row !== 'state',
            };
          }),
        }],
      }, config)]);

      this.refreshTask = {
        run: this.refresh,
        interval: 5000,
        scope: this,
      };

      this.on('destroy', this.onPageDeactivate, this);

      return;
    },

    /**
     * App - Service Page Definition - On Page Activate.
     *
     * DSM calls this each time the page is shown.
     * Ext.TaskMgr runs the first request right away.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    onPageActivate: function onPageActivate() {
      Ext.TaskMgr.start(this.refreshTask);

      return;
    },

    /**
     * App - Service Page Definition - On Page Deactivate.
     *
     * DSM calls this before another page is shown.
     * Returning true lets the switch go ahead.
     *
     * @returns {boolean}
     *
     * @since UNRELEASED
     */
    onPageDeactivate: function onPageDeactivate() {
      Ext.TaskMgr.stop(this.refreshTask);

      return true;
    },

    /**
     * App - Service Page Definition - Refresh.
     *
     * Asks status.cgi for the state that start-stop-status writes. DSM sends
     * the signed-in session's cookie with the request.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    refresh: function refresh() {
      Ext.Ajax.request({
        url: statusUrl,
        method: 'GET',
        disableCaching: true,
        scope: this,
        success: function success(response) {
          this.showStatus(Ext.decode(response.responseText));

          return;
        },
        failure: function failure() {
          this.showStatus(null);

          return;
        },
      });

      return;
    },

    /**
     * App - Service Page Definition - Show Status.
     *
     * Writes one status reply into the rows. The state uses DSM's own
     * green-status and red-status classes, as Control Panel does; a failed
     * request shows the service as unavailable.
     *
     * @param {object|null} status - Status.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    showStatus: function showStatus(status) {
      const form = this.getForm();
      const running = status !== null && status.state === 'running';
      let stateText = text('service', 'unavailable');

      if (status !== null) {
        stateText = (running === true) ? text('service', 'running') : text('service', 'stopped');
      }

      form.findField('greeting').setValue((status === null) ? '-' : status.greeting);

      form.findField('state').setValue(String.format('<span class="{0}">{1}</span>', (running === true) ? 'green-status' : 'red-status', stateText));

      form.findField('process').setValue((running === true) ? String(status.pid) : '-');

      form.findField('started').setValue((running === true) ? status.started : '-');

      return;
    },
  };

  /**
   * App - Settings Page Definition.
   *
   * A settings form with DSM's Reset and Apply bar (useDefaultBtn). DSM
   * validates the form, warns before leaving with unsaved changes, and reports
   * in the status bar. Replace applyHandler to save through your own CGI.
   *
   * @since UNRELEASED
   */
  const settingsPageDefinition = {
    extend: 'SYNO.SDS.Utils.FormPanel',

    /**
     * App - Settings Page Definition - Constructor.
     *
     * Shows one of each DSM form field. The schedule fields follow the
     * "Run on a schedule" checkbox through SYNO.ux.Utils.EnableCheckGroup.
     *
     * @param {object} config - Config.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    constructor: function constructor(config) {
      this.callParent([Ext.apply({
        border: false,
        autoScroll: true,
        labelWidth: 200,
        useDefaultBtn: true,
        items: [
          {
            xtype: 'syno_fieldset',
            title: text('settings', 'general_section'),
            items: [
              {
                xtype: 'syno_displayfield',
                hideLabel: true,
                value: text('settings', 'example_note'),
              },
              {
                xtype: 'syno_textfield',
                fieldLabel: text('settings', 'name'),
                name: 'display_name',
                width: 200,
                value: text('app', 'displayname'),
                allowBlank: false,
                minLength: 3,
                maxLength: 32,
              },
              {
                xtype: 'syno_passwordfield',
                fieldLabel: text('settings', 'password'),
                name: 'password',
                width: 200,
                updateWhenRender: false,
                listeners: {
                  afterrender: function hideStrength() {
                    this.hidePasswordStrength();

                    return;
                  },
                  password_strength_get: function showStrength() {
                    this.showPasswordStrength();

                    return;
                  },
                },
              },
              {
                xtype: 'syno_numberfield',
                fieldLabel: text('settings', 'port'),
                name: 'port',
                width: 60,
                value: 8080,
                allowBlank: false,
                allowDecimals: false,
                minValue: 1024,
                maxValue: 65535,
              },
              {
                xtype: 'syno_combobox',
                fieldLabel: text('settings', 'mode'),
                hiddenName: 'mode',
                width: 200,
                mode: 'local',
                editable: false,
                triggerAction: 'all',
                displayField: 'display',
                valueField: 'value',
                value: 'standard',
                store: new Ext.data.ArrayStore({
                  fields: [
                    'value',
                    'display',
                  ],
                  data: [
                    [
                      'basic',
                      text('settings', 'mode_basic'),
                    ],
                    [
                      'standard',
                      text('settings', 'mode_standard'),
                    ],
                    [
                      'advanced',
                      text('settings', 'mode_advanced'),
                    ],
                  ],
                }),
              },
              {
                xtype: 'syno_datefield',
                fieldLabel: text('settings', 'start_date'),
                name: 'start_date',
                width: 200,
                editable: false,
                value: new Date(),
              },
            ],
          },
          {
            xtype: 'syno_fieldset',
            title: text('settings', 'schedule_section'),
            items: [
              {
                xtype: 'syno_checkbox',
                name: 'enable_schedule',
                boxLabel: text('settings', 'enable_schedule'),
                checked: true,
              },
              {
                xtype: 'syno_radio',
                name: 'frequency',
                inputValue: 'daily',
                boxLabel: text('settings', 'frequency_daily'),
                indent: 1,
                checked: true,
              },
              {
                xtype: 'syno_radio',
                name: 'frequency',
                inputValue: 'weekly',
                boxLabel: text('settings', 'frequency_weekly'),
                indent: 1,
              },
              {
                xtype: 'syno_radio',
                name: 'frequency',
                inputValue: 'monthly',
                boxLabel: text('settings', 'frequency_monthly'),
                indent: 1,
              },
              {
                xtype: 'syno_sliderfield',
                fieldLabel: text('settings', 'quality'),
                name: 'quality',
                width: 200,
                minValue: 0,
                maxValue: 10,
                increment: 1,
                value: 7,
                useTips: false,
                hasCalibration: true,
              },
              {
                xtype: 'syno_superboxselect',
                fieldLabel: text('settings', 'tags'),
                name: 'tags',
                width: 200,
                mode: 'local',
                displayField: 'tag',
                valueField: 'tag',
                value: 'Photos',
                store: new Ext.data.ArrayStore({
                  fields: ['tag'],
                  data: [
                    ['Photos'],
                    ['Music'],
                    ['Documents'],
                    ['Backups'],
                  ],
                }),
              },
            ],
          },
        ],
      }, config)]);

      this.on('afterlayout', function linkSchedule() {
        this.scheduleGroup = new SYNO.ux.Utils.EnableCheckGroup(this.getForm(), 'enable_schedule', [
          'frequency',
          'quality',
          'tags',
        ]);

        return;
      }, this, { single: true });

      return;
    },

    /**
     * App - Settings Page Definition - Apply Handler.
     *
     * DSM's Apply button calls this. onBeforeAction rejects an unchanged or
     * invalid form with a status-bar message. Send the values to your own CGI
     * here; the example only marks them as applied.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    applyHandler: function applyHandler() {
      const form = this.getForm();

      if (this.onBeforeAction(form, 'set') === false) {
        return;
      }

      this.setStatusBusy();

      Ext.defer(function finishApply() {
        form.setValues(form.getValues());

        this.clearStatusBusy();

        this.setStatusOK();

        return;
      }, 800, this);

      return;
    },
  };

  /**
   * App - Records Page Definition.
   *
   * A grid of sample rows with the toolbar pattern Synology apps use: Add opens
   * a modal dialog, Delete asks for confirmation, Export shows the busy mask and
   * a toast, and DSM's TextFilter searches the rows.
   *
   * @since UNRELEASED
   */
  const recordsPageDefinition = {
    extend: 'SYNO.ux.GridPanel',

    /**
     * App - Records Page Definition - Constructor.
     *
     * The rows live in a local store. Load them from your own CGI with an
     * Ext.data.JsonStore url instead.
     *
     * @param {object} config - Config.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    constructor: function constructor(config) {
      const store = new Ext.data.JsonStore({
        fields: [
          'name',
          'type',
          'status',
          'updated',
        ],
        data: [
          {
            name: 'Family photos',
            type: 'Folder',
            status: 'active',
            updated: '2026-11-01 09:30',
          },
          {
            name: 'Office share',
            type: 'Share',
            status: 'active',
            updated: '2026-11-12 14:05',
          },
          {
            name: 'Living room TV',
            type: 'Device',
            status: 'paused',
            updated: '2026-11-18 20:45',
          },
        ],
      });

      this.deleteButton = new SYNO.ux.Button({
        text: text('records', 'delete'),
        disabled: true,
        scope: this,
        handler: this.onDelete,
      });

      this.callParent([Ext.apply({
        border: false,
        stripeRows: true,
        enableHdMenu: false,
        viewConfig: { forceFit: true },
        store,
        sm: new Ext.grid.RowSelectionModel({
          listeners: {
            scope: this,
            selectionchange: function onSelectionChange(selectionModel) {
              this.deleteButton.setDisabled(selectionModel.getCount() === 0);

              return;
            },
          },
        }),
        columns: [
          {
            header: text('records', 'name'),
            dataIndex: 'name',
            width: 260,
          },
          {
            header: text('records', 'type'),
            dataIndex: 'type',
            width: 140,
          },
          {
            header: text('records', 'status'),
            dataIndex: 'status',
            width: 140,
            renderer: function renderStatus(value) {
              return text('records', value);
            },
          },
          {
            header: text('records', 'updated'),
            dataIndex: 'updated',
            width: 180,
          },
        ],
        tbar: [
          {
            xtype: 'syno_button',
            text: text('records', 'add'),
            scope: this,
            handler: this.onAdd,
          },
          this.deleteButton,
          {
            xtype: 'syno_button',
            text: text('records', 'export'),
            scope: this,
            handler: this.onExport,
          },
          '->',
          new SYNO.ux.TextFilter({
            store,
            localFilter: true,
            localFilterField: 'name',
          }),
        ],
      }, config)]);

      return;
    },

    /**
     * App - Records Page Definition - On Add.
     *
     * Opens the Add Record dialog as a modal window owned by the app window.
     * The dialog adds its record to this page's store.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    onAdd: function onAdd() {
      const RecordDialog = Ext.getClassByName(`${namespace}.RecordDialog`);
      const dialog = new RecordDialog({
        owner: this.appWin,
        store: this.getStore(),
      });

      dialog.show();

      return;
    },

    /**
     * App - Records Page Definition - On Delete.
     *
     * Asks with DSM's confirm box, then removes the selected rows and shows a
     * toast.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    onDelete: function onDelete() {
      const records = this.getSelectionModel().getSelections();

      this.appWin.getMsgBox().confirm(text('records', 'delete_title'), text('records', 'delete_confirm'), function onAnswer(answer) {
        if (answer !== 'yes') {
          return;
        }

        this.getStore().remove(records);

        showToast(this.appWin, text('records', 'deleted'));

        return;
      }, this);

      return;
    },

    /**
     * App - Records Page Definition - On Export.
     *
     * Shows DSM's busy mask over the window while work runs, then a toast.
     * Replace the timer with a request to your own CGI.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    onExport: function onExport() {
      this.appWin.setStatusBusy({ text: _T('common', 'msg_waiting') });

      Ext.defer(function finishExport() {
        this.appWin.clearStatusBusy();

        showToast(this.appWin, text('records', 'exported'));

        return;
      }, 1500, this);

      return;
    },
  };

  /**
   * App - Record Dialog Definition.
   *
   * A modal dialog with tabs, built like Synology's own Add and Edit dialogs:
   * a form in a tab panel and Cancel and OK buttons at the bottom.
   *
   * @since UNRELEASED
   */
  const recordDialogDefinition = {
    extend: 'SYNO.SDS.ModalWindow',

    /**
     * App - Record Dialog Definition - Constructor.
     *
     * The store option is the grid store the new record goes into.
     * Both tabs share one form so OK validates everything at once.
     *
     * @param {object} config - Config.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    constructor: function constructor(config) {
      this.store = config.store;

      this.formPanel = new SYNO.ux.FormPanel({
        border: false,
        layout: 'fit',
        labelWidth: 150,
        items: [{
          xtype: 'syno_tabpanel',
          activeTab: 0,
          deferredRender: false,
          items: [
            {
              title: text('dialog', 'general_tab'),
              layout: 'form',
              items: [
                {
                  xtype: 'syno_textfield',
                  fieldLabel: text('dialog', 'name'),
                  name: 'name',
                  width: 200,
                  allowBlank: false,
                },
                {
                  xtype: 'syno_combobox',
                  fieldLabel: text('dialog', 'type'),
                  hiddenName: 'type',
                  width: 200,
                  mode: 'local',
                  editable: false,
                  triggerAction: 'all',
                  displayField: 'display',
                  valueField: 'display',
                  value: text('dialog', 'type_folder'),
                  store: new Ext.data.ArrayStore({
                    fields: ['display'],
                    data: [
                      [text('dialog', 'type_folder')],
                      [text('dialog', 'type_share')],
                      [text('dialog', 'type_device')],
                    ],
                  }),
                },
              ],
            },
            {
              title: text('dialog', 'advanced_tab'),
              layout: 'form',
              items: [
                {
                  xtype: 'syno_checkbox',
                  name: 'enabled',
                  boxLabel: text('dialog', 'enabled'),
                  checked: true,
                },
                {
                  xtype: 'syno_textarea',
                  fieldLabel: text('dialog', 'notes'),
                  name: 'notes',
                  width: 200,
                  height: 56,
                },
              ],
            },
          ],
        }],
      });

      this.callParent([Ext.apply({
        title: text('dialog', 'title'),
        width: 500,
        height: 256,
        resizable: false,
        layout: 'fit',
        items: [this.formPanel],
        buttons: [
          {
            xtype: 'syno_button',
            text: text('dialog', 'cancel'),
            scope: this,
            handler: this.close,
          },
          {
            xtype: 'syno_button',
            btnStyle: 'blue',
            text: text('dialog', 'ok'),
            scope: this,
            handler: this.onOk,
          },
        ],
      }, config)]);

      return;
    },

    /**
     * App - Record Dialog Definition - On Ok.
     *
     * Adds the record when the form is valid, shows a toast, and closes.
     * An invalid form keeps the dialog open with DSM's field errors.
     *
     * @returns {void}
     *
     * @since UNRELEASED
     */
    onOk: function onOk() {
      const form = this.formPanel.getForm();

      if (form.isValid() === false) {
        return;
      }

      const values = form.getFieldValues();
      const Record = this.store.recordType;

      this.store.add(new Record({
        name: values.name,
        type: values.type,
        status: (values.enabled === true) ? 'active' : 'paused',
        updated: new Date().format('Y-m-d H:i'),
      }));

      showToast(this.owner, text('records', 'added'));

      this.close();

      return;
    },
  };

  Ext.namespace(namespace);

  Ext.define(`${namespace}.Instance`, instanceDefinition);

  Ext.define(`${namespace}.MainWindow`, mainWindowDefinition);

  Ext.define(`${namespace}.OverviewPage`, overviewPageDefinition);

  Ext.define(`${namespace}.ServicePage`, servicePageDefinition);

  Ext.define(`${namespace}.SettingsPage`, settingsPageDefinition);

  Ext.define(`${namespace}.RecordsPage`, recordsPageDefinition);

  Ext.define(`${namespace}.RecordDialog`, recordDialogDefinition);

  return;
})();
