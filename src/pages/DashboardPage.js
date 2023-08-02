/* eslint-disable linebreak-style */

import {$} from '../core/dom';
import {Page} from '../core/routes/Page';
import {createRecordsTable} from './dashboard.function';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'db').html(`
    <div class="db">
        <div class="db__header">
            <h1>Excel - Панель управления</h1>
        </div>
        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${now}"
                   class="db__create"> Новая <br /> таблица</a>
            </div>
        </div>
        <div class="db__table db__view">
            ${createRecordsTable()}
        </div>
      </div>
    `)
  }
}
